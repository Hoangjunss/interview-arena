---
id: khi-nao-dung-has-many-through-thay-vi-has-and-belongs-to-many
position: backend
technology: associations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng `has_many :through` thay vì `has_and_belongs_to_many`?

## Question (EN)
When should you use `has_many :through` instead of `has_and_belongs_to_many`?

## Đáp án chi tiết (VI)
Cả hai mô hình quan hệ **nhiều-nhiều**, khác nhau ở chỗ **có model trung gian hay không**:\
\
- **`has_and_belongs_to_many` (HABTM):** chỉ cần một **bảng nối** (vd `authors_books`), **không có model** cho nó. Gọn khi quan hệ thuần túy là \\"nối\\

## Detailed Answer (EN)
$82
