import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const phonemesContext = { window: {} };
vm.runInNewContext(
  fs.readFileSync(new URL('../js/phonemes.js', import.meta.url), 'utf8'),
  phonemesContext
);

const { phonemesData, commonMistakes, britishAmericanDifferences } = phonemesContext.window;
const allPhonemes = [...phonemesData.vowels, ...phonemesData.consonants];

assert.equal(phonemesData.vowels.length, 20, 'There must be 20 vowel entries');
assert.equal(phonemesData.consonants.length, 28, 'There must be 28 consonant entries');
assert.equal(allPhonemes.length, 48, 'There must be 48 phoneme entries in total');
assert.equal(new Set(allPhonemes.map(phoneme => phoneme.id)).size, 48, 'Phoneme IDs must be unique');
assert.equal(new Set(allPhonemes.map(phoneme => phoneme.symbol)).size, 48, 'Phoneme symbols must be unique');

for (const phoneme of allPhonemes) {
  assert.ok(phoneme.audioWord, `${phoneme.id} needs a speech example word`);
  assert.ok(
    phoneme.examples.some(example => example.word === phoneme.audioWord),
    `${phoneme.id} speech example must be one of its visible examples`
  );
  assert.ok(phoneme.accentSymbols?.british, `${phoneme.id} needs a British IPA display`);
  assert.ok(phoneme.accentSymbols?.american, `${phoneme.id} needs an American IPA display`);
  assert.equal(phoneme.examples.length, 3, `${phoneme.id} should have three examples`);
  for (const example of phoneme.examples) {
    assert.equal(example.word, example.word.trim(), `${phoneme.id} contains a padded example word`);
    assert.match(example.word, /^[A-Za-z][A-Za-z'-]*$/, `${phoneme.id} has an invalid example word`);
    assert.match(example.ipa, /^\/.*\/$/, `${phoneme.id} has an invalid IPA transcription`);
  }
}

const j = allPhonemes.find(phoneme => phoneme.id === 'consonant-28');
assert.equal(j.examples.find(example => example.word === 'you')?.ipa, '/juː/', '/j/ must use a word containing /j/');
assert.equal(
  commonMistakes.find(item => item.phoneme === '/ŋ/')?.mistake.includes('加/g/'),
  true,
  '/ŋ/ guidance should warn against adding /g/'
);
assert.equal(
  britishAmericanDifferences.find(item => item.word === 'bird')?.american,
  '/bɝd/',
  'American bird should use a rhotic vowel'
);

const speechEvents = [];
const fakeSpeechSynthesis = {
  voices: [
    { lang: 'en-US', name: 'Test US' },
    { lang: 'en-GB', name: 'Test UK' }
  ],
  getVoices() {
    return this.voices;
  },
  addEventListener() {},
  speak(utterance) {
    this.lastUtterance = utterance;
    speechEvents.push({ type: 'speak', text: utterance.text, lang: utterance.lang, rate: utterance.rate });
  },
  cancel() {
    speechEvents.push({ type: 'cancel' });
  }
};

class FakeSpeechSynthesisUtterance {
  constructor(text) {
    this.text = text;
  }
}

const speechContext = {
  window: {
    speechSynthesis: fakeSpeechSynthesis,
    SpeechSynthesisUtterance: FakeSpeechSynthesisUtterance
  }
};
vm.runInNewContext(
  fs.readFileSync(new URL('../js/speech.js', import.meta.url), 'utf8'),
  speechContext
);

const speechService = speechContext.window.speechService;
const phonemePromise = speechService.speakPhoneme('/iː/', 'british', 'see');
assert.deepEqual(speechEvents.at(-1), { type: 'speak', text: 'see', lang: 'en-GB', rate: 0.72 });
assert.equal(fakeSpeechSynthesis.lastUtterance.voice.name, 'Test UK');
fakeSpeechSynthesis.lastUtterance.onend();
await phonemePromise;
assert.equal(speechService.isCurrentlySpeaking(), false);

const cancelledPromise = speechService.speakWord('hello', 'american');
const replacementPromise = speechService.speakWord('world', 'american');
await cancelledPromise;
fakeSpeechSynthesis.lastUtterance.onend();
await replacementPromise;
assert.equal(speechService.isCurrentlySpeaking(), false, 'Cancelled speech must settle cleanly');

console.log(`Validated ${allPhonemes.length} phonemes, ${allPhonemes.length * 3} examples, and speech playback behavior.`);
