---
id: lam-sao-doc-ghi-zustand-store-tu-code-ngoai-react-interceptor-socket-handler-va
position: backend
technology: store-ngoài-react
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao đọc/ghi Zustand store từ code ngoài React (interceptor, socket handler)? Và reset store giữa các test bằng cách nào?

## Question (EN)
How do you read/write a Zustand store from outside React (interceptors, socket handlers)? And how do you reset it between tests?

## Đáp án chi tiết (VI)
Store của Zustand là một object độc lập với React, nên gọi trực tiếp được ở bất kỳ đâu:\
\
```ts\
import { useAuthStore } from '@/store/auth'\
\
// đọc snapshot hiện tại (không subscribe)\
const token = useAuthStore.getState().token\
\
// ghi từ axios interceptor khi gặp 401\
useAuthStore.getState().clearSession()\
\
// lắng nghe thay đổi ngoài component\
const unsub = useAuthStore.subscribe(s =\u003e console.log(s.token))\
```\
\
Lưu ý: `getState()` chỉ trả về **giá trị tại thời điểm gọi**, không phản ứng với thay đổi sau đó — đừng dùng trong render, chỉ dùng trong event handler, interceptor, hàm tiện ích.\
\
**Test:** store là module-level singleton nên state rò rỉ giữa các test. Chuẩn hoá bằng cách lưu initial state rồi reset:\
\
```ts\
const initial = useAuthStore.getInitialState()\
beforeEach(() =\u003e useAuthStore.setState(initial, true))\
```\
\
Tham số thứ hai `true` là **replace** — thay toàn bộ state thay vì merge, đảm bảo không còn field thừa từ test trước.

## Detailed Answer (EN)
A Zustand store is a plain object independent of React, so you can call it anywhere:\
\
```ts\
import { useAuthStore } from '@/store/auth'\
\
// read the current snapshot (no subscription)\
const token = useAuthStore.getState().token\
\
// write from an axios interceptor on 401\
useAuthStore.getState().clearSession()\
\
// listen for changes outside components\
const unsub = useAuthStore.subscribe(s =\u003e console.log(s.token))\
```\
\
Note: `getState()` returns the value **at call time** and does not react to later changes — never use it during render, only in event handlers, interceptors, and utilities.\
\
**Testing:** the store is a module-level singleton, so state leaks between tests. Capture the initial state and reset:\
\
```ts\
const initial = useAuthStore.getInitialState()\
beforeEach(() =\u003e useAuthStore.setState(initial, true))\
```\
\
The second argument `true` means **replace** — swap the whole state instead of merging, guaranteeing no leftover fields from the previous test.
