---
id: can-doi-kieu-cua-mot-field-trong-index-dang-chay-production-lam-the-nao
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần đổi kiểu của một field trong index đang chạy production. Làm thế nào?

## Question (EN)
A field type must change on a live production index. How do you do it?

## Đáp án chi tiết (VI)
**Không đổi tại chỗ được** — phải tạo index mới với mapping đúng, `_reindex` sang, rồi chuyển alias. Alias là thứ khiến việc này không downtime, nên **luôn cho ứng dụng trỏ vào alias chứ không phải index name**.\
\
```bash\
PUT /products_v2   { \\"mappings\\": { ... } }\
\
POST /_reindex?wait_for_completion=false\
{ \\"source\\": { \\"index\\": \\"products_v1\\" }, \\"dest\\": { \\"index\\": \\"products_v2\\" } }\
\
POST /_aliases\
{ \\"actions\\": [\
  { \\"remove\\": { \\"index\\": \\"products_v1\\

## Detailed Answer (EN)
You **cannot change it in place** — create a new index with the correct mapping, `_reindex` into it, then switch the alias. The alias is what makes this zero-downtime, so **always point the application at an alias, never an index name**.\
\
```bash\
PUT /products_v2   { \\"mappings\\": { ... } }\
\
POST /_reindex?wait_for_completion=false\
{ \\"source\\": { \\"index\\": \\"products_v1\\" }, \\"dest\\": { \\"index\\": \\"products_v2\\" } }\
\
POST /_aliases\
{ \\"actions\\": [\
  { \\"remove\\": { \\"index\\": \\"products_v1\\
