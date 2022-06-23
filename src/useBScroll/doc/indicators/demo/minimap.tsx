import styles from './minimap.less';
import React, { useRef } from 'react';
import { useBScroll } from 'react-whooks';
import dinnerLink from './dinner.jpg';

const Demo = () => {
  const wrapperRef = useRef(null);
  const indicatorRef = useRef(null);
  useBScroll(wrapperRef, {
    startX: -50,
    startY: -50,
    freeScroll: true,
    bounce: false,
    indicators: [
      {
        relationElement: indicatorRef as any,
        // choose div.scroll-indicator-handle as indicatorHandle
        relationElementHandleElementIndex: 1,
      },
    ],
  });
  return (
    <div className={styles.minimapContainer}>
      <div className={styles.scrollWrapper} ref={wrapperRef}>
        <img
          style={{ maxWidth: 'none' }}
          src={dinnerLink}
          className={styles.scrollContent}
          alt=""
        />
      </div>
      <div className={styles.scrollIndicator} ref={indicatorRef}>
        <img className={styles.scrollIndicatorBg} src={dinnerLink} alt="" />
        <div className={styles.scrollIndicatorHandle}></div>
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
