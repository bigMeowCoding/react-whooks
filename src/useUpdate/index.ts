import { useCallback, useState } from 'react';

function useUpdate() {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
}
export default useUpdate;
