import useRequestImplement from './useRequestImplement';
import { Options, Plugin, Service } from './types';
import { useLoadingDelayPlugin } from './plugins/useLoadingDelayPlugin';
import usePollingPlugin from './plugins/usePollingPlugin';
import useCachePlugin from './plugins/useCachePlugin';
import useAutoRunPlugin from './plugins/useAutoRunPlugin';
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin';
import useDebouncePlugin from './plugins/useDebouncePlugin';
import useThrottlePlugin from './plugins/useThrottlePlugin';
import useRetryPlugin from './plugins/useRetryPlugin';

function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins: Plugin<TData, TParams>[] = [],
) {
  return useRequestImplement(service, options, [
    ...(plugins as any),
    useLoadingDelayPlugin,
    usePollingPlugin,
    useCachePlugin,
    useAutoRunPlugin,
    useRefreshOnWindowFocusPlugin,
    useDebouncePlugin,
    useThrottlePlugin,
    useRetryPlugin,
  ]);
}

export default useRequest;
