class SpeechService {
  constructor() {
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  isSupported() {
    return 'speechSynthesis' in window;
  }

  speak(text, accent = 'american') {
    if (!this.isSupported()) {
      console.warn('Speech synthesis not supported');
      return Promise.reject(new Error('Speech synthesis not supported'));
    }

    return new Promise((resolve, reject) => {
      if (this.isSpeaking) {
        this.stop();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = accent === 'british' ? 'en-GB' : 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => {
        if (accent === 'british') {
          return voice.lang.startsWith('en-GB');
        }
        return voice.lang.startsWith('en-US');
      }) || voices.find(voice => voice.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        reject(event);
      };

      this.currentUtterance = utterance;
      speechSynthesis.speak(utterance);
    });
  }

  speakPhoneme(phonemeSymbol, accent = 'american') {
    const cleanSymbol = phonemeSymbol.replace(/[\/\[\]]/g, '');
    return this.speak(cleanSymbol, accent);
  }

  speakWord(word, accent = 'american') {
    return this.speak(word, accent);
  }

  speakIPA(ipa, accent = 'american') {
    const cleanIPA = ipa.replace(/[\/\[\]]/g, '');
    return this.speak(cleanIPA, accent);
  }

  stop() {
    if (this.isSupported()) {
      speechSynthesis.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  isCurrentlySpeaking() {
    return this.isSpeaking;
  }
}

window.speechService = new SpeechService();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = () => {
    console.log('Voices loaded:', speechSynthesis.getVoices().length);
  };
}
