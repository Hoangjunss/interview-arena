---
id: soft-delete-trong-postgresql-anh-huong-index-va-constraint-the-nao
position: backend
technology: schema-\u0026-constraints
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Soft delete trong PostgreSQL ảnh hưởng index và constraint thế nào?

## Question (EN)
How does soft delete affect indexes and constraints in PostgreSQL?

## Đáp án chi tiết (VI)
Soft delete = không xóa thật mà đánh dấu, thường bằng cột `deleted_at`. Hệ quả: gần như mọi query phải thêm `WHERE deleted_at IS NULL`, và điều này ảnh hưởng tới index lẫn unique constraint — vì một email \\"đã xóa\\" về lý thuyết có thể được dùng lại.\
\
Ví dụ ép email duy nhất chỉ trong nhóm user còn sống:\
```sql\
CREATE UNIQUE INDEX idx_users_email_not_deleted\
ON users (email)\
WHERE deleted_at IS NULL;\
```\
Cần cân nhắc: chính sách lưu trữ, yêu cầu xóa thật (GDPR), bloat, đặt filter mặc định, và rủi ro lập trình viên quên lọc dòng đã xóa.

## Detailed Answer (EN)
Soft delete = don't really delete, just flag it, usually with a `deleted_at` column. Consequence: almost every query must add `WHERE deleted_at IS NULL`, and this affects both indexes and unique constraints — since a \\"deleted\\" email could in theory be reused.\
\
Example enforcing unique email only among live users:\
```sql\
CREATE UNIQUE INDEX idx_users_email_not_deleted\
ON users (email)\
WHERE deleted_at IS NULL;\
```\
Consider: retention policy, real-delete requirements (GDPR), bloat, a default filter, and the risk of a developer forgetting to exclude deleted rows.
