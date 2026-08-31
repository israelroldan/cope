/* ════════════════════════════════════════════════════════════════════ */
/* CANVAS.JS — Contenteditable Persistence & Copy-Prompt Helpers         */
/* Used by: intro, UC1, UC2, UC3, UC4/5, UC6                             */
/* ════════════════════════════════════════════════════════════════════ */

(function() {
  // ─── Contenteditable persistence (global shared storage) ───
  const editableEls = Array.from(document.querySelectorAll('[data-canvas-key], [data-hyp-key]'));

  function keyFor(el) {
    if (el.dataset.canvasKey) return `uca:${el.dataset.canvasKey}`;
    if (el.dataset.hypKey) return `uca:hyp-${el.dataset.hypKey}`;
    return null;
  }

  // Restore on load
  editableEls.forEach(el => {
    const k = keyFor(el);
    if (!k) return;
    const saved = localStorage.getItem(k);
    if (saved !== null) {
      el.innerHTML = saved;
      el.classList.add('edited');
    }
  });

  // Save on input + sync siblings with same canvas-key
  editableEls.forEach(el => {
    el.addEventListener('input', () => {
      const k = keyFor(el);
      if (!k) return;
      localStorage.setItem(k, el.innerHTML);
      el.classList.add('edited');

      // Sync other cells with same canvas-key across all decks
      if (el.dataset.canvasKey) {
        document.querySelectorAll(`[data-canvas-key="${el.dataset.canvasKey}"]`).forEach(twin => {
          if (twin !== el) {
            twin.innerHTML = el.innerHTML;
            twin.classList.add('edited');
          }
        });
      }
    });

    // Prevent Enter from creating <div> — use <br>
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.execCommand('insertLineBreak');
      }
    });
  });

  // Reset button (optional, per-deck)
  const resetBtn = document.getElementById('reset-canvas');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (!confirm('Clear all canvas edits? The slides will revert to the starting hypotheses.')) return;
      editableEls.forEach(el => {
        const k = keyFor(el);
        if (k) localStorage.removeItem(k);
      });
      location.reload();
    });
  }

  // ─── Copy-prompt button handler ───
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
      if (!target) return;

      navigator.clipboard.writeText(target.innerText).then(() => {
        btn.classList.add('copied');
        const originalText = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = originalText;
        }, 1400);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });
})();
