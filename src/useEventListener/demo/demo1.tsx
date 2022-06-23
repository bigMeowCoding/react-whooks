/**
 * title: Default usage
 * desc: Click the button to preview.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 点击按钮查看效果。
 */

import React, { useRef, useState } from 'react';
import { useEventListener } from 'react-whooks';

export default () => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useEventListener(
    'click',
    () => {
      setValue(value + 1);
    },
    { target: ref },
  );

  return (
    <button ref={ref} type="button">
      You click {value} times
    </button>
  );
};
