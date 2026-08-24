---
id: controlled-va-uncontrolled-component-khac-nhau-the-nao
position: backend
technology: react
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Controlled và uncontrolled component khác nhau thế nào?

## Question (EN)
What is the difference between controlled and uncontrolled components?

## Đáp án chi tiết (VI)
Phân biệt theo **nơi giữ giá trị của form input**:\
\
- **Controlled**: React state là **nguồn sự thật duy nhất**. Input nhận `value={state}` và cập nhật qua `onChange`. React kiểm soát mọi lần gõ.\
  - Ưu: dễ **validate tức thời**, disable nút, format khi gõ, đồng bộ nhiều field.\
  - Nhược: mỗi phím gõ là một lần re-render (thường không đáng ngại).\
- **Uncontrolled**: **DOM tự giữ giá trị**; React đọc khi cần qua **`ref`** (`inputRef.current.value`). Dùng `defaultValue` cho giá trị khởi tạo.\
  - Ưu: ít code, ít re-render; hợp form đơn giản, tích hợp thư viện non-React, hoặc `\u003cinput type=\\"file\\"\u003e` (luôn uncontrolled).\
\
**Khuyến nghị**: mặc định dùng **controlled** cho hầu hết form vì kiểm soát và validate tốt hơn; chọn uncontrolled khi cần tối giản hoặc truy cập DOM trực tiếp.\
\
Lưu ý: một input đừng để lẫn `value` và `defaultValue` — chọn một kiểu.

## Detailed Answer (EN)
The distinction is **where the form input’s value lives**:\
\
- **Controlled**: React state is the **single source of truth**. The input takes `value={state}` and updates via `onChange`. React controls every keystroke.\
  - Pros: easy **instant validation**, disabling buttons, formatting while typing, syncing multiple fields.\
  - Cons: each keystroke is a re-render (usually negligible).\
- **Uncontrolled**: the **DOM keeps the value**; React reads it when needed via a **`ref`** (`inputRef.current.value`). Use `defaultValue` for the initial value.\
  - Pros: less code, fewer re-renders; good for simple forms, integrating non-React libraries, or `\u003cinput type=\\"file\\"\u003e` (always uncontrolled).\
\
**Recommendation**: default to **controlled** for most forms for better control and validation; choose uncontrolled when you want minimalism or direct DOM access.\
\
Note: do not mix `value` and `defaultValue` on one input — pick one mode.
