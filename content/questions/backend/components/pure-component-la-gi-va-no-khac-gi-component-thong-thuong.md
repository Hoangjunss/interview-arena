---
id: pure-component-la-gi-va-no-khac-gi-component-thong-thuong
position: backend
technology: components
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pure Component là gì và nó khác gì Component thông thường?

## Question (EN)
What is a Pure Component and how does it differ from a regular Component?

## Đáp án chi tiết (VI)
**Pure Component** là component chỉ re-render khi `props` hoặc `state` của nó thực sự thay đổi, giúp tối ưu hiệu suất.\
\
Sự khác biệt so với Component thông thường:\
- **Class Component:** Thay vì kế thừa `React.Component` (luôn re-render khi cha re-render), nó kế thừa `React.PureComponent`.\
- **Function Component:** Tương đương với việc bọc component trong `React.memo()`.\
- **Cơ chế:** Nó tự động thực hiện **shallow comparison** (so sánh nông) trên `props` và `state`. Nếu không có sự khác biệt, nó sẽ bỏ qua việc re-render.\
\
**Lưu ý:** Vì dùng shallow comparison, nó có thể không nhận diện được sự thay đổi nếu bạn truyền vào một mảng hoặc object bị mutate (thay đổi trực tiếp bên trong mà không tạo reference mới).

## Detailed Answer (EN)
A **Pure Component** is a component that only re-renders when its `props` or `state` actually change, optimizing performance.\
\
Differences from a regular Component:\
- **Class Component:** Instead of extending `React.Component` (which re-renders whenever the parent re-renders), it extends `React.PureComponent`.\
- **Function Component:** The equivalent is wrapping the component in `React.memo()`.\
- **Mechanism:** It automatically performs a **shallow comparison** of `props` and `state`. If there is no difference, it skips re-rendering.\
\
**Note:** Because it uses shallow comparison, it might miss changes inside nested objects or arrays if they are mutated directly instead of generating a new reference.
