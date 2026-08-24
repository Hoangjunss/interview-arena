---
id: custom-hook-la-gi-va-tai-sao-chung-ta-nen-su-dung-no
position: backend
technology: hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom Hook là gì và tại sao chúng ta nên sử dụng nó?

## Question (EN)
What is a Custom Hook and why should we use it?

## Đáp án chi tiết (VI)
**Custom Hook** là một hàm JavaScript thông thường, nhưng tên của nó bắt đầu bằng `use` và nó có thể gọi các Hook khác của React bên trong nó (như `useState`, `useEffect`, `useContext`, v.v.).\
\
**Tại sao nên sử dụng Custom Hook?**\
- **Tái sử dụng Logic:** Cho phép bạn trích xuất logic có trạng thái (stateful logic) từ một component để có thể tái sử dụng nó trên nhiều component khác nhau một cách độc lập.\
- **Giữ cho Component sạch sẽ:** Component chỉ nên tập trung vào việc render UI. Tách logic phức tạp vào Custom Hook giúp code dễ đọc và dễ bảo trì hơn.\
- **Kiểm thử dễ dàng hơn:** Logic được đóng gói trong một hàm độc lập (hook) có thể được test riêng biệt.\
\
**Ví dụ:** Thay vì viết logic fetch API lặp đi lặp lại ở nhiều nơi, bạn có thể tạo một hook `useFetch(url)` trả về `{ data, loading, error }`.

## Detailed Answer (EN)
A **Custom Hook** is a regular JavaScript function, but its name starts with `use` and it can call other React Hooks inside it (like `useState`, `useEffect`, `useContext`, etc.).\
\
**Why use a Custom Hook?**\
- **Reusing Logic:** It allows you to extract stateful logic from a component so it can be tested independently and reused across multiple components.\
- **Keeping Components Clean:** Components should focus on rendering UI. Extracting complex logic into Custom Hooks makes code easier to read and maintain.\
- **Easier Testing:** Logic encapsulated in an independent function (hook) can be tested in isolation.\
\
**Example:** Instead of duplicating API fetching logic in multiple places, you can create a `useFetch(url)` hook that returns `{ data, loading, error }`.
