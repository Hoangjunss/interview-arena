---
id: multi-tenant-mongodb-nen-thiet-ke-the-nao
position: backend
technology: schema-design
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Multi-tenant MongoDB nên thiết kế thế nào?

## Question (EN)
How should multi-tenant MongoDB be designed?

## Đáp án chi tiết (VI)
Ba lựa chọn kiến trúc phổ biến, đổi chi phí lấy mức cách ly:\
\
1. **Shared collections**: mọi tenant chung collection, thêm `tenantId` vào mọi document. Rẻ, dễ bảo trì, nhưng rủi ro bảo mật cao (quên lọc `tenantId` là lộ dữ liệu chéo) và *mọi* index quan trọng phải có `tenantId` đứng đầu.\
2. **Database mỗi tenant**: mỗi khách một database riêng. Cách ly tốt, backup/restore riêng dễ; nhưng quá nhiều tenant sẽ chạm giới hạn tài nguyên/số database của server.\
3. **Cluster mỗi tenant**: mỗi khách một cụm server riêng. An toàn nhất, đắt nhất.\
\
Thực tế SaaS hay dùng cách 1 cho tenant nhỏ, cách 2/3 cho tenant Enterprise.

## Detailed Answer (EN)
Three common architectural choices, trading cost for isolation:\
\
1. **Shared collections**: all tenants share collections, with a `tenantId` on every document. Cheap and easy to maintain, but high security risk (forgetting the `tenantId` filter leaks cross-tenant data) and *every* important index must lead with `tenantId`.\
2. **Database per tenant**: each customer gets their own database. Good isolation, easy per-tenant backup/restore; but too many tenants can hit the server's resource/database-count limits.\
3. **Cluster per tenant**: a dedicated server cluster per customer. Most secure, most expensive.\
\
In practice, SaaS often uses option 1 for small tenants and option 2/3 for Enterprise tenants.
