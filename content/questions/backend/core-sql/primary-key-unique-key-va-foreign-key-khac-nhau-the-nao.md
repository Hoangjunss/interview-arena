---
id: primary-key-unique-key-va-foreign-key-khac-nhau-the-nao
position: backend
technology: core-sql
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Primary key, unique key và foreign key khác nhau thế nào?

## Question (EN)
How are primary keys, unique keys and foreign keys different?

## Đáp án chi tiết (VI)
Cả ba đều là ràng buộc nhưng phục vụ mục đích khác nhau:\
\
- **Primary key**: định danh duy nhất mỗi dòng (mỗi user một id). Đây là cột mà các bảng khác thường trỏ tới.\
- **Unique key**: đảm bảo một (hoặc vài) cột không trùng, ví dụ email không được lặp — nhưng nó không phải \\"danh tính chính\\" của dòng.\
- **Foreign key**: đảm bảo giá trị ở bảng con phải có thật ở bảng cha (order.user_id phải ứng với một user tồn tại).\
\
Mẹo trả lời phỏng vấn: PK = danh tính, UNIQUE = quy tắc nghiệp vụ (email duy nhất), FK = giữ dữ liệu liên kết không bị \\"mồ côi\\". Đừng bỏ FK chỉ để code linh hoạt hơn nếu dữ liệu cần nhất quán.

## Detailed Answer (EN)
All three are constraints but serve different purposes:\
\
- **Primary key**: uniquely identifies each row (one id per user). It is the column other tables usually point to.\
- **Unique key**: ensures one (or several) columns are not duplicated, e.g. email cannot repeat — but it is not the row's main identity.\
- **Foreign key**: ensures a child value really exists in the parent table (order.user_id must match a real user).\
\
Interview tip: PK = identity, UNIQUE = business rule (unique email), FK = keeps linked data from becoming \\"orphaned\\". Do not drop FKs just to make code more flexible when data needs consistency.
