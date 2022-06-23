import { Plugin, Timeout } from '../types';
import { useRef } from 'react';
import { useUpdateEffect } from '../../../index';
import { isDocumentVisible } from '../utils/isDocumentVisible';
import subscribeReVisible from '../utils/subscribeReVisible';

const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true },
) => {
  const timerRef = useRef<Timeout>();
  const unScribeRef = useRef<() => void>();
  const stopPolling = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    unScribeRef.current?.();
  };
  useUpdateEffect(() => {
    if (!pollingInterval) {
      stopPolling();
    }
  }, [pollingInterval]);
  if (!pollingInterval) {
    return {};
  }
  return {
    onBefore: () => {
      stopPolling();
    },
    onFinally: () => {
      if (!pollingWhenHidden && !isDocumentVisible()) {
        unScribeRef.current = subscribeReVisible(() => {
          fetchInstance.refresh();
        });
        return;
      }
      timerRef.current = setTimeout(() => {
        fetchInstance.refresh();
      }, pollingInterval);
    },
    onCancel: () => {
      stopPolling();
    },
  };
};
export default usePollingPlugin;
