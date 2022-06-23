import { act, renderHook } from '@testing-library/react-hooks';
import { useEffect, useLayoutEffect, useState } from 'react';
import { createDeepCompareEffect } from '../index';

describe('creatDeepCompareEffect', () => {
  it('should be defined', () => {
    expect(createDeepCompareEffect).toBeDefined();
  });

  it('work for useEffect', async () => {
    const useDeepCompareEffect = createDeepCompareEffect(useEffect);

    const hook = renderHook(() => {
      const [x, setX] = useState(0);
      const [y, setY] = useState({ foo: 'foo', bar: ['baz'] });
      useDeepCompareEffect(() => {
        setX((prev) => prev + 1);
      }, [y]);
      return { x, setY };
    });
    expect(hook.result.current.x).toEqual(1);
    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['baz'] });
    });
    expect(hook.result.current.x).toBe(1);
    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['bazz'] });
    });
    expect(hook.result.current.x).toBe(2);
  });
  it('work for useLayoutEffect', async () => {
    const useDeepCompareEffect = createDeepCompareEffect(useLayoutEffect);

    const hook = renderHook(() => {
      const [x, setX] = useState(0);
      const [y, setY] = useState({ foo: 'foo', bar: ['baz'] });
      useDeepCompareEffect(() => {
        setX((prev) => prev + 1);
      }, [y]);
      return { x, setY };
    });
    expect(hook.result.current.x).toEqual(1);
    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['baz'] });
    });
    expect(hook.result.current.x).toBe(1);
    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['bazz'] });
    });
    expect(hook.result.current.x).toBe(2);
  });
  it('deps is undefined should rerender in useEffect', async () => {
    const useDeepCompareEffect = createDeepCompareEffect(useEffect);
    let count = 0;
    const render = renderHook(() => {
      useDeepCompareEffect(() => {
        count += 1;
      });
    });

    expect(count).toBe(1);
    render.rerender();
    expect(count).toBe(2);
    render.rerender();
    expect(count).toBe(3);
  });
  it('deps is undefined should rerender in useLayoutEffect', async () => {
    const useDeepCompareEffect = createDeepCompareEffect(useLayoutEffect);
    let count = 0;
    const render = renderHook(() => {
      useDeepCompareEffect(() => {
        count += 1;
      });
    });

    expect(count).toBe(1);
    render.rerender();
    expect(count).toBe(2);
    render.rerender();
    expect(count).toBe(3);
  });
});
