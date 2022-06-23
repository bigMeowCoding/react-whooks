import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { BasicTarget, getTargetElement, INone } from './domTarget';
import useUnmount from '../useUnmount';
import depsAreSame from './depsAreSame';

export function createEffectWithTarget(
  useEffectType: typeof useEffect | typeof useLayoutEffect,
) {
  return (
    effect: EffectCallback,
    deps: DependencyList,
    target: BasicTarget<any> | BasicTarget<any>[],
  ) => {
    const hasInitRef = useRef(false);
    const lastElementRef = useRef<(Element | INone)[]>([]);
    const oldDepsRef = useRef<DependencyList>([]);
    const unOldRef = useRef<any>();

    useEffectType(() => {
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map(getTargetElement);
      function __cache() {
        lastElementRef.current = els;
        oldDepsRef.current = deps;
        unOldRef.current = effect();
      }
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        __cache();
        return;
      }
      if (
        els.length !== lastElementRef.current.length ||
        !depsAreSame(oldDepsRef.current, deps) ||
        !depsAreSame(lastElementRef.current, els)
      ) {
        unOldRef.current?.();
        __cache();
      }
    });
    useUnmount(() => {
      unOldRef.current?.();
      hasInitRef.current = false;
    });
  };
}
