---
id: phan-hoi-graphql-co-the-vua-co-du-lieu-vua-co-loi-khong-client-nen-xu-ly-the-nao
position: backend
technology: xử-lý-lỗi
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phản hồi GraphQL có thể vừa có dữ liệu vừa có lỗi không? Client nên xử lý thế nào?

## Question (EN)
Can a GraphQL response contain both data and errors? How should clients handle it?

## Đáp án chi tiết (VI)
Có. Phản hồi gồm phần `data` và mảng `errors`, nên một truy vấn có thể trả về **partial result**: nhánh nào lỗi thì null và được ghi vào mảng `errors`, nhánh khác vẫn có dữ liệu.\
\
```json\
{\
  \\"data\\":   { \\"post\\": { \\"title\\": \\"Hello\\

## Detailed Answer (EN)
Yes. A response has a data part and an errors part, so a query can return **partial results**: failing branches become null and are recorded in errors while other branches still carry data.\
\
```json\
{\
  \\"data\\":   { \\"post\\": { \\"title\\": \\"Hello\\
