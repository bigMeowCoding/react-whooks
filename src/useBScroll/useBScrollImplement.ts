import { useMount, useUnmount } from '../index';
import { BasicTarget, getTargetElement } from '../utils/domTarget';
import { useEffect, useMemo, useRef, useState } from 'react';
import BScroll, { Options } from '@better-scroll/core';
import useIsomorphicLayoutEffectWithTarget from '../utils/useIsomorphicLayoutEffectWithTarget';

const useBScrollImplement = (
  target: BasicTarget<HTMLElement>,
  option: Options,
  plugins: any[] = [],
) => {
  for (const plugin of plugins) {
    BScroll.use(plugin);
  }
  const bsRef = useRef<BScroll | null>(null);
  const [bScroll, setBscroll] = useState<BScroll | null>(null);

  function getAllIndicatorRelyIsLoaded() {
    return option.indicators
      ?.map((item) => {
        return getTargetElement(item.relationElement);
      })
      .every((indicator) => {
        return !!getTargetElement(indicator);
      });
  }

  function getUseIndicator() {
    return option.indicators && !!option.indicators.length;
  }

  useEffect(() => {
    const useIndicator = getUseIndicator();
    const allIndicatorRelyIsLoaded = getAllIndicatorRelyIsLoaded();
    if (useIndicator && allIndicatorRelyIsLoaded) {
      option.indicators?.forEach((indicator) => {
        // @ts-ignore
        indicator.relationElement = getTargetElement(indicator.relationElement);
      });
      makeBScoreSetting();
    }
  });

  function makeBScoreSetting() {
    const el = getTargetElement(target);
    if (!el) return;
    if (!bsRef.current) {
      bsRef.current = new BScroll(el, {
        ...option,
      });
    } else {
      bsRef.current.refresh();
    }
    setBscroll(bsRef.current);
  }

  useMount(() => {
    const useIndicator = getUseIndicator();
    const allIndicatorRelyIsLoaded = getAllIndicatorRelyIsLoaded();
    if (useIndicator && !allIndicatorRelyIsLoaded) {
      return;
    }
    makeBScoreSetting();
  });
  useUnmount(() => {
    bsRef.current?.destroy();
  });
  return { bsRef, bScroll };
};
export default useBScrollImplement;
