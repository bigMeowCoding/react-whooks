import { renderHook } from '@testing-library/react-hooks';
import useEventListener from '../index';

describe('useBoolean', () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
  });

  it('test methods', async () => {
    let state = 0;
    const onClick = () => {
      state++;
    };
    const { rerender, unmount } = renderHook(() =>
      useEventListener('click', onClick, { target: container }),
    );
    document.body.click();
    expect(state).toEqual(0);
    container.click();
    expect(state).toEqual(1);
    container.click();
    expect(state).toEqual(2);
    unmount();
    container.click();
    expect(state).toEqual(2);
  });
});
