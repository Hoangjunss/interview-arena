---
id: tai-sao-goi-setcount-count-1-ba-lan-trong-cung-event-chi-tang-1-khi-nao-bat-buoc
position: backend
technology: props-\u0026-state
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao gọi `setCount(count + 1)` ba lần trong cùng event chỉ tăng 1? Khi nào bắt buộc dùng functional updater?

## Question (EN)
Why does calling `setCount(count + 1)` three times in the same event only increment by 1? When must you use the functional updater?

## Đáp án chi tiết (VI)
Event handler **capture closure** — `count` được \\"đóng băng\\" ở giá trị render hiện tại. Ba lần `setCount(count + 1)` đều dùng cùng giá trị cũ → React batch lại, kết quả chỉ +1.\
\
```jsx\
const [count, setCount] = useState(0)\
\
const handleClick = () =\u003e {\
  // BAD: Direct: closure capture count=0 → 3 lần đều set thành 1\
  setCount(count + 1)\
  setCount(count + 1)\
  setCount(count + 1)\
\
  // OK: Functional updater: prev là giá trị mới nhất trong update queue\
  setCount(prev =\u003e prev + 1)\
  setCount(prev =\u003e prev + 1)\
  setCount(prev =\u003e prev + 1)\
}\
```\
\
**Khi nào BẮT BUỘC functional form:**\
- Nhiều `setState` liên tiếp dựa trên giá trị trước đó.\
- Setter gọi trong async callback (`setTimeout`, Promise) — closure đã stale.\
- Trong `useEffect` cleanup hoặc với deps cũ.\
\
**Khi nào dùng direct form OK:** setState 1 lần với giá trị từ event (`setName(e.target.value)`), không phụ thuộc state trước.

## Detailed Answer (EN)
The event handler **captures a closure** — `count` is frozen at the value from the current render. Three `setCount(count + 1)` calls all use the same old value → React batches them, result is only +1.\
\
```jsx\
const [count, setCount] = useState(0)\
\
const handleClick = () =\u003e {\
  // BAD: Direct: closure captures count=0 → all 3 set to 1\
  setCount(count + 1)\
  setCount(count + 1)\
  setCount(count + 1)\
\
  // OK: Functional updater: prev is the latest value in the update queue\
  setCount(prev =\u003e prev + 1)\
  setCount(prev =\u003e prev + 1)\
  setCount(prev =\u003e prev + 1)\
}\
```\
\
**When the functional form is REQUIRED:**\
- Multiple `setState` calls in a row based on the previous value.\
- Setters called inside async callbacks (`setTimeout`, Promise) — the closure is already stale.\
- Inside `useEffect` cleanup or with outdated deps.\
\
**When the direct form is fine:** a single `setState` with a value from the event (`setName(e.target.value)`), not depending on the previous state.
