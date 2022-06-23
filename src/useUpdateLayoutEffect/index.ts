import { createUpdateEffect } from '../createUpdateEffect';
import { useLayoutEffect } from 'react';

export default createUpdateEffect(useLayoutEffect);
