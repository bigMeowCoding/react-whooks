import { MutableRefObject } from 'react';
import { FetchState, Options, PluginReturn, Service, Subscribe } from './types';

class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] = [];

  count: number = 0;
  state: FetchState<TData, TParams> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  };
  constructor(
    public serviceRef: MutableRefObject<Service<TData, TParams>>,
    public options: Options<TData, TParams>,
    public subscribe: Subscribe, // 更新
    public initState: Partial<FetchState<TData, TParams>> = {},
  ) {
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState,
    };
  }
  setState(s: Partial<FetchState<TData, TParams>>) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.subscribe();
  }
  runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    const r = this.pluginImpls
      .map((impl) => (impl[event] as any)?.(...rest))
      .filter(Boolean);
    return Object.assign({}, ...r);
  }
  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1;
    const currentCount = this.count;
    const {
      returnNow = false,
      stopNow = false,
      ...state
    } = this.runPluginHandler('onBefore', params);
    // stop request
    if (stopNow) {
      // tslint:disable-next-line:no-empty
      return new Promise(() => {});
    }
    this.setState({
      loading: true,
      params,
      ...state,
    });

    // use cache
    if (returnNow) {
      return Promise.resolve(state.data);
    }
    this.options.onBefore?.(params);
    try {
      let { servicePromise } = this.runPluginHandler(
        'onRequest',
        this.serviceRef.current,
        params,
      );
      if (!servicePromise) {
        servicePromise = this.serviceRef.current(...params);
      }
      const res = await servicePromise;
      if (currentCount !== this.count) {
        // tslint:disable-next-line:no-empty
        return new Promise(() => {});
      }
      this.setState({
        loading: false,
        data: res,
        error: undefined,
      });
      this.options.onSuccess?.(res, params);
      this.runPluginHandler('onSuccess', res, params);
      this.options.onFinally?.(params, res, undefined);
      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, res, undefined);
      }
      return res;
    } catch (e: any) {
      if (currentCount !== this.count) {
        // tslint:disable-next-line:no-empty
        return new Promise(() => {});
      }
      this.setState({
        loading: false,
        error: e,
      });
      this.options.onError?.(e, params);
      this.runPluginHandler('onError', e, params);
      this.options.onFinally?.(params, undefined, e);
      if (this.count === currentCount) {
        this.runPluginHandler('onFinally', params, undefined, e);
      }
      throw e;
    }
  }
  run(...params: TParams) {
    this.runAsync(...params).catch((e) => {
      if (!this.options.onError) {
        console.error(e);
      }
    });
  }
  cancel() {
    this.count += 1;
    this.setState({
      loading: false,
    });
    this.runPluginHandler('onCancel');
  }
  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    let res: TData | undefined;
    if (typeof data === 'function') {
      // @ts-ignore
      res = data(this.state.data);
    } else {
      res = data;
    }
    this.runPluginHandler('onMutate', res);
    this.setState({
      data: res,
    });
  }

  refresh() {
    this.run(...(this.state.params || ([] as any)));
  }
}
export default Fetch;
