import { isDocumentVisible } from './isDocumentVisible';
import { canUseDom } from '../../../utils/canUseDom';
import isOnline from './isOnLine';

const listeners: any[] = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

if (canUseDom()) {
  const revalidate = () => {
    if (!isDocumentVisible() || !isOnline()) return;
    listeners.forEach((listener) => {
      listener();
    });
  };
  window.addEventListener('visibilitychange', revalidate, false);
  window.addEventListener('focus', revalidate, false);
}

export default subscribe;
