---
id: prop-key-trong-danh-sach-react-de-lam-gi-vi-sao-khong-nen-dung-index
position: backend
technology: react
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prop `key` trong danh sách React để làm gì? Vì sao không nên dùng index?

## Question (EN)
What is the `key` prop for in React lists? Why not use the index?

## Đáp án chi tiết (VI)
`key` cho React **danh tính ổn định** của mỗi phần tử trong danh sách qua các lần render. Nhờ đó khi diff, React biết phần tử nào được **giữ, thêm, xóa, hay đổi chỗ** thay vì dựng lại toàn bộ.\
\
**Vì sao không nên dùng array index làm `key`:** khi danh sách bị **thêm/xóa/sắp xếp lại**, index gắn với vị trí chứ không gắn với dữ liệu → React ghép nhầm phần tử cũ với dữ liệu mới. Hậu quả:\
- **State cục bộ lệch** (giá trị input, checkbox dính nhầm dòng).\
- Render sai hoặc cập nhật DOM thừa.\
\
**Đúng**: dùng **id ổn định, duy nhất** từ dữ liệu (`item.id`).\
\
Lưu ý:\
- `key` chỉ cần **duy nhất giữa các anh em**, không cần toàn cục.\
- Dùng index **chỉ tạm chấp nhận** khi danh sách **tĩnh, không đổi thứ tự, không có state cục bộ**.\
- `key` là gợi ý cho React, **không** truyền xuống làm prop của component.

## Detailed Answer (EN)
`key` gives React a **stable identity** for each list item across renders. That lets the diff know which items are **kept, added, removed, or reordered** instead of rebuilding everything.\
\
**Why not use the array index as `key`:** when the list is **inserted into / removed from / reordered**, the index tracks position, not data → React pairs the wrong old element with new data. Consequences:\
- **Local state gets misaligned** (input values, checkboxes stick to the wrong row).\
- Incorrect rendering or unnecessary DOM updates.\
\
**Correct**: use a **stable, unique id** from the data (`item.id`).\
\
Notes:\
- `key` only needs to be **unique among siblings**, not globally.\
- Using the index is **only acceptable** when the list is **static, never reordered, and has no local state**.\
- `key` is a hint to React; it is **not** passed down as a prop to the component.
