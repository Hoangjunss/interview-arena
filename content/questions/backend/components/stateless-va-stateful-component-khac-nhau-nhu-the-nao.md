---
id: stateless-va-stateful-component-khac-nhau-nhu-the-nao
position: backend
technology: components
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Stateless và stateful component khác nhau như thế nào?

## Question (EN)
How do stateless and stateful components differ?

## Đáp án chi tiết (VI)
**1. Stateless (Presentational) Component:**\
- Chỉ nhận `props` và render UI thuần túy.\
- Không lưu giữ hoặc quản lý `state` nội bộ.\
- Rất dễ test vì với cùng một input (props), output (UI) luôn giống nhau.\
- **Ví dụ:** `\u003cButton label='Save' onClick={fn} /\u003e`\
\
**2. Stateful (Container) Component:**\
- Quản lý `state` nội bộ và các business logic phức tạp.\
- Thường làm nhiệm vụ fetch data, xử lý dữ liệu và truyền xuống các component con.\
\
*(Lưu ý: Sự phân biệt này đã mờ dần từ khi React Hooks ra đời. Các function component hiện tại đều có thể chứa state thông qua `useState` nhưng vẫn giữ được cú pháp gọn nhẹ).*

## Detailed Answer (EN)
**1. Stateless (Presentational) Component:**\
- Only receives `props` and renders pure UI.\
- Does not hold or manage internal `state`.\
- Very easy to test because the output depends entirely on the input.\
- **Example:** `\u003cButton label='Save' onClick={fn} /\u003e`\
\
**2. Stateful (Container) Component:**\
- Manages internal `state` and complex business logic.\
- Typically responsible for fetching data, processing it, and passing it down to child components.\
\
*(Note: This distinction has blurred significantly since the introduction of Hooks. Function components can now easily hold state via `useState` while maintaining a lightweight syntax).*
