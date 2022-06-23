import Fetch from './fetch';
import { CachedData } from './utils/cache';
import { DependencyList } from 'react';

export type Service<TData, TParams extends any[]> = (
  ...args: TParams
) => Promise<TData>;
export interface Options<TData, TParams> {
  manual?: boolean;
  defaultParams?: TParams;
  loadingDelay?: number;
  pollingInterval?: number;
  pollingWhenHidden?: boolean;
  onError?: (e: Error, params: TParams) => void;
  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  // cache
  cacheKey?: string;
  cacheTime?: number;
  staleTime?: number;
  setCache?: (data: CachedData<TData, TParams>) => void;
  getCache?: (params: TParams) => CachedData<TData, TParams> | undefined;

  ready?: boolean;
  // refreshDeps
  refreshDeps?: DependencyList;
  refreshDepsAction?: () => void;

  // refresh on window focus
  refreshOnWindowFocus?: boolean;
  focusTimespan?: number;
  // debounce
  debounceWait?: number;
  debounceLeading?: boolean;
  debounceTrailing?: boolean;
  debounceMaxWait?: number;
  // throttle
  throttleWait?: number;
  throttleLeading?: boolean;
  throttleTrailing?: boolean;
  // retry
  retryCount?: number;
  retryInterval?: number;
}
export type Subscribe = () => void;

export type Plugin<TData, TParams extends any[]> = {
  (
    fetchInstance: Fetch<TData, TParams>,
    options: Options<TData, TParams>,
  ): PluginReturn<TData, TParams>;
  onInit?: (
    options: Options<TData, TParams>,
  ) => Partial<FetchState<TData, TParams>>;
};

// Fetch

export interface FetchState<TData, TParams extends any[]> {
  loading: boolean;
  params?: TParams;
  data?: TData;
  error?: Error;
}

export interface PluginReturn<TData, TParams extends any[]> {
  onBefore?: (params: TParams) =>
    | ({
        stopNow?: boolean;
        returnNow?: boolean;
      } & Partial<FetchState<TData, TParams>>)
    | void;

  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams,
  ) => {
    servicePromise?: Promise<TData>;
  };

  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  onCancel?: () => void;
  onMutate?: (data: TData) => void;
}

export interface Result<TData, TParams extends any[]> {
  loading: boolean;
  data?: TData;
  error?: Error;
  params: TParams | [];
  cancel: Fetch<TData, TParams>['cancel'];
  // refresh: Fetch<TData, TParams>['refresh'];
  // refreshAsync: Fetch<TData, TParams>['refreshAsync'];
  run: Fetch<TData, TParams>['run'];
  // runAsync: Fetch<TData, TParams>['runAsync'];
  // mutate: Fetch<TData, TParams>['mutate'];
}
export type Timeout = ReturnType<typeof setTimeout>;
