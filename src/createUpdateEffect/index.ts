import { useEffect, useLayoutEffect, useRef } from 'react';

type effectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect: (hook: effectHookType) => effectHookType = (
  hook,
) => {
  return (effect, deps) => {
    const isMounted = useRef(false);
    hook(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);
    hook(() => {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        return effect();
      }
    }, deps);
  };
};
