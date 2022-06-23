import { Plugin } from '../types';
import { useRef } from 'react';
import { useUpdateEffect } from '../../../index';

const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    manual,
    ready = true,
    refreshDeps = [],
    refreshDepsAction,
    defaultParams = [],
  },
) => {
  const hasAutoRef = useRef(false);
  hasAutoRef.current = false; // 每次更新时候都修改
  useUpdateEffect(() => {
    if (!manual && ready) {
      fetchInstance.run(...defaultParams);
      hasAutoRef.current = true;
    }
  }, [ready]);
  useUpdateEffect(() => {
    if (hasAutoRef.current) {
      return;
    }
    if (manual) {
      return;
    }
    hasAutoRef.current = true; // 防止ready 和依赖都变化，重复触发
    if (refreshDepsAction) {
      refreshDepsAction();
    } else {
      fetchInstance.refresh();
    }
  }, [...refreshDeps]);
  return {
    onBefore: () => {
      if (!ready) {
        return {
          stopNow: true,
        };
      }
    },
  };
};

useAutoRunPlugin.onInit = ({ ready, manual }) => {
  return {
    loading: !manual && ready,
  };
};
export default useAutoRunPlugin;
