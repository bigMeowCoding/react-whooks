import { useLoadingDelayPlugin } from '../src/plugins/useLoadingDelayPlugin';
import { act, renderHook } from '@testing-library/react-hooks';
import { useRequest } from '../../index';
import { request } from '../../utils/testingHelpers';

describe('useLoadingDelayPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service: any, options: any) =>
    renderHook((o) => useRequest(service, o || options));
  let hook: any;
  it('should be defined', () => {
    expect(useLoadingDelayPlugin).toBeDefined();
  });
  it('should work', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 2000,
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();

    act(() => {
      hook = setUp(request, {
        loadingDelay: 500,
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });
});
