---
nav:
  path: /hooks
group:
  path: /use-BScroll
---

# 轮播图

如果设置了 ` slide: true`可以打开轮播图功能。

```js
const { bScroll } = useBScroll(wrapperRef, {
  scrollX: true,
  scrollY: false,
  slide: true,
  momentum: false,
  bounce: false,
  probeType: 3,
});
```

<br />

## 代码演示

<code src="./demo/banner.tsx"></code>
