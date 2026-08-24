---
id: state-batching-trong-react-la-gi-thay-doi-trong-react-18
position: backend
technology: props-\u0026-state
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
State batching trong React là gì? Thay đổi trong React 18?

## Question (EN)
What is state batching in React? What changed in React 18?

## Đáp án chi tiết (VI)
**State batching (Gộp trạng thái)** là cơ chế tối ưu hiệu năng của React. Thay vì re-render ngay lập tức mỗi khi bạn gọi `setState`, React sẽ \\"gộp\\" nhiều lệnh `setState` lại với nhau và chỉ kích hoạt một lần re-render duy nhất.\
\
**Sự khác biệt giữa React 17 và 18:**\
- **React 17:** Chỉ thực hiện batching bên trong các event handlers của React (như `onClick`, `onChange`). Nếu bạn gọi `setState` bên trong `setTimeout`, `Promise`, hoặc native event handlers, React sẽ KHÔNG gộp chúng lại, dẫn đến nhiều lần re-render không cần thiết.\
- **React 18 (Automatic Batching):** React tự động gộp *tất cả* các state updates bất kể chúng nằm ở đâu (kể cả trong `setTimeout` hay `Promise`).\
\
*(Mẹo: Nếu vì lý do nào đó bạn muốn ép React không gộp state và update DOM ngay lập tức, bạn có thể bọc code trong `flushSync()`)*.

## Detailed Answer (EN)
**State batching** is a performance optimization mechanism in React. Instead of re-rendering immediately every time you call `setState`, React groups multiple `setState` calls together and triggers only a single re-render.\
\
**The difference between React 17 and 18:**\
- **React 17:** Batching only worked inside React event handlers (like `onClick`, `onChange`). If you called `setState` inside a `setTimeout`, a `Promise`, or a native event handler, React would NOT batch them, leading to unnecessary multiple re-renders.\
- **React 18 (Automatic Batching):** React now automatically batches *all* state updates, regardless of where they happen (including inside `setTimeout` and `Promises`).\
\
*(Tip: If for some reason you need to opt-out of batching and force an immediate synchronous DOM update, you can wrap your update inside `flushSync()`)*.
