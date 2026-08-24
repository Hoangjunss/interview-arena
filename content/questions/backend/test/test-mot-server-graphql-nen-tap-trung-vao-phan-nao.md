---
id: test-mot-server-graphql-nen-tap-trung-vao-phan-nao
position: backend
technology: test
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test một server GraphQL nên tập trung vào phần nào?

## Question (EN)
What should testing a GraphQL server focus on?

## Đáp án chi tiết (VI)
Chạy **truy vấn thật qua schema** rồi so kết quả, vì cách này phủ cả schema, resolver và business logic đúng như client sẽ gặp. Data source bên dưới thì giả lập để test nhanh và ổn định.\
\
Các trường hợp nên phủ ngoài đường đi thành công: lỗi ở một nhánh và partial result; phân quyền cho từng vai trò; giá trị null ở các field cho phép null; và các giới hạn như Depth, Complexity cùng phân trang ở biên.\
\
Một dạng test riêng đáng có trong CI là kiểm tra thay đổi schema có breaking change không — nó bắt được các thay đổi như gỡ field hay thêm tham số bắt buộc trước khi ra tới client.\
\
Về phía client, nên giả lập ở mức phản hồi HTTP thay vì giả lập từng hàm, để phần phân tích dữ liệu và ánh xạ kiểu vẫn chạy thật.

## Detailed Answer (EN)
Run **real queries through the schema** and assert the results, since that covers the schema, resolvers and business layer exactly as a client experiences them. Fake the underlying data sources for speed and stability.\
\
Cases worth covering beyond the happy path: an error in one branch producing partial results; authorisation per role; nulls on nullable fields; and limits such as depth, complexity and pagination boundaries.\
\
A distinct CI check worth having is schema change validation — it catches removals and newly required arguments before they reach clients.\
\
On the client side, fake at the HTTP response level rather than stubbing functions so parsing and type mapping still run for real.
