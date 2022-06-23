import { Plugin, Timeout } from '../types';
import { useRef } from 'react';

const useRetryPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { retryCount, retryInterval },
) => {
  const triggerBeRetryRef = useRef(false);
  const countRef = useRef(0);
  const timerRef = useRef<Timeout>();
  if (!retryCount) {
    return {};
  }
  return {
    onBefore() {
      if (!triggerBeRetryRef) {
        countRef.current = 0;
      }
      triggerBeRetryRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    onError() {
      countRef.current += 1;
      if (retryCount === -1 || countRef.current <= retryCount) {
        const timeout =
          retryInterval ?? Math.min(1000 * 2 ** countRef.current, 30000);
        timerRef.current = setTimeout(() => {
          triggerBeRetryRef.current = true;
          fetchInstance.refresh();
        }, timeout);
      } else {
        countRef.current = 0;
      }
    },
    onSuccess() {
      countRef.current = 0;
    },
    onCancel() {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      countRef.current = 0;
    },
  };
};

export default useRetryPlugin;
