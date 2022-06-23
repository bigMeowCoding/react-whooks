import { act, renderHook } from '@testing-library/react-hooks';
import useRafState from '../index';

const setUp = (defaultValue?: boolean) =>
  renderHook(() => useRafState(defaultValue));

describe('useRafState', () => {
  it('should be defined', () => {
    expect(useRafState).toBeDefined();
  });

  it('should  work', async () => {
    const { result } = renderHook(() => useRafState(0));
    const [state, setState] = result.current;
    expect(state).toEqual(0);
    act(() => {
      // tslint:disable-next-line:no-unused-expression
      setState(1);
      requestAnimationFrame(() => {
        expect(state).toEqual(1);
      });
    });
  });
});
