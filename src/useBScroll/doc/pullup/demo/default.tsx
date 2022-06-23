/**
 * title: Default usage
 * desc: Update state or props, you can see the output in the console
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 更新 state 或 props，可以在控制台看到输出
 */
import styles from './default.less';
import React, { useRef, useState } from 'react';
import range from '../../../../utils/range';
import { useBScroll } from 'react-whooks';

const Demo = () => {
  const wrapperRef = useRef(null);
  const [data, setData] = useState(30);
  const [isPullUpLoad, setIsPullUpLoad] = useState(false);
  const { bScroll } = useBScroll(wrapperRef, {
    pullUpLoad: true,
  });
  const requestData = async () => {
    try {
      const newData = await ajaxGet(/* url */);
      setData((d) => {
        return d + newData ?? 0;
      });
    } catch (err) {
      // handle err
      console.log(err);
    }
  };
  const ajaxGet: () => Promise<number> = (/* url */) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(20);
      }, 1000);
    });
  };
  const pullingUpHandler = async () => {
    setIsPullUpLoad(true);

    await requestData();

    bScroll?.finishPullUp();
    bScroll?.refresh();
    setIsPullUpLoad(false);
  };

  bScroll?.on('pullingUp', pullingUpHandler);
  return (
    <div className={styles.pullup}>
      <div ref={wrapperRef} className={styles.pullupWrapper}>
        <div>
          <ul className={styles.pullupList}>
            {range(1, data).map((d) => {
              return (
                <li className={styles.pullupListItem}>
                  {d % 5 === 0 ? 'scroll up 👆🏻' : `I am item ${d} `}
                </li>
              );
            })}
          </ul>
          <div className={styles.pullupTips}>
            {!isPullUpLoad ? (
              <div>
                <span>Pull up and load more</span>
              </div>
            ) : (
              <div className="after-trigger">
                <span className="pullup-txt">Loading...</span>
              </div>
            )}
          </div>
        </div>
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
