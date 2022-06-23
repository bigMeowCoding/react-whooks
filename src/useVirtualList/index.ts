import { BasicTarget, getTargetElement } from '../utils/domTarget';
import useLatest from '../useLatest';
import useSize from '../useSize';
import { useEffect, useMemo, useRef, useState } from 'react';
import useEventListener from '../useEventListener';
import useMemoizedFn from '../useMemoizedFn';

type IItemHeightFunc<T> = (index: number, item: T) => number;
export interface Options<T> {
  containerTarget: BasicTarget;
  wrapperTarget: BasicTarget;
  itemHeight: number | IItemHeightFunc<T>;
  overscan?: number;
}
function useVirtualList<T = any>(list: T[], options: Options<T>) {
  const { containerTarget, wrapperTarget, itemHeight, overscan = 5 } = options;
  const itemHeightRef = useLatest(itemHeight);
  const size = useSize(containerTarget);
  const [targetList, setTargetList] = useState<{ index: number; data: T }[]>(
    [],
  );
  const scrollTriggerByScrollToFunc = useRef(false);

  const totalHeight = useMemo(() => {
    if (typeof itemHeightRef.current === 'number') {
      return list.length * itemHeightRef.current;
    }
    return list.reduce(
      (sum, _, index) =>
        sum + (itemHeightRef.current as IItemHeightFunc<T>)(index, list[index]),
      0,
    );
    // @ts-ignore
  }, [list]);
  function getOffset(scrollTop: number) {
    if (typeof itemHeightRef.current === 'number') {
      return Math.floor(scrollTop / itemHeightRef.current);
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const iHeight = itemHeightRef.current(i, list[i]);
      sum += iHeight;
      if (sum > scrollTop) {
        offset = i;
        break;
      }
    }
    return offset;
  }

  function getVisibleCount(containerHeight: number, fromIndex: number) {
    if (typeof itemHeightRef.current === 'number') {
      return Math.ceil(containerHeight / itemHeightRef.current);
    }
    let sum = 0;
    let endIndex = 0;
    for (let i = fromIndex; i < list.length; i++) {
      const iHeight = itemHeightRef.current(i, list[i]);
      sum += iHeight;
      if (sum >= containerHeight) {
        endIndex = i;
        break;
      }
    }
    return endIndex - fromIndex;
  }
  function getDistanceTop(index: number) {
    if (typeof itemHeightRef.current === 'number') {
      return index * itemHeightRef.current;
    }
    return list.slice(0, index).reduce((sum, _, i) => {
      return sum + (itemHeightRef.current as IItemHeightFunc<T>)(i, list[i]);
    }, 0);
  }
  const calculateRectangle = () => {
    const container = getTargetElement(containerTarget);
    const wrapper = getTargetElement(wrapperTarget) as HTMLElement;
    if (!container || !wrapper) {
      return;
    }
    const { clientHeight, scrollTop } = container;
    const offset = getOffset(scrollTop);
    const visibleCount = getVisibleCount(clientHeight, offset);
    const start = Math.max(0, offset - overscan);
    const end = Math.min(list.length, offset + visibleCount + overscan);
    const offsetTop = getDistanceTop(start);
    wrapper.style.height = totalHeight - offsetTop + 'px';
    wrapper.style.marginTop = offsetTop + 'px';
    setTargetList(
      list.slice(start, end).map((ele, index) => {
        return { data: ele, index: start + index };
      }),
    );
  };
  useEffect(() => {
    if (!size?.width || !size?.height) {
      return;
    }
    calculateRectangle();
  }, [size?.height, size?.width, list]);
  useEventListener(
    'scroll',
    (e) => {
      if (scrollTriggerByScrollToFunc.current) {
        scrollTriggerByScrollToFunc.current = false;
        return;
      }
      calculateRectangle();
      e.preventDefault();
    },
    {
      target: containerTarget,
    },
  );
  const scrollTo = (index: number) => {
    const container = getTargetElement(containerTarget);
    if (!container) {
      return;
    }
    scrollTriggerByScrollToFunc.current = true;
    container.scrollTop = getDistanceTop(index);
    calculateRectangle();
  };
  return [targetList, useMemoizedFn(scrollTo)] as const;
}

export default useVirtualList;
