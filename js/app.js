class IPALearningApp {
  constructor() {
    this.currentCategory = 'vowels';
    this.learnedPhonemes = new Set();
    this.isPlaying = false;
    this.lastFocusedElement = null;
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
        const validIds = new Set(this.getAllPhonemes().map(phoneme => phoneme.id));
        this.learnedPhonemes = new Set(
          (Array.isArray(data.learnedPhonemes) ? data.learnedPhonemes : [])
            .filter(phonemeId => validIds.has(phonemeId))
        );
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
    const total = this.getAllPhonemes().length;
    const validIds = new Set(this.getAllPhonemes().map(phoneme => phoneme.id));
    const learned = [...this.learnedPhonemes].filter(phonemeId => validIds.has(phonemeId)).length;
    const percentage = Math.round((learned / total) * 100);

    const progressText = document.querySelector('.progress-text');
    const progressBar = document.querySelector('.progress-bar-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    if (progressText) progressText.textContent = `${learned} / ${total} 已学习`;
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressPercentage) progressPercentage.textContent = `${percentage}%`;
  }

  updatePhonemeCard(phonemeId) {
    const card = document.querySelector(`[data-phoneme-id="${phonemeId}"]`);
    if (card) {
      const isLearned = this.learnedPhonemes.has(phonemeId);
      card.classList.toggle('learned', isLearned);
      card.setAttribute('aria-pressed', String(isLearned));
      if (isLearned && !card.querySelector('.learned-badge')) {
        card.insertAdjacentHTML('beforeend', '<span class="learned-badge">已学</span>');
      }
    }
  }

  getAllPhonemes() {
    return [...window.phonemesData.vowels, ...window.phonemesData.consonants];
  }

  escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  setupEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
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
        const word = btn.dataset.word;
        const accent = btn.dataset.accent;
        this.playPhoneme(symbol, accent, word, btn);
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

    container.innerHTML = phonemes.map((phoneme, index) => {
      const isLearned = this.learnedPhonemes.has(phoneme.id);
      const symbol = this.escapeHtml(phoneme.symbol);
      const name = this.escapeHtml(phoneme.subcategory);
      return `
        <button type="button" class="phoneme-card ${isLearned ? 'learned' : ''}"
             data-phoneme-id="${this.escapeHtml(phoneme.id)}"
             aria-label="学习音标 /${symbol}/"
             aria-pressed="${isLearned}"
             style="animation-delay: ${index * 30}ms">
          <span class="phoneme-symbol">/${symbol}/</span>
          <span class="phoneme-name">${name}</span>
          ${isLearned ? '<span class="learned-badge">已学</span>' : ''}
        </button>
      `;
    }).join('');

    container.querySelectorAll('.phoneme-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.add('clicked');
        setTimeout(() => card.classList.remove('clicked'), 150);
      });
    });
  }

  openDetailModal(phonemeId) {
    const phoneme = this.getAllPhonemes().find(p => p.id === phonemeId);
    
    if (!phoneme) return;

    this.markAsLearned(phonemeId);

    const modal = document.querySelector('.modal-overlay');
    const modalContent = modal.querySelector('.modal-content');
    this.lastFocusedElement = document.activeElement;

    const symbol = this.escapeHtml(phoneme.symbol);
    const name = this.escapeHtml(phoneme.name);
    const categoryName = this.escapeHtml(this.getCategoryName(phoneme.subcategory));
    const audioWord = this.escapeHtml(phoneme.audioWord);
    const britishSymbol = this.escapeHtml(phoneme.accentSymbols.british);
    const americanSymbol = this.escapeHtml(phoneme.accentSymbols.american);

    modalContent.innerHTML = `
      <button type="button" class="modal-close" aria-label="关闭音标详情">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="modal-header">
        <div class="modal-phoneme-symbol">/${symbol}/</div>
        <h2 id="modal-title" class="modal-phoneme-name">${name}</h2>
        <div class="modal-phoneme-category">${categoryName}</div>
      </div>

      <div class="modal-phoneme-play">
        <button type="button" class="phoneme-play-btn primary" data-symbol="${symbol}" data-word="${audioWord}" data-accent="british" title="播放包含该音的英式示例词">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          英音示例词
        </button>
        <button type="button" class="phoneme-play-btn secondary" data-symbol="${symbol}" data-word="${audioWord}" data-accent="american" title="播放包含该音的美式示例词">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          美音示例词
        </button>
      </div>

      <p class="speech-note">浏览器语音合成不能直接朗读 IPA；上方按钮会慢速播放包含 /${symbol}/ 的示例词「${audioWord}」。</p>

      <div class="modal-section">
        <h3>发音技巧</h3>
        <p class="tips-text">${this.escapeHtml(phoneme.tips)}</p>
      </div>

      <div class="modal-section">
        <h3>单词示例</h3>
        <p class="difference-note">示例转写采用英式教学体系；UK / US 按钮会播放对应口音。</p>
        <div class="examples-list">
          ${phoneme.examples.map(ex => `
            <div class="example-item">
              <span class="example-word">${this.escapeHtml(ex.word)}</span>
              <span class="example-ipa">${this.escapeHtml(ex.ipa)}</span>
              <div class="example-buttons">
                <button type="button" class="play-btn small" data-word="${this.escapeHtml(ex.word)}" data-accent="british" title="播放英式发音">
                  <span class="accent-label">UK</span>
                </button>
                <button type="button" class="play-btn small" data-word="${this.escapeHtml(ex.word)}" data-accent="american" title="播放美式发音">
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
            <span class="accent-example">/${britishSymbol}/</span>
          </div>
          <div class="accent-divider">vs</div>
          <div class="accent-item">
            <span class="accent-badge american">美式</span>
            <span class="accent-example">/${americanSymbol}/</span>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalContent.querySelector('.modal-close')?.focus();
  }

  closeModal() {
    const modal = document.querySelector('.modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    window.speechService.stop();
    this.isPlaying = false;
    this.lastFocusedElement?.focus?.();
  }

  async playPhoneme(symbol, accent, word, btn) {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    btn.classList.add('playing');
    
    try {
      await window.speechService.speakPhoneme(symbol, accent, word);
    } catch (e) {
      console.error('Failed to play phoneme:', e);
    } finally {
      this.isPlaying = false;
      btn.classList.remove('playing');
    }
  }

  async playWord(word, accent, btn) {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    btn.classList.add('playing');
    
    try {
      await window.speechService.speakWord(word, accent);
    } catch (e) {
      console.error('Failed to play word:', e);
    } finally {
      this.isPlaying = false;
      btn.classList.remove('playing');
    }
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
