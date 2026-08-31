/* ════════════════════════════════════════════════════════════════════ */
/* SHELL.JS — Shared Slide Navigation Engine                             */
/* Core: slide array, goTo(n), nav dots, keyboard/touch handlers          */
/* Also: inter-deck navigation (prev/next deck + back to index)           */
/* ════════════════════════════════════════════════════════════════════ */

(function() {
  /* ── Deck sequence (workshop chronological order) ── */
  const DECKS = [
    { file: '00-presentation.html',              label: '12:30 · Intro' },
    { file: '01-uc1-im-review.html',             label: '13:00 · UC1 IM review' },
    { file: '02-uc2-biedingsbrief-termsheet.html', label: '13:40 · UC2 Biedingsbrief' },
    { file: '03-transition.html',                label: '14:15 · Transition' },
    { file: '04-uc3-cijferopstelling-build.html', label: '14:35 · UC3 Build' },
    { file: '05-uc4-uc5-template-fillers.html',  label: '15:45 · UC4 + UC5' },
    { file: '06-uc6-auditfiles-architecture.html', label: '16:30 · UC6 Architecture' },
    { file: '07-closing.html',                   label: '16:50 · Closing' }
  ];

  const currentFile = (location.pathname.split('/').pop() || '').toLowerCase();
  const deckIdx = DECKS.findIndex(d => d.file.toLowerCase() === currentFile);
  const prevDeck = deckIdx > 0 ? DECKS[deckIdx - 1] : null;
  const nextDeck = deckIdx >= 0 && deckIdx < DECKS.length - 1 ? DECKS[deckIdx + 1] : null;

  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  let notesVisible = false;

  function goTo(n) {
    if (n < 0 || n >= slides.length) return;
    slides[current].classList.remove('active');
    slides[current].classList.add('exit-up');
    const old = current;
    current = n;
    slides[current].classList.add('active');
    setTimeout(() => slides[old].classList.remove('exit-up'), 550);
    updateNav();
  }

  function goForward() {
    if (current < slides.length - 1) { goTo(current + 1); return; }
    if (nextDeck) location.href = nextDeck.file;
  }

  function goBack() {
    if (current > 0) { goTo(current - 1); return; }
    if (prevDeck) location.href = prevDeck.file + '#last';
  }

  function updateNav() {
    document.getElementById('navInfo').textContent = `${current + 1} / ${slides.length}`;
    document.querySelectorAll('.nav-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.classList.toggle('visited', i < current);
    });
  }

  /* ── Inject deck-nav bar (index link + prev/next deck) ── */
  if (deckIdx >= 0) {
    const deckNav = document.createElement('div');
    deckNav.className = 'deck-nav';
    const prevPart = prevDeck
      ? `<a class="deck-nav-link" href="${prevDeck.file}#last" title="${prevDeck.label}">← ${prevDeck.label}</a>`
      : `<span class="deck-nav-spacer"></span>`;
    const indexPart = `<a class="deck-nav-index" href="index.html" title="All decks">☰ Index</a>`;
    const nextPart = nextDeck
      ? `<a class="deck-nav-link" href="${nextDeck.file}" title="${nextDeck.label}">${nextDeck.label} →</a>`
      : `<span class="deck-nav-spacer"></span>`;
    deckNav.innerHTML = prevPart + indexPart + nextPart;
    document.body.appendChild(deckNav);
  }

  /* ── Build nav dots ── */
  const dotsEl = document.getElementById('navDots');
  if (dotsEl) {
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'nav-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
    });
  }

  /* ── Honor #last hash to land on last slide (when coming from next deck's "prev") ── */
  if (location.hash === '#last' && slides.length > 0) {
    slides.forEach(s => s.classList.remove('active'));
    current = slides.length - 1;
    slides[current].classList.add('active');
    updateNav();
  }

  document.addEventListener('keydown', (e) => {
    const t = e.target;
    if (t && t.isContentEditable) {
      if (e.key === 'Escape') { t.blur(); e.preventDefault(); }
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goForward(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goBack(); }
    else if (e.key === 'n' || e.key === 'N') {
      notesVisible = !notesVisible;
      document.querySelectorAll('.speaker-note').forEach(note => {
        note.classList.toggle('visible', notesVisible);
      });
    }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(slides.length - 1); }
    else if (e.key === 'Escape') {
      if (deckIdx >= 0) location.href = 'index.html';
    }
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      else document.exitFullscreen().catch(() => {});
    }
  });

  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 60) {
      diff > 0 ? goForward() : goBack();
    }
  });
})();
