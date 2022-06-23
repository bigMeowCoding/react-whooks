import { BasicTarget, getTargetElement, INone } from '../utils/domTarget';
import { useState } from 'react';
import useIsomorphicLayoutEffectWithTarget from '../utils/useIsomorphicLayoutEffectWithTarget';
import ResizeObserver from 'resize-observer-polyfill';

type Size = { width: number; height: number };

function useSize(target: BasicTarget): Size | INone {
  const [state, setState] = useState<Size>();
  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);
      if (!el) {
        return;
      }
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientHeight, clientWidth } = entry.target;
          setState({ width: clientWidth, height: clientHeight });
        });
      });
      resizeObserver.observe(el);
      return () => {
        resizeObserver.disconnect();
      };
    },
    [],
    target,
  );
  return state;
}
export default useSize;
