---
id: thiet-ke-postgresql-multi-tenant-co-nhung-lua-chon-nao
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế PostgreSQL multi-tenant có những lựa chọn nào?

## Question (EN)
What are the choices for PostgreSQL multi-tenant design?

## Đáp án chi tiết (VI)
Ba lựa chọn chính, đổi sự đơn giản lấy mức cách ly:\
\
- **Shared tables + `tenant_id`**: mọi tenant chung bảng, phân biệt bằng cột `tenant_id`. Đơn giản, tiết kiệm nhất, nhưng phải index và phân quyền thật chặt.\
- **Schema mỗi tenant**: cách ly tốt hơn, công sức vừa phải.\
- **Database mỗi tenant**: cách ly mạnh nhất, nhưng migration/vận hành nặng nhất.\
\
Với shared tables, gần như mọi unique/index quan trọng phải có `tenant_id` đứng đầu:\
```sql\
CREATE UNIQUE INDEX idx_users_tenant_email\
ON users (tenant_id, email);\
```\
Rủi ro lớn nhất là quên lọc `tenant_id` (rò rỉ dữ liệu chéo tenant) — cân nhắc Row Level Security, backup/restore theo từng tenant, và độ phức tạp khi migration.

## Detailed Answer (EN)
Three main choices, trading simplicity for isolation:\
\
- **Shared tables + `tenant_id`**: all tenants share tables, distinguished by a `tenant_id` column. Simplest and most efficient, but needs very strict indexing and authorization.\
- **Schema per tenant**: better isolation, moderate effort.\
- **Database per tenant**: strongest isolation, but heaviest migration/operations.\
\
With shared tables, nearly every important unique/index must lead with `tenant_id`:\
```sql\
CREATE UNIQUE INDEX idx_users_tenant_email\
ON users (tenant_id, email);\
```\
The biggest risk is forgetting the `tenant_id` filter (cross-tenant data leak) — consider Row Level Security, per-tenant backup/restore, and migration complexity.
