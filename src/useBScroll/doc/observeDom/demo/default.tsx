/**
 * title: Default usage
 * desc: Update state or props, you can see the output in the console
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 更新 state 或 props，可以在控制台看到输出
 */
// @ts-ignore
import styles from './default.less';
import React, { useRef, useState } from 'react';
import { useBScroll } from 'react-whooks';
import range from '../../../../utils/range';

const Demo = () => {
  const wrapperRef = useRef(null);

  const [nums, setNums] = useState(15);

  useBScroll(wrapperRef, {
    observeDOM: true,
    scrollX: true,
    scrollY: false,
  });

  return (
    <div className={styles.observeDomContainer}>
      <div className={styles.scrollWrapper} ref={wrapperRef}>
        <div className={styles.scrollContent}>
          {range(1, nums).map((item, index) => {
            return <div className={styles.scrollItem}>{index + 1}</div>;
          })}
        </div>
      </div>
      <button
        className={styles.btn}
        onClick={() => {
          setNums((n) => n + 2);
        }}
      >
        append two children element
      </button>
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
