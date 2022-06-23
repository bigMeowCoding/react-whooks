---
nav:
  path: /hooks
group:
  path: /use-BScroll
---

# 基本用法

这一小节我们会介绍 `useBScroll` 最核心，最基础的能力，也就是 `useBScroll` 内核的能力。

## 水平滚动

`wrapperRef`的第一个参数就是我们滚动元素的最外层容器

```js
useBScroll(wrapperRef, {
  scrollX: true,
  probeType: 3, // listening scroll event
});
```

<br />

### 代码演示

<code src="./demo/horizontal.tsx"></code>

## 垂直滚动

`wrapperRef`的第一个参数就是我们滚动元素的最外层容器

```js
useBScroll(wrapperRef, {
  scrollY: true,
  probeType: 3, // listening scroll event
});
```

### 代码演示

<code src="./demo/vertical.tsx"></code>
