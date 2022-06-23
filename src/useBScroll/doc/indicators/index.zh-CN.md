---
nav:
  path: /hooks
group:
  path: /use-BScroll
---

# 多滚动容器

某些业务场景需要我们控制多个滚动容器完成一些比较炫酷的效果例如下边这个例子：

```js
useBScroll(wrapperRef, {
  startX: -50,
  startY: -50,
  freeScroll: true,
  bounce: false,
  indicators: [
    {
      relationElement: indicatorRef,
      // choose div.scroll-indicator-handle as indicatorHandle
      relationElementHandleElementIndex: 1,
    },
  ],
});
```

<br />

## 代码演示

<code src="./demo/minimap.tsx"></code>
