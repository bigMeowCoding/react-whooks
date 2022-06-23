import useToggle from '../index';
import { act, renderHook } from '@testing-library/react-hooks';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};
describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined();
  });
  it('test on init', async () => {
    const hook = renderHook(() => useToggle());
    expect(hook.result.current[0]).toBeFalsy();
  });
  it('test on method', async () => {
    const hook = renderHook(() => {
      return useToggle('hello');
    });
    expect(hook.result.current[0]).toEqual('hello');
    act(() => {
      // @ts-ignore
      hook.result.current[1].toggle();
    });
    expect(hook.result.current[0]).toBeFalsy();
    act(() => {
      // @ts-ignore
      hook.result.current[1].setLeft();
    });
    expect(hook.result.current[0]).toEqual('hello');
    act(() => {
      // @ts-ignore
      hook.result.current[1].setRight();
    });
    expect(hook.result.current[0]).toBeFalsy();
  });
  it('test on optional', () => {
    const hook = renderHook(() => {
      return useToggle('hello', 'world');
    });
    callToggle(hook);
    expect(hook.result.current[0]).toEqual('world');
    act(() => {
      // @ts-ignore
      hook.result.current[1].set('hello');
    });
    expect(hook.result.current[0]).toEqual('hello');
    callToggle(hook);
    expect(hook.result.current[0]).toEqual('world');
  });
});
