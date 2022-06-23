import { useRequest } from '../../index';
import { act, renderHook } from '@testing-library/react-hooks';
import { request } from '../../utils/testingHelpers';

describe('useRequest', () => {
  it('should be defined', () => {
    expect(useRequest).toBeDefined();
  });
  jest.useFakeTimers();
  const setUp = (service: any, options: any) =>
    renderHook((o) => useRequest(service, o || options));
  let hook: any;
  it('auto run', async () => {
    let value, success;
    const successCallBack = (v: any) => {
      success = v;
    };
    const errorCallback = jest.fn();
    const beforeCallback = () => {
      value = 'before';
    };
    const finallyCallBack = () => {
      value = 'finally';
    };
    act(() => {
      hook = setUp(request, {
        onBefore: beforeCallback,
        onSuccess: successCallBack,
        onError: errorCallback,
        onFinally: finallyCallBack,
      });
    });
    // @ts-ignore
    expect(hook.result.current.loading).toEqual(true);
    expect(value).toEqual('before');
    expect(success).toEqual(undefined);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(success).toEqual('success');
    expect(hook.result.current.data).toEqual('success');
    expect(value).toEqual('finally');
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(errorCallback).toHaveBeenCalledTimes(1);

    // manual run success
    act(() => {
      hook.result.current.run(1);
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);
    hook.unmount();

    act(() => {
      hook = setUp(() => request(0), {
        onSuccess: successCallBack,
        onError: errorCallback,
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook.unmount();
  });
  it('manually triggered', async () => {
    act(() => {
      hook = setUp(request, {
        manual: true,
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      hook.result.current.run(1);
    });
    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');

    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.error).toEqual(new Error('fail'));
    hook.unmount();
  });
  it('run async', async () => {
    let success, error;
    act(() => {
      hook = setUp(request, {
        manual: true,
      });
    });
    act(() => {
      hook.result.current
        .runAsync(0)
        .then((res: any) => {
          success = res;
        })
        .catch((err: Error) => {
          error = err;
        });
    });
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(success).toBeUndefined();
    expect(error).toEqual(new Error('fail'));

    success = '';
    error = '';
    act(() => {
      hook.result.current
        .runAsync(1)
        .then((res: any) => {
          success = res;
        })
        .catch((err: Error) => {
          error = err;
        });
    });

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(success).toEqual('success');
    expect(error).toEqual('');
    hook.unmount();
  });
  it('defaultParams', async () => {
    act(() => {
      hook = setUp(request, {
        defaultParams: [1, 2, 3],
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.params).toEqual([1, 2, 3]);
    expect(hook.result.current.data).toEqual('success');
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });
  it('mutate', async () => {
    act(() => {
      hook = setUp(request, {});
    });
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');
    act(() => {
      hook.result.current.mutate('hello');
    });
    expect(hook.result.current.data).toEqual('hello');
    hook.unmount();
  });
});
