import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import useUnmount from '../useUnmount';

function useRafState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>];
function useRafState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
];
function useRafState<S>(initState?: S | (() => S)) {
  const [state, setState] = useState(initState);
  const ref = useRef(0);
  const setRefState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(ref.current);
    ref.current = requestAnimationFrame(() => {
      setState(value as any);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(ref.current);
  });
  return [state, setRefState];
}

export default useRafState;
