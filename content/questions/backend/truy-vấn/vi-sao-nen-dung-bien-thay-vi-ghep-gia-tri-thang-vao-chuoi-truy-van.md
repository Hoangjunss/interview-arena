---
id: vi-sao-nen-dung-bien-thay-vi-ghep-gia-tri-thang-vao-chuoi-truy-van
position: backend
technology: truy-vấn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên dùng biến thay vì ghép giá trị thẳng vào chuỗi truy vấn?

## Question (EN)
Why use variables instead of interpolating values into the query string?

## Đáp án chi tiết (VI)
Dùng biến thì **query document giữ nguyên shape** cho mọi giá trị, nên server phân tích và cache được, còn giá trị được kiểm tra kiểu theo schema. Ghép chuỗi tạo ra một truy vấn khác nhau mỗi lần và cho phép người dùng ảnh hưởng tới cấu trúc truy vấn.\
\
```graphql\
query GetPost($id: ID!) { post(id: $id) { title } }\
# variables travel separately: { \\"id\\": \\"42\\" } — the document shape never changes\
```\
\
Việc giữ nguyên shape còn là điều kiện cho hai kỹ thuật quan trọng: persisted query, nơi client gửi hash thay vì cả document; và allowlist, nơi server từ chối mọi truy vấn không đăng ký.\
\
Một lợi ích thực dụng khác: với biến, công cụ codegen tạo ra kiểu chính xác cho tham số ở phía client, nên gõ sai tên hay sai kiểu bị bắt lúc biên dịch thay vì lúc chạy.

## Detailed Answer (EN)
With variables the **query document keeps a stable shape** across values, so the server can parse and cache it while values are type-checked against the schema. Interpolation produces a different query every time and lets user input influence query structure.\
\
```graphql\
query GetPost($id: ID!) { post(id: $id) { title } }\
# variables travel separately: { \\"id\\": \\"42\\" } — the document shape never changes\
```\
\
A stable shape also enables two important techniques: persisted queries, where the client sends a hash instead of the document; and allowlists, where the server rejects any unregistered query.\
\
Another practical benefit: with variables, code generators produce exact argument types on the client, so wrong names or types fail at build time rather than runtime.
