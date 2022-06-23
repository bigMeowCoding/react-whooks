import { canUseDom } from '../../../utils/canUseDom';
import { isDocumentVisible } from './isDocumentVisible';

const listeners: any[] = [];
function subscribe(listener: () => void) {
  listeners.push(listener);
  return function unSubscribe() {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}
if (canUseDom()) {
  const revalidate = () => {
    if (!isDocumentVisible()) return;
    for (const listener of listeners) {
      listener();
    }
  };
  window.addEventListener('visibilitychange', revalidate, false);
}
export default subscribe;
