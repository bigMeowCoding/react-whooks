import isBrowser from './isBrowser';
import { MutableRefObject } from 'react';

export type INone = null | undefined;
type TargetValue<T> = T | INone;
type TargetType = HTMLElement | Element | Window | Document;
export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(
  target: BasicTarget<T>,
  defaultElement?: T,
) {
  if (!isBrowser) {
    return;
  }
  if (!target) {
    return defaultElement;
  }
  let targetElement: TargetValue<T>;
  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }
  return targetElement;
}
