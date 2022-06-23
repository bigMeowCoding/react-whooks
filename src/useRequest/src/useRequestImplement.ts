import { Options, Plugin, Result, Service } from './types';
import {
  useCreation,
  useLatest,
  useMemoizedFn,
  useMount,
  useUnmount,
  useUpdate,
} from '../../index';
import Fetch from './fetch';

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = [],
) {
  const { manual, ...rest } = options;
  const fetchOption = {
    manual,
    ...rest,
  };
  const serviceRef = useLatest(service);
  const update = useUpdate();

  const fetchInstance = useCreation(() => {
    const initState = plugins
      .map((p) => p.onInit?.(fetchOption))
      .filter(Boolean);
    return new Fetch(
      serviceRef,
      fetchOption,
      update,
      Object.assign({}, ...initState),
    );
  }, []);

  fetchInstance.options = fetchOption;
  fetchInstance.pluginImpls = plugins.map((p) => p(fetchInstance, fetchOption));

  useMount(() => {
    if (!manual) {
      const params = (fetchInstance.state.params ||
        options.defaultParams ||
        []) as TParams;
      fetchInstance.run(...params);
    }
  });
  useUnmount(() => {
    fetchInstance.cancel();
  });
  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params || [],
    cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance as any)),
    run: useMemoizedFn(fetchInstance.run.bind(fetchInstance as any)),
    refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
    mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance)),
    runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance as any)),
  } as Result<TData, TParams>;
}
export default useRequestImplement;
