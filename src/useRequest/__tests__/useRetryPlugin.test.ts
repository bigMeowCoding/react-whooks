import { act, renderHook } from '@testing-library/react-hooks';
import { useRequest } from '../../index';
import { request } from '../../utils/testingHelpers';

describe('useRetryPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service: any, options: any) =>
    renderHook((o) => useRequest(service, o || options));

  let hook: any;
  it('base', async () => {
    let errorCallback;
    act(() => {
      errorCallback = jest.fn();
      hook = setUp(() => request(0), {
        retryCount: 3,
        onError: errorCallback,
      });
    });
    act(() => {
      // jest.setTimeout(10000);
      jest.advanceTimersByTime(500);
    });
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(2);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(3);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(4);

    act(() => {
      jest.runAllTimers();
    });
    expect(errorCallback).toHaveBeenCalledTimes(4);
    hook.unmount();
  });
  it('cancel', async () => {
    let errorCallback;

    act(() => {
      errorCallback = jest.fn();
      hook = setUp(() => request(0), {
        retryCount: 3,
        onError: errorCallback,
      });
    });
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(2);
    act(() => {
      hook.result.current.cancel();
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook.unmount();
  });
});
