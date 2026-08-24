---
id: persisted-query-va-allowlist-khac-nhau-the-nao
position: backend
technology: vận-hành
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Persisted query và allowlist khác nhau thế nào?

## Question (EN)
How do persisted queries differ from an allowlist?

## Đáp án chi tiết (VI)
**Persisted query tự động** cho phép server học truy vấn mới khi gặp lần đầu, sau đó client chỉ gửi hash. Mục đích chính là giảm dung lượng gửi lên.\
\
```json\
POST /graphql\
{\
  \\"extensions\\": { \\"persistedQuery\\": { \\"sha256Hash\\": \\"b1e4...\\" } },\
  \\"variables\\":  { \\"id\\": \\"42\\" }\
}\
```\
\
**Allowlist** thì server chỉ chấp nhận các truy vấn đã đăng ký lúc build và từ chối mọi thứ khác. Đây mới là biện pháp bảo mật thật, vì nó loại bỏ hoàn toàn truy vấn tuỳ ý.\
\
Lợi ích kèm theo của allowlist: tập truy vấn hữu hạn nên theo dõi vận hành có ý nghĩa vì mỗi truy vấn có tên cố định, và việc ước lượng chi phí trở nên khả thi.\
\
Cái giá: quy trình phát hành phức tạp hơn vì phải đăng ký truy vấn khi build và giữ các phiên bản cũ cho tới khi mọi client cũ ngừng dùng. Với ứng dụng di động, khoảng thời gian đó có thể kéo dài nhiều tháng.

## Detailed Answer (EN)
**Automatic persisted queries** let the server learn a document on first sight, after which the client sends only a hash. The main goal is reducing upload size.\
\
```json\
POST /graphql\
{\
  \\"extensions\\": { \\"persistedQuery\\": { \\"sha256Hash\\": \\"b1e4...\\" } },\
  \\"variables\\":  { \\"id\\": \\"42\\" }\
}\
```\
\
An **allowlist** means the server accepts only queries registered at build time and rejects everything else. That is the actual security measure, since arbitrary queries become impossible.\
\
A side benefit of allowlists: a finite query set makes operational monitoring meaningful because each query has a stable name, and cost estimation becomes feasible.\
\
The cost: a more complex release process, since queries must be registered at build and old versions kept until every old client stops using them. For mobile apps that window can run for months.
