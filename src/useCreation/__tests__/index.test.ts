import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import useCreation from '../index';

describe('useCreation', () => {
  it('should be defined', () => {
    expect(useCreation).toBeDefined();
  });
  class Foo {
    data: number;
    constructor() {
      this.data = Math.random();
    }
  }
  const setUp = () => {
    return renderHook(() => {
      const [count, setCount] = useState(0);
      const [, setFlag] = useState({});
      const foo = useCreation(() => new Foo(), [count]);
      return {
        foo,
        count,
        setCount,
        setFlag,
      };
    });
  };
  it('should work', () => {
    const hook = setUp();
    const { foo } = hook.result.current;
    act(() => {
      hook.result.current.setFlag({});
    });
    expect(hook.result.current.foo).toBe(foo);
    // @ts-ignore
    expect(hook.result.current.foo?.data).toBe(foo?.data);
    act(() => {
      hook.result.current.setCount(1);
    });
    expect(hook.result.current.foo).not.toBe(foo);
    expect(hook.result.current.count).toBe(1);
  });
});
