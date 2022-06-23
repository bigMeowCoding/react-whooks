import { Plugin } from '../types';
import * as cache from '../utils/cache';
import { CachedData } from '../utils/cache';
import * as cacheSubscribe from '../utils/cacheSubscribe';
import { getCachePromise, setCachePromise } from '../utils/cachePromise';
import { useRef } from 'react';
import { useCreation, useUnmount } from '../../../index';

const useCachePlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
    setCache: customSetCache,
    getCache: customGetCache,
  },
) => {
  const currentPromiseRef = useRef<Promise<any>>();
  const unSubscribeRef = useRef<() => void>();

  const _getCache = (key: string, params: any[] = []) => {
    if (customGetCache) {
      return customGetCache(params);
    }
    return cache.getCache(key);
  };
  const _setCache = (key: string, cachedData: CachedData) => {
    if (customSetCache) {
      customSetCache(cachedData);
    } else {
      cache.setCache(key, cacheTime, cachedData);
    }
    cacheSubscribe.trigger(key, cachedData.data);
  };
  useCreation(() => {
    if (!cacheKey) {
      return;
    }

    // get data from cache when init
    const cacheData = _getCache(cacheKey);
    if (cacheData && Object.hasOwnProperty.call(cacheData, 'data')) {
      fetchInstance.state.data = cacheData.data;
      fetchInstance.state.params = cacheData.params;
      if (
        staleTime === -1 ||
        new Date().getTime() - cacheData.time <= staleTime
      ) {
        fetchInstance.state.loading = false;
      }
    }

    // subscribe same cachekey update, trigger update
    unSubscribeRef.current = cacheSubscribe.subscribe(cacheKey, (data) => {
      fetchInstance.setState({ data });
    });
  }, []);

  useUnmount(() => {
    unSubscribeRef.current?.();
  });

  if (!cacheKey) {
    return {};
  }
  return {
    onBefore: (param) => {
      const cacheData = _getCache(cacheKey, param);
      if (!cacheData || !Object.hasOwnProperty.call(cacheData, 'data')) {
        return {};
      }
      if (
        staleTime === -1 ||
        new Date().getTime() - cacheData.time <= staleTime
      ) {
        return {
          loading: false,
          data: cacheData.data,
          returnNow: true,
        };
      } else {
        return {
          data: cacheData.data,
        };
      }
    },
    onRequest: (service, args) => {
      let servicePromise = getCachePromise(cacheKey);
      if (servicePromise && servicePromise !== currentPromiseRef.current) {
        return { servicePromise };
      }
      servicePromise = service(...args);
      currentPromiseRef.current = servicePromise;
      setCachePromise(cacheKey, servicePromise);
      return { servicePromise };
    },
    onSuccess: (data, params) => {
      if (cacheKey) {
        unSubscribeRef.current?.();
        _setCache(cacheKey, {
          data,
          params,
          time: new Date().getTime(),
        });
        unSubscribeRef.current = cacheSubscribe.subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d });
        });
      }
    },
    onMutate: (data) => {
      if (cacheKey) {
        unSubscribeRef.current?.();
        _setCache(cacheKey, {
          data,
          params: fetchInstance.state.params,
          time: new Date().getTime(),
        });
        unSubscribeRef.current = cacheSubscribe.subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d });
        });
      }
    },
  };
};
export default useCachePlugin;
