import { Plugin } from '../types';
import { useEffect, useMemo, useRef } from 'react';
import type { DebouncedFunc, DebounceSettings } from 'lodash';
import debounce from 'lodash/debounce';
import isDef from '../../../utils/isDef';

const useDebouncePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait },
) => {
  const debounceRef = useRef<DebouncedFunc<any>>();
  const option = useMemo(() => {
    const ret: DebounceSettings = {};
    if (isDef(debounceLeading)) {
      ret.leading = debounceLeading;
    }
    if (isDef(debounceTrailing)) {
      ret.trailing = debounceTrailing;
    }
    if (isDef(debounceMaxWait)) {
      ret.maxWait = debounceMaxWait;
    }
    return ret;
  }, [debounceWait, debounceLeading, debounceTrailing, debounceMaxWait]);
  useEffect(() => {
    if (!isDef(debounceWait)) {
      return;
    }
    const _originalFetch = fetchInstance.runAsync.bind(fetchInstance);
    debounceRef.current = debounce(
      (callback: any) => {
        callback();
      },
      debounceWait,
      option,
    );
    fetchInstance.runAsync = (...args: any[]) => {
      return new Promise((res, rej) => {
        debounceRef.current?.(() => {
          _originalFetch(...args)
            .then(res)
            .catch(rej);
        });
      });
    };
    return () => {
      debounceRef.current?.cancel();
      fetchInstance.runAsync = _originalFetch;
    };
  }, [option, debounceWait]);
  if (!debounceWait) {
    return {};
  }
  return {
    onCancel() {
      debounceRef.current?.cancel();
    },
  };
};
export default useDebouncePlugin;
