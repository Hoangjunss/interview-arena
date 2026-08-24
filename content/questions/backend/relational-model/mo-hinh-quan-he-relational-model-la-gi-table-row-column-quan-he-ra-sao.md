---
id: mo-hinh-quan-he-relational-model-la-gi-table-row-column-quan-he-ra-sao
position: backend
technology: relational-model
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mô hình quan hệ (relational model) là gì? Table, row, column, quan hệ ra sao?

## Question (EN)
What is the relational model? How do tables, rows, columns and relationships fit together?

## Đáp án chi tiết (VI)
Mô hình quan hệ tổ chức dữ liệu thành các **bảng (relation)**:\
\
- **Column (attribute)**: một trường có kiểu dữ liệu xác định (int, text, timestamp...).\
- **Row (tuple)**: một bản ghi — một thực thể cụ thể.\
- **Table**: tập các row cùng cấu trúc column.\
\
Quan hệ giữa bảng biểu diễn bằng **khóa**: mỗi hàng có **primary key** định danh duy nhất; bảng khác tham chiếu tới nó bằng **foreign key**. Nhờ đó tránh lặp dữ liệu và dùng `JOIN` để ghép lại khi truy vấn.\
\
Mọi thao tác dựa trên **đại số quan hệ** (select, project, join) và diễn đạt bằng **SQL** khai báo — mô tả *cần gì*, không phải *lấy thế nào*.

## Detailed Answer (EN)
The relational model organizes data into **tables (relations)**:\
\
- **Column (attribute)**: a typed field (int, text, timestamp...).\
- **Row (tuple)**: a single record — one concrete entity.\
- **Table**: a set of rows sharing the same columns.\
\
Relationships between tables are expressed with **keys**: each row has a **primary key** that uniquely identifies it; another table references it via a **foreign key**. This avoids duplicating data and lets `JOIN` recombine it at query time.\
\
Operations rest on **relational algebra** (select, project, join) and are expressed in declarative **SQL** — you describe *what* you want, not *how* to fetch it.
