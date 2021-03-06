import { Plugin, Timeout } from '../types';
import { useRef } from 'react';

export const useLoadingDelayPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { loadingDelay },
) => {
  const timerRef = useRef<Timeout>();
  if (!loadingDelay) {
    return {};
  }
  const cancelTimeout = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  return {
    onBefore: () => {
      cancelTimeout();
      timerRef.current = setTimeout(() => {
        fetchInstance.setState({ loading: true });
      }, loadingDelay);
      return {
        loading: false,
      };
    },
    onFinally: () => {
      cancelTimeout();
    },
    onCancel: () => {
      cancelTimeout();
    },
  };
};
