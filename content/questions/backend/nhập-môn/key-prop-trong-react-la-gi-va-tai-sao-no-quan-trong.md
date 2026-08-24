---
id: key-prop-trong-react-la-gi-va-tai-sao-no-quan-trong
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Key prop trong React là gì và tại sao nó quan trọng?

## Question (EN)
What is the key prop in React and why does it matter?

## Đáp án chi tiết (VI)
`key` là một prop đặc biệt dạng string hoặc number mà bạn cần truyền vào khi tạo danh sách các element trong React.\
\
**Tại sao `key` quan trọng?**\
- **Định danh phần tử:** Giúp React xác định phần tử nào đã thay đổi, được thêm vào, hoặc bị xóa khỏi danh sách.\
- **Tối ưu hiệu suất (Reconciliation):** Nhờ có `key`, React có thể tái sử dụng các DOM node hiện có một cách chính xác thay vì phá hủy và tạo lại từ đầu, giúp tránh re-render không cần thiết.\
\
**Best practices:**\
- `key` phải **duy nhất** giữa các phần tử anh em (siblings).\
- Nên dùng ID duy nhất từ dữ liệu (vd: `item.id`).\
- **Hạn chế dùng index** của mảng làm `key` nếu danh sách đó có thể bị thay đổi thứ tự, thêm, hoặc xóa, vì nó sẽ gây lỗi hiển thị và mất focus state.

## Detailed Answer (EN)
The `key` is a special string or number prop you need to include when creating lists of elements.\
\
**Why does it matter?**\
- **Element Identification:** It helps React identify which items have changed, are added, or are removed.\
- **Performance (Reconciliation):** With keys, React can accurately match and reuse existing DOM nodes rather than destroying and recreating them, optimizing the rendering process.\
\
**Best practices:**\
- Keys must be **unique** among siblings.\
- Use unique IDs from your data (e.g., `item.id`).\
- **Avoid using array index** as a key if the list can be reordered, items can be inserted, or deleted, as it can lead to incorrect rendering and lost state (like input focus).
