import test from 'node:test';
import assert from 'node:assert/strict';

import { getScrollTop, restoreScrollTop } from './scroll.js';

function createRoot() {
  const scroller = { scrollTop: 0 };

  return {
    scroller,
    querySelector(selector) {
      return selector === '.scroll-area' ? scroller : null;
    }
  };
}

test('reads the current scroll position from the active scroll area', () => {
  const root = createRoot();
  root.scroller.scrollTop = 128;

  assert.equal(getScrollTop(root), 128);
});

test('restores the scroll position on the active scroll area', () => {
  const root = createRoot();

  restoreScrollTop(root, 236);

  assert.equal(root.scroller.scrollTop, 236);
});
