class IPALearningApp {
  constructor() {
    this.currentCategory = 'vowels';
    this.learnedPhonemes = new Set();
    this.isPlaying = false;
    this.init();
  }

  init() {
    this.loadProgress();
    this.renderPhonemes();
    this.setupEventListeners();
    this.renderBritishAmericanDifferences();
    this.renderCommonMistakes();
    this.updateProgress();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('ipa-progress');
      if (saved) {
        const data = JSON.parse(saved);
        this.learnedPhonemes = new Set(data.learnedPhonemes || []);
      }
    } catch (e) {
      console.warn('Failed to load progress:', e);
    }
  }

  saveProgress() {
    try {
      const data = {
        version: 1,
        learnedPhonemes: Array.from(this.learnedPhonemes),
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('ipa-progress', JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save progress:', e);
    }
  }

  markAsLearned(phonemeId) {
    this.learnedPhonemes.add(phonemeId);
    this.saveProgress();
    this.updateProgress();
    this.updatePhonemeCard(phonemeId);
  }

  updateProgress() {
    const total = window.phonemesData.vowels.length + window.phonemesData.consonants.length;
    const learned = this.learnedPhonemes.size;
    const percentage = Math.round((learned / total) * 100);

    document.querySelector('.progress-text').textContent = `${learned} / ${total} 已学习`;
    document.querySelector('.progress-bar-fill').style.width = `${percentage}%`;
    document.querySelector('.progress-percentage').textContent = `${percentage}%`;
  }

  updatePhonemeCard(phonemeId) {
    const card = document.querySelector(`[data-phoneme-id="${phonemeId}"]`);
    if (card) {
      if (this.learnedPhonemes.has(phonemeId)) {
        card.classList.add('learned');
      }
    }
  }

  setupEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.switchCategory(category);
      });
    });

    document.addEventListener('click', (e) => {
      if (e.target.closest('.phoneme-card')) {
        const card = e.target.closest('.phoneme-card');
        const phonemeId = card.dataset.phonemeId;
        this.openDetailModal(phonemeId);
      }

      if (e.target.closest('.play-btn')) {
        e.stopPropagation();
        const btn = e.target.closest('.play-btn');
        const word = btn.dataset.word;
        const accent = btn.dataset.accent;
        this.playWord(word, accent, btn);
      }

      if (e.target.closest('.modal-close')) {
        this.closeModal();
      }

      if (e.target.classList.contains('modal-overlay')) {
        this.closeModal();
      }

      if (e.target.closest('.phoneme-play-btn')) {
        const btn = e.target.closest('.phoneme-play-btn');
        const symbol = btn.dataset.symbol;
        const accent = btn.dataset.accent;
        this.playPhoneme(symbol, accent, btn);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  switchCategory(category) {
    this.currentCategory = category;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });

    this.renderPhonemes();
  }

  renderPhonemes() {
    const container = document.querySelector('.phonemes-grid');
    const phonemes = this.currentCategory === 'vowels' 
      ? window.phonemesData.vowels 
      : window.phonemesData.consonants;

    container.innerHTML = phonemes.map((phoneme, index) => `
      <div class="phoneme-card ${this.learnedPhonemes.has(phoneme.id) ? 'learned' : ''}" 
           data-phoneme-id="${phoneme.id}"
           style="animation-delay: ${index * 30}ms">
        <span class="phoneme-symbol">/${phoneme.symbol}/</span>
        <span class="phoneme-name">${phoneme.subcategory}</span>
        ${this.learnedPhonemes.has(phoneme.id) ? '<span class="learned-badge">已学</span>' : ''}
      </div>
    `).join('');

    container.querySelectorAll('.phoneme-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.add('clicked');
        setTimeout(() => card.classList.remove('clicked'), 150);
      });
    });
  }

  openDetailModal(phonemeId) {
    const phonemes = [...window.phonemesData.vowels, ...window.phonemesData.consonants];
    const phoneme = phonemes.find(p => p.id === phonemeId);
    
    if (!phoneme) return;

    this.markAsLearned(phonemeId);

    const modal = document.querySelector('.modal-overlay');
    const modalContent = modal.querySelector('.modal-content');

    modalContent.innerHTML = `
      <button class="modal-close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="modal-header">
        <div class="modal-phoneme-symbol">/${phoneme.symbol}/</div>
        <div class="modal-phoneme-name">${phoneme.name}</div>
        <div class="modal-phoneme-category">${this.getCategoryName(phoneme.subcategory)}</div>
      </div>

      <div class="modal-phoneme-play">
        <button class="phoneme-play-btn primary" data-symbol="${phoneme.symbol}" data-accent="british">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          英音发音
        </button>
        <button class="phoneme-play-btn secondary" data-symbol="${phoneme.symbol}" data-accent="american">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          美音发音
        </button>
      </div>

      <div class="modal-section">
        <h3>发音技巧</h3>
        <p class="tips-text">${phoneme.tips}</p>
      </div>

      <div class="modal-section">
        <h3>单词示例</h3>
        <div class="examples-list">
          ${phoneme.examples.map(ex => `
            <div class="example-item">
              <span class="example-word">${ex.word}</span>
              <span class="example-ipa">${ex.ipa}</span>
              <div class="example-buttons">
                <button class="play-btn small" data-word="${ex.word}" data-accent="british" title="英音">
                  <span class="accent-label">UK</span>
                </button>
                <button class="play-btn small" data-word="${ex.word}" data-accent="american" title="美音">
                  <span class="accent-label">US</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-section">
        <h3>英美发音对比</h3>
        <p class="difference-note">注意：该音在不同口音中的细微差别</p>
        <div class="accent-comparison">
          <div class="accent-item">
            <span class="accent-badge british">英式</span>
            <span class="accent-example">/${phoneme.symbol}/</span>
          </div>
          <div class="accent-divider">vs</div>
          <div class="accent-item">
            <span class="accent-badge american">美式</span>
            <span class="accent-example">/${phoneme.symbol}/</span>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.querySelector('.modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    window.speechService.stop();
  }

  async playPhoneme(symbol, accent, btn) {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    btn.classList.add('playing');
    
    try {
      await window.speechService.speakPhoneme(symbol, accent);
    } catch (e) {
      console.error('Failed to play phoneme:', e);
    }
    
    this.isPlaying = false;
    btn.classList.remove('playing');
  }

  async playWord(word, accent, btn) {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    btn.classList.add('playing');
    
    try {
      await window.speechService.speakWord(word, accent);
    } catch (e) {
      console.error('Failed to play word:', e);
    }
    
    this.isPlaying = false;
    btn.classList.remove('playing');
  }

  getCategoryName(subcategory) {
    const names = {
      'long': '长元音',
      'short': '短元音',
      'schwa': '中性元音',
      'diphthong': '双元音',
      'plosive': '爆破音',
      'fricative': '摩擦音',
      'affricate': '破擦音',
      'nasal': '鼻音',
      'lateral': '边音',
      'approximant': '近音'
    };
    return names[subcategory] || subcategory;
  }

  renderBritishAmericanDifferences() {
    const container = document.querySelector('.differences-list');
    if (!container) return;

    container.innerHTML = window.britishAmericanDifferences.map(item => `
      <div class="difference-item">
        <span class="diff-word">${item.word}</span>
        <span class="diff-british">英: ${item.british}</span>
        <span class="diff-american">美: ${item.american}</span>
      </div>
    `).join('');
  }

  renderCommonMistakes() {
    const container = document.querySelector('.mistakes-list');
    if (!container) return;

    container.innerHTML = window.commonMistakes.map(item => `
      <div class="mistake-item">
        <span class="mistake-phoneme">${item.phoneme}</span>
        <span class="mistake-wrong">✗ ${item.mistake}</span>
        <span class="mistake-correct">✓ ${item.correct}</span>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new IPALearningApp();
});
