import { renderHook } from '@testing-library/react-hooks';
import useSize from '../index';

describe('useSize', () => {
  it('should be defined', () => {
    expect(useSize).toBeDefined();
  });

  it('should  work', async () => {
    const { result } = renderHook(() => useSize(document.body));
    expect(result.current).toBeUndefined();
  });
});
