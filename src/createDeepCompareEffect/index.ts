import { DependencyList, useEffect, useLayoutEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
const depsIsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps);
};
type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;
export const createDeepCompareEffect: CreateUpdateEffect =
  (hook) => (effect, deps) => {
    const ref = useRef<DependencyList>();
    const signalRef = useRef<number>(0);
    if (deps === undefined || !depsIsEqual(deps, ref.current)) {
      ref.current = deps;
      signalRef.current += 1;
    }
    hook(effect, [signalRef.current]);
  };
