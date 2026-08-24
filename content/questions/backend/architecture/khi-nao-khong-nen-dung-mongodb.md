---
id: khi-nao-khong-nen-dung-mongodb
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào không nên dùng MongoDB?

## Question (EN)
When should you not use MongoDB?

## Đáp án chi tiết (VI)
Đừng dùng MongoDB khi:\
\
- Dữ liệu **quan hệ chằng chịt**: phải join hàng chục bảng với nhau (`$lookup` của MongoDB rất đắt).\
- Cần **transaction phức tạp**, cập nhật nhiều đối tượng liên tục.\
- Cần **ràng buộc chặt từ database** (như foreign key thật).\
- Trọng tâm là **báo cáo SQL ad-hoc**: công cụ BI truyền thống nối bằng SQL hợp với RDBMS/Data Warehouse hơn nhiều.\
\
*Lưu ý:* nhét JSON vào MongoDB chỉ vì \\"lười tạo bảng PostgreSQL\\" — về sau query thống kê sẽ rất cực.

## Detailed Answer (EN)
Don't use MongoDB when:\
\
- Data is **densely relational**: you must join dozens of tables together (MongoDB's `$lookup` is expensive).\
- You need **complex transactions** updating many entities frequently.\
- You need **strict database-enforced constraints** (like real foreign keys).\
- The focus is **ad-hoc SQL reporting**: traditional BI tools connect via SQL and fit RDBMS/Data Warehouses much better.\
\
*Common trap:* dumping JSON into MongoDB just because you're \\"too lazy to create PostgreSQL tables\\" — statistical querying becomes painful later.
