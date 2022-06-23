import { Options } from '@better-scroll/core';
import { BasicTarget } from '../utils/domTarget';
import useBScrollImplement from './useBScrollImplement';
import Slide from '@better-scroll/slide';
import Pullup from '@better-scroll/pull-up';
import observableDom from '@better-scroll/observe-dom';
import Indicators from '@better-scroll/indicators';

const slideDefaultOption = {
  slide: {
    threshold: 100,
  },
  momentum: false,
  bounce: false,
  stopPropagation: true,
};
const pullupDefaultOption = {
  pullUpLoad: {
    threshold: 100,
  },
};

const useBScroll = (target: BasicTarget<HTMLElement>, option: Options) => {
  const plugins: any[] = [observableDom];
  option = { ...option };
  if (option.slide) {
    option = {
      ...slideDefaultOption,
      ...option,
    };
    plugins.push(Slide);
  }
  if (option.pullUpLoad) {
    option = {
      ...pullupDefaultOption,
      ...option,
    };
    plugins.push(Pullup);
  }
  if (option.indicators) {
    plugins.push(Indicators);
  }
  return useBScrollImplement(target, option, plugins);
};

export default useBScroll;
