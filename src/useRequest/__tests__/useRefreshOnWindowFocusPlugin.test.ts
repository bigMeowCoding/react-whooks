import { act, renderHook } from '@testing-library/react-hooks';
import { useRequest } from '../../index';
import { request } from '../../utils/testingHelpers';
// @ts-ignore
import { fireEvent, wait, waitFor } from '@testing-library/react';

describe('useRefreshOnWindowFocusPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service: any, options: any) =>
    renderHook((o) => useRequest(service, o || options));

  let hook: any;
  it('base', async () => {
    act(() => {
      hook = setUp(request, {
        refreshOnWindowFocus: true,
        focusTimespan: 5000,
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.advanceTimersByTime(1001);
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      fireEvent.focus(window);
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      jest.advanceTimersByTime(3000);
      fireEvent.focus(window);
    });
    expect(hook.result.current.loading).toEqual(true);
    hook.unmount();
  });
});
