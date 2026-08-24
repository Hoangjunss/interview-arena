---
id: react-fragment-la-gi-va-khi-nao-nen-su-dung
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Fragment là gì và khi nào nên sử dụng?

## Question (EN)
What is a React Fragment and when should you use it?

## Đáp án chi tiết (VI)
React Fragment (cú pháp `\u003cReact.Fragment\u003e` hoặc viết tắt `\u003c\u003e`) cho phép nhóm nhiều phần tử con lại với nhau mà không tạo thêm một thẻ DOM thừa (như `\u003cdiv\u003e`) bọc bên ngoài.\
\
**Khi nào nên sử dụng:**\
- Khi một component cần return nhiều phần tử cùng cấp.\
- Khi nhóm các phần tử bên trong `\u003cdl\u003e`, `\u003cul\u003e`, hoặc `\u003ctable\u003e` (ví dụ: `\u003ctr\u003e` hoặc `\u003cli\u003e`) mà thẻ bọc ngoài sẽ làm sai cấu trúc HTML hợp lệ.\
\
**Lưu ý về cú pháp:**\
Cú pháp rút gọn `\u003c\u003e...\u003c/\u003e` **không** hỗ trợ thuộc tính `key`. Nếu bạn đang lặp qua một mảng để tạo danh sách Fragment, bạn bắt buộc phải dùng cú pháp đầy đủ: `\u003cReact.Fragment key={item.id}\u003e...\u003c/React.Fragment\u003e`.

## Detailed Answer (EN)
React Fragment (`\u003cReact.Fragment\u003e` or shorthand `\u003c\u003e`) lets you group a list of children without adding an extra DOM node (like a `\u003cdiv\u003e`) to the actual DOM.\
\
**When to use it:**\
- When a component needs to return multiple sibling elements.\
- When grouping elements inside a `\u003cdl\u003e`, `\u003cul\u003e`, or `\u003ctable\u003e` (e.g., `\u003ctr\u003e` or `\u003cli\u003e`) where an extra wrapper would result in invalid HTML markup.\
\
**Syntax Note:**\
The shorthand `\u003c\u003e...\u003c/\u003e` does **not** support the `key` attribute. If you are mapping over an array to create a list of Fragments, you must use the explicit syntax: `\u003cReact.Fragment key={item.id}\u003e...\u003c/React.Fragment\u003e`.
