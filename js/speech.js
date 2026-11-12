class SpeechService {
  constructor() {
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.currentRequest = null;
    this.voices = [];
    this.refreshVoices();

    if (this.isSupported() && 'onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', () => this.refreshVoices());
    }
  }

  isSupported() {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  refreshVoices() {
    if (this.isSupported()) {
      this.voices = window.speechSynthesis.getVoices();
    }
    return this.voices;
  }

  getVoice(accent) {
    const voices = this.voices.length ? this.voices : this.refreshVoices();
    const language = accent === 'british' ? 'en-gb' : 'en-us';
    const exactVoice = voices.find(voice => voice.lang.toLowerCase() === language);
    const regionalVoice = voices.find(voice => voice.lang.toLowerCase().startsWith(`${language}-`));
    return exactVoice || regionalVoice || voices.find(voice => voice.lang.toLowerCase().startsWith('en'));
  }

  speak(text, accent = 'american', options = {}) {
    if (!this.isSupported()) {
      const error = new Error('Speech synthesis is not supported in this browser');
      console.warn(error.message);
      return Promise.reject(error);
    }

    const spokenText = String(text || '').trim();
    if (!spokenText) {
      return Promise.reject(new Error('Cannot speak an empty string'));
    }

    // Cancel the previous request and settle its promise. Without this, a
    // cancelled utterance can leave the app's playing state stuck forever.
    this.stop();

    return new Promise((resolve, reject) => {
      const utterance = new window.SpeechSynthesisUtterance(spokenText);
      utterance.lang = accent === 'british' ? 'en-GB' : 'en-US';
      utterance.rate = options.rate ?? 0.85;
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;

      const preferredVoice = this.getVoice(accent);
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      const settle = (callback, value) => {
        if (!this.currentRequest || this.currentRequest.utterance !== utterance) {
          return;
        }
        this.currentRequest = null;
        this.currentUtterance = null;
        this.isSpeaking = false;
        callback(value);
      };

      utterance.onstart = () => {
        if (this.currentRequest?.utterance === utterance) {
          this.isSpeaking = true;
        }
      };

      utterance.onend = () => settle(resolve);
      utterance.onerror = event => settle(reject, event);

      this.currentUtterance = utterance;
      this.currentRequest = { utterance, resolve, reject };
      this.isSpeaking = true;
      window.speechSynthesis.speak(utterance);
    });
  }

  speakPhoneme(phonemeSymbol, accent = 'american', exampleWord) {
    // Browsers do not interpret IPA characters as phonetic instructions. Play
    // a short word containing the target sound instead, at a slower rate.
    const word = String(exampleWord || '').trim();
    if (!word) {
      return Promise.reject(new Error(`No example word is available for ${phonemeSymbol}`));
    }
    return this.speak(word, accent, { rate: 0.72 });
  }

  speakWord(word, accent = 'american') {
    return this.speak(word, accent);
  }

  speakIPA(ipa, accent = 'american', exampleWord) {
    return this.speakPhoneme(ipa, accent, exampleWord);
  }

  stop() {
    if (!this.isSupported()) {
      return;
    }

    const request = this.currentRequest;
    this.currentRequest = null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    window.speechSynthesis.cancel();

    if (request) {
      // Resolve cancellation so callers can always reset their UI state.
      request.resolve({ cancelled: true });
    }
  }

  isCurrentlySpeaking() {
    return this.isSpeaking;
  }
}

window.speechService = new SpeechService();
