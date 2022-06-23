---
nav:
  path: /hooks
group:
  path: /use-BScroll
---

# observeDom

如果设置了 `observeDOM: true`会自动监听子节点变化自动刷新 better-scroll

```js
useBScroll(wrapperRef, {
  observeDOM: true,
  scrollX: true,
  scrollY: false,
});
```

<br />

## 代码演示

<code src="./demo/default.tsx"></code>
