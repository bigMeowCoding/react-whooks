import { act, renderHook } from '@testing-library/react-hooks';
import useUpdate from '../index';
import { useMemoizedFn } from '../../index';

describe('useUpdate', () => {
  it('should be defined', () => {
    expect(useUpdate).toBeDefined();
  });

  it('update', async () => {
    let count = 1;
    const hooks = renderHook(() => {
      const update = useUpdate();
      return {
        count,
        update,
        onChange: useMemoizedFn(() => {
          count++;
          update();
        }),
      };
    });
    expect(hooks.result.current.count).toBe(1);
    act(() => {
      hooks.result.current.onChange();
    });
    expect(hooks.result.current.count).toBe(2);
  });
  it('should return same function', () => {
    const hooks = renderHook(() => {
      return useUpdate();
    });
    const old = hooks.result.current;
    hooks.rerender();
    expect(hooks.result.current).toEqual(old);
  });
});
