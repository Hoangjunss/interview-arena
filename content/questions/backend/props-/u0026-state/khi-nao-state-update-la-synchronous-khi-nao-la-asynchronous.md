---
id: khi-nao-state-update-la-synchronous-khi-nao-la-asynchronous
position: backend
technology: props-\u0026-state
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào state update là synchronous, khi nào là asynchronous?

## Question (EN)
When are state updates synchronous vs asynchronous?

## Đáp án chi tiết (VI)
Trong React, việc cập nhật state (`setState`) **luôn luôn được lên lịch (scheduled)**. Bản thân nó không thực sự là Synchronous (Đồng bộ) hay Asynchronous (Bất đồng bộ) theo khái niệm mạng/I/O thông thường, mà do React quyết định thời điểm thích hợp để \\"flush\\" (thực thi) các bản cập nhật đó.\
\
- **Trong React 18 (Với Automatic Batching):** Hầu hết các cập nhật state đều bị **trì hoãn (deferred/batched)**. React sẽ gộp nhiều `setState` lại thành một lần re-render để tối ưu hiệu năng. Nếu bạn gọi `console.log` ngay sau `setState`, bạn sẽ thấy state CHƯA thay đổi ngay lập tức.\
- **Làm sao để ép cập nhật Đồng bộ (Synchronous)?** Nếu bạn thực sự cần React phải tính toán và cập nhật DOM ngay lập tức (ví dụ: cần đọc kích thước DOM sau update), bạn phải bọc `setState` bên trong hàm `flushSync()` (import từ `react-dom`).\
\
```jsx\
import { flushSync } from \\"react-dom\\";\
\
// Ép React update DOM ngay lập tức\
flushSync(() =\u003e {\
  setCount(count + 1);\
});\
// Tại đây DOM đã được cập nhật\
```

## Detailed Answer (EN)
In React, state updates (`setState`) are **always scheduled**. They are not strictly Synchronous or Asynchronous in the traditional network/I/O sense; rather, React decides the optimal time to \\"flush\\" (execute) these updates.\
\
- **In React 18 (With Automatic Batching):** Most state updates are **deferred (batched)**. React groups multiple `setState` calls into a single re-render for performance optimization. If you `console.log` immediately after calling `setState`, you will see that the state HAS NOT changed yet.\
- **How to force a Synchronous update?** If you absolutely need React to process the state and update the DOM immediately (e.g., needing to read new DOM measurements), you must wrap your `setState` call inside the `flushSync()` function (imported from `react-dom`).
