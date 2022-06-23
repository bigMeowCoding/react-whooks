import { Plugin } from '../types';
import { useEffect, useRef } from 'react';
import limit from '../utils/limit';
import { useUnmount } from '../../../index';
import subscribeFocus from '../utils/subscribeFocus';

const useRefreshOnWindowFocusPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { focusTimespan = 5000, refreshOnWindowFocus },
) => {
  const unsubscribeRef = useRef<() => void>();
  const stopSubscribe = () => {
    unsubscribeRef.current?.();
  };
  useEffect(() => {
    if (refreshOnWindowFocus) {
      const limitRefresh = limit(
        fetchInstance.refresh.bind(fetchInstance),
        focusTimespan,
      );
      unsubscribeRef.current = subscribeFocus(() => {
        limitRefresh();
      });
    }
    return () => {
      stopSubscribe();
    };
  }, [focusTimespan, refreshOnWindowFocus]);
  useUnmount(() => {
    stopSubscribe();
  });

  return {};
};
export default useRefreshOnWindowFocusPlugin;
