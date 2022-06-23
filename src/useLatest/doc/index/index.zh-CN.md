---
nav:
  path: /hooks
---

# useLatest

返回当前最新的结果，可以避免使用 useState 时闭包的问题

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```
const value = useLatest<T>(p:T):MutableRefObject<T>
```
