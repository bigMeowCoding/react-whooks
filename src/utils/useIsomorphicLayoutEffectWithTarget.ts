import isBrowser from './isBrowser';
import useEffectWithTarget from './useEffectWithTarget';
import useLayoutEffectWithTarget from './useLayoutEffectWithTarget';

const useIsomorphicLayoutEffectWithTarget = isBrowser
  ? useEffectWithTarget
  : useLayoutEffectWithTarget;

export default useIsomorphicLayoutEffectWithTarget;
