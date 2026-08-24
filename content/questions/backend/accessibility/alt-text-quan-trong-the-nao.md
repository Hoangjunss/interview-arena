---
id: alt-text-quan-trong-the-nao
position: backend
technology: accessibility
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Alt text quan trọng thế nào?

## Question (EN)
Why is alt text important?

## Đáp án chi tiết (VI)
`alt` mô tả ảnh cho screen reader, và hiện ra khi ảnh không tải được. Nội dung viết gì **phụ thuộc vai trò của ảnh**:\
\
```html\
\u003c!-- 1. ảnh mang thông tin: mô tả thông tin đó --\u003e\
\u003cimg src=\\"chart.png\\" alt=\\"Doanh thu Q1 tăng 40% so với Q4 trước\\"\u003e\
\
\u003c!-- 2. ảnh trang trí: alt rỗng để screen reader bỏ qua --\u003e\
\u003cimg src=\\"divider.svg\\" alt=\\"\\"\u003e\
\
\u003c!-- 3. ảnh là link/nút: mô tả ĐÍCH ĐẾN, không mô tả hình --\u003e\
\u003ca href=\\"/gio-hang\\"\u003e\u003cimg src=\\"cart.svg\\" alt=\\"Giỏ hàng, 3 sản phẩm\\"\u003e\u003c/a\u003e\
```\
\
Lỗi hay gặp, theo thứ tự phổ biến:\
- `alt=\\"IMG_2043.jpg\\"` — screen reader đọc nguyên tên file.\
- `alt=\\"hình ảnh sản phẩm\\"` — không thêm thông tin gì.\
- Bắt đầu bằng \\"Hình ảnh của…\\" — screen reader đã tự thông báo đây là ảnh rồi.\
- **Bỏ hẳn `alt`** — tệ nhất: screen reader không biết bỏ qua hay đọc, thường đọc luôn URL.\
\
Phân biệt `alt=\\"\\"` (cố ý bỏ qua) và không có `alt` (thiếu sót) là chi tiết hay bị hỏi.\
\
**Chốt:** phép thử nhanh — đọc to trang mà thay mỗi ảnh bằng `alt` của nó; nếu câu văn vẫn trôi và không mất thông tin thì `alt` đã đúng.

## Detailed Answer (EN)
$80
