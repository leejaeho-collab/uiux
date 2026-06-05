(function () {
  const preservedActions = new Set(['select', 'toggle-vibe']);
  let pendingScrollTop = null;

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target || !preservedActions.has(target.dataset.action)) return;

    pendingScrollTop = document.querySelector('.scroll-area')?.scrollTop ?? null;
    window.setTimeout(() => {
      const scroller = document.querySelector('.scroll-area');
      if (scroller && pendingScrollTop !== null) {
        scroller.scrollTop = pendingScrollTop;
      }
      pendingScrollTop = null;
    }, 0);
  }, true);
}());
