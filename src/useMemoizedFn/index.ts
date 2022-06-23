import { useMemo, useRef } from 'react';

type noop = (this: any, ...args: any[]) => any;
type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;
function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);
  fnRef.current = useMemo(() => {
    return fn;
  }, [fn]);
  const memeorized = useRef<PickFunction<T>>();
  if (!memeorized.current) {
    memeorized.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }
  return memeorized.current;
}
export default useMemoizedFn;
