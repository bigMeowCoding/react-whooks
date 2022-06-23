/**
 * title: Default usage
 * desc: Update state or props, you can see the output in the console
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 更新 state 或 props，可以在控制台看到输出
 */
import styles from './demo1.less';
import React, { useRef } from 'react';
import { useBScroll } from 'react-whooks';

const Demo = () => {
  const emojis = [
    '👉🏼 😁 😂 🤣 👈🏼',
    '😄 😅 😆 😉 😊',
    '😫 😴 😌 😛 😜',
    '👆🏻 😒 😓 😔 👇🏻',
    '😑 😶 🙄 😏 😣',
    '😞 😟 😤 😢 😭',
    '🤑 😲 ☹️ 🙁 😖',
    '👍 👎 👊 ✊ 🤛',
    '☝️ ✋ 🤚 🖐 🖖',
    '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
    '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
    '🌖 🌗 🌘 🌑 🌒',
  ];
  const wrapperRef = useRef(null);
  useBScroll(wrapperRef, {
    scrollX: true,
    probeType: 3, // listening scroll event
  });
  return (
    <div className={styles.horizontalContainer}>
      <div className={styles.scrollWrapper} ref={wrapperRef}>
        <div className={styles.scrollContent}>
          {emojis.map((emoji, index) => (
            <div key={index} className={styles.scrollItem}>
              {emoji}
            </div>
          ))}
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
