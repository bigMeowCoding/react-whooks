import { createEffectWithTarget } from './createEffectWithTarget';
import { useLayoutEffect } from 'react';

export default createEffectWithTarget(useLayoutEffect);
