import { canUseDom } from '../../../utils/canUseDom';

export function isDocumentVisible() {
  if (canUseDom()) {
    return document.visibilityState === 'visible';
  }
  return true;
}
