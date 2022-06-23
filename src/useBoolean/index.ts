import { useMemo } from 'react';
import useToggle from '../useToggle';

export interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
  toggle: () => void;
}
function useBoolean(defaultValue = false): [boolean, Actions] {
  const [state, { set, toggle }] = useToggle(defaultValue);
  const actions: Actions = useMemo(() => {
    return {
      set: (v) => set(!!v),
      setTrue: () => set(true),
      setFalse: () => set(false),
      toggle,
    };
  }, []);
  return [state, actions];
}

export default useBoolean;
