---
id: super-key-candidate-key-primary-key-va-composite-key-khac-nhau-the-nao
position: backend
technology: chuẩn-hóa
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Super key, candidate key, primary key và composite key khác nhau thế nào?

## Question (EN)
How do super key, candidate key, primary key and composite key differ?

## Đáp án chi tiết (VI)
Các khái niệm khóa đều xoay quanh việc định danh duy nhất một dòng:\
\
- **Super key**: bất kỳ tập cột nào xác định duy nhất một dòng — có thể thừa (kèm thêm cột không cần thiết).\
- **Candidate key**: super key **tối giản** — bỏ bất kỳ cột nào là mất tính duy nhất. Một bảng có thể có nhiều candidate key (vd `id` và `email`).\
- **Primary key**: candidate key được **chọn** làm khóa chính; không NULL, một bảng chỉ một cái.\
- **Composite key**: khóa gồm **từ hai cột trở lên** (vd `(order_id, product_id)` trong bảng chi tiết đơn).\
\
Các candidate key còn lại (không được chọn làm PK) gọi là alternate key, thường được đặt ràng buộc `UNIQUE`.

## Detailed Answer (EN)
These key concepts all revolve around uniquely identifying a row:\
\
- **Super key**: any set of columns that uniquely identifies a row — it may be redundant (carrying extra unneeded columns).\
- **Candidate key**: a **minimal** super key — removing any column loses uniqueness. A table can have several candidate keys (e.g. `id` and `email`).\
- **Primary key**: the candidate key **chosen** as the main key; not NULL, only one per table.\
- **Composite key**: a key made of **two or more columns** (e.g. `(order_id, product_id)` in an order-detail table).\
\
The remaining candidate keys (not chosen as PK) are called alternate keys and usually get a `UNIQUE` constraint.
