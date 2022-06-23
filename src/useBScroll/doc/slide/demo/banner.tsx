/**
 * title: Default usage
 * desc: Update state or props, you can see the output in the console
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 更新 state 或 props，可以在控制台看到输出
 */
import styles from './banner.less';
import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { useBScroll } from 'react-whooks';

const Demo = () => {
  const wrapperRef = useRef(null);

  const [num, setNum] = useState(3);
  const nums = useMemo(() => {
    return Array.from(new Array(num), (v, i) => i + 1);
  }, [num]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { bScroll } = useBScroll(wrapperRef, {
    scrollX: true,
    scrollY: false,
    slide: true,
    momentum: false,
    bounce: false,
    probeType: 3,
  });
  bScroll?.on('scrollEnd', () => {
    console.log('scrollend');
  });

  bScroll?.on('slideWillChange', (page: any) => {
    console.log('slideWillChange', page);
    setCurrentPageIndex(page.pageX);
  });

  bScroll?.on('slidePageChanged', (page: any) => {
    console.log('CurrentPage changed to => ', page);
  });
  return (
    <div className={styles.slideBanner}>
      <div className={styles.bannerWrapper}>
        <div className={styles.slideBannerWrapper} ref={wrapperRef}>
          <div className={styles.slideBannerContent}>
            {nums.map((num) => {
              return (
                <div
                  key={num}
                  // @ts-ignore
                  className={classNames(styles.slidePage, styles['page' + num])}
                >
                  page {num}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.dotsWrapper}>
          {nums.map((num, i) => {
            return (
              <span
                key={num}
                className={classNames(
                  styles.dot,
                  i === currentPageIndex ? styles.active : null,
                )}
              ></span>
            );
          })}
        </div>
      </div>
      <div className={styles.btnWrap}>
        <button
          className="prev"
          onClick={() => {
            bScroll?.prev();
          }}
        >
          prePage
        </button>
        <button
          onClick={() => {
            bScroll?.next();
          }}
        >
          nextPage
        </button>
      </div>
    </div>
  );
};

export default () => {
  return (
    <div>
      <Demo />
    </div>
  );
};
