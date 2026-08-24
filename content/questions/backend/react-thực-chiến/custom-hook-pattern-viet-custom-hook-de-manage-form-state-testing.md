---
id: custom-hook-pattern-viet-custom-hook-de-manage-form-state-testing
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom Hook pattern. Viết custom hook để manage form state. Testing?

## Question (EN)
The Custom Hook pattern. Write a custom hook to manage form state. How do you test it?

## Đáp án chi tiết (VI)
Custom Hook là cách trích xuất logic tái sử dụng từ component thành function riêng, tên bắt đầu bằng 'use'. Ví dụ useForm(initialValues) trả về {values, handleChange, reset, errors} để quản lý state và validation của form. Để test custom hook, dùng renderHook từ @testing-library/react-hooks để test hành vi của hook một cách độc lập mà không cần mount component. Lợi ích chính: tách biệt logic khỏi UI, dễ test, và nhiều component có thể dùng chung — ví dụ useForm có thể dùng cho cả form đăng ký và form chỉnh sửa profile.

## Detailed Answer (EN)
A Custom Hook extracts reusable logic from a component into a standalone function prefixed with 'use'. \
\
**Example:** `useForm(initialValues)` returns `{ values, handleChange, reset, errors }` to manage form state and validation. To test a custom hook, use `renderHook` from @testing-library/react — it lets you test the hook's behavior in isolation without mounting a full component. Key benefits: separates logic from UI, easy to test, and shareable across multiple components — e.g., a single `useForm` hook for both registration and profile edit forms.
