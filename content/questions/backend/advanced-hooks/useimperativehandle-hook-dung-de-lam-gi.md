---
id: useimperativehandle-hook-dung-de-lam-gi
position: backend
technology: advanced-hooks
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useImperativeHandle hook dùng để làm gì?

## Question (EN)
What is useImperativeHandle used for?

## Đáp án chi tiết (VI)
useImperativeHandle kết hợp với forwardRef để tùy chỉnh những gì parent nhìn thấy qua ref, thay vì expose toàn bộ DOM node. \
\
**Ví dụ:** expose chỉ `focus()` và `scrollIntoView()` thay vì toàn bộ input element. Giúp đóng gói internal implementation, chỉ expose API cần thiết. Dùng khi cần imperative API từ component.

## Detailed Answer (EN)
useImperativeHandle is used with forwardRef to customize what the parent sees through a ref, rather than exposing the full DOM node. For example, you can expose only `focus()` and `scrollIntoView()` instead of the entire input element. This encapsulates the internal implementation and surfaces only the necessary API. Use it when a component needs to provide an imperative interface to its parent.
