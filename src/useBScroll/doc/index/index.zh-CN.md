---
nav:
  path: /hooks
group:
  path: /use-BScroll
---

# 快速上手

`useBScroll` 是基于 BetterScroll 封装的 Hooks，BetterScroll 在移动端使用的场景很多，通过封装 hook 可以帮助我们避免重复写一些声明的代码

`useBScroll` 通过`option`有选择的加载 BetterScroll 的插件能力，目前已有能力包括：

- 轮播图
- 上拉加载
- 自动监听 dom 变化
- 多个 scroll 联动

接下来让我们先从两一个最简单的例子认识 `useBScroll`。

## 默认用法

`useBScroll`的第一个参数就是我们滚动元素的最外层容器

```js
useBScroll(wrapperRef, {
  scrollX: true,
  probeType: 3, // listening scroll event
});
```

<br />

## 代码演示

<code src="./demo/demo1.tsx"></code>

上面两个例子，我们演示了 `useBScroll` 最基础的用法，接下来的我们开始逐个详细介绍 `useBScroll` 的特性。
