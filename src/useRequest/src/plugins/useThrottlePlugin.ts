import { Plugin } from '../types';
import { useEffect, useMemo, useRef } from 'react';
import type { DebouncedFunc, ThrottleSettings } from 'lodash';
import throttle from 'lodash/throttle';
import isDef from '../../../utils/isDef';

const useThrottlePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing },
) => {
  const throttleRef = useRef<DebouncedFunc<any>>();
  const option = useMemo(() => {
    const ret: ThrottleSettings = {};
    if (isDef(throttleLeading)) {
      ret.leading = throttleLeading;
    }
    if (isDef(throttleTrailing)) {
      ret.trailing = throttleTrailing;
    }
    return ret;
  }, [throttleLeading, throttleTrailing]);
  useEffect(() => {
    if (!isDef(throttleWait)) {
      return;
    }
    const _originalFetch = fetchInstance.runAsync.bind(fetchInstance);
    throttleRef.current = throttle(
      (callback: any) => {
        callback();
      },
      throttleWait,
      option,
    );
    fetchInstance.runAsync = (...args: any[]) => {
      return new Promise((res, rej) => {
        throttleRef.current?.(() => {
          _originalFetch(...args)
            .then(res)
            .catch(rej);
        });
      });
    };
    return () => {
      throttleRef.current?.cancel();
      fetchInstance.runAsync = _originalFetch;
    };
  }, [option, throttleWait]);
  if (!throttleWait) {
    return {};
  }
  return {
    onCancel() {
      throttleRef.current?.cancel();
    },
  };
};
export default useThrottlePlugin;
