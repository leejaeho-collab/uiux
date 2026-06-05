export function getScrollTop(root) {
  return root.querySelector('.scroll-area')?.scrollTop ?? 0;
}

export function restoreScrollTop(root, scrollTop) {
  const scroller = root.querySelector('.scroll-area');
  if (scroller) {
    scroller.scrollTop = scrollTop;
  }
}
