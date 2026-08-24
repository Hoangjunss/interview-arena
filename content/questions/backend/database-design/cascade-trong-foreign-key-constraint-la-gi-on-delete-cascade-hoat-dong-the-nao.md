---
id: cascade-trong-foreign-key-constraint-la-gi-on-delete-cascade-hoat-dong-the-nao
position: backend
technology: database-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cascade trong foreign key constraint là gì? ON DELETE CASCADE hoạt động thế nào?

## Question (EN)
What is CASCADE in a foreign key constraint? How does ON DELETE CASCADE work?

## Đáp án chi tiết (VI)
CASCADE quy định \\"khi xóa/sửa dòng cha thì làm gì với dòng con\\". Các lựa chọn `ON DELETE`:\
\
- **CASCADE**: xóa cha → tự xóa luôn con (xóa user → mất hết order, comment, session). Tiện nhưng nguy hiểm nếu đặt nhầm.\
- **SET NULL**: xóa cha → đặt FK con về NULL, con vẫn còn (xóa category → `products.category_id = NULL`). Dùng khi con tồn tại độc lập được.\
- **RESTRICT** (mặc định): chặn xóa cha nếu còn con — an toàn nhất, app phải tự xử lý.\
- **SET DEFAULT**: đặt FK về giá trị mặc định.\
\
Lưu ý chuỗi lan: `A → B → C` cùng CASCADE thì xóa A kéo theo B rồi C — dễ không lường hết.\
\
Khi nào dùng CASCADE: quan hệ \\"sở hữu\\" rõ ràng, con vô nghĩa nếu thiếu cha (order → order_items, user → sessions). Khi không nên: tài nguyên dùng chung (xóa tác giả không nên xóa sách nếu sách còn giá trị riêng). Lưu ý: nếu dùng soft delete thì CASCADE **không** kích hoạt — phải tự code logic xóa lan ở tầng app.

## Detailed Answer (EN)
$89
