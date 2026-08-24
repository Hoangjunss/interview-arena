---
id: co-nhung-cach-nao-de-version-mot-api-uu-nhuoc-diem
position: backend
technology: api-\u0026-http
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có những cách nào để version một API? Ưu nhược điểm?

## Question (EN)
What are the ways to version an API and their trade-offs?

## Đáp án chi tiết (VI)
Mục tiêu: thay đổi API mà **không phá client cũ**. Các cách:\
\
- **URI versioning** (`/v1/users`): rõ ràng, dễ cache/định tuyến — phổ biến nhất, nhưng lẫn version vào URL tài nguyên.\
- **Query param** (`/users?version=1`): đơn giản, nhưng dễ bị bỏ sót.\
- **Header** (`Accept: application/vnd.app.v1+json` hoặc custom header): URL sạch, đúng tinh thần REST, nhưng khó test/khám phá hơn.\
\
Nguyên tắc: chỉ tăng version khi có **breaking change**; thay đổi tương thích ngược (thêm field) thì không cần. Kèm chính sách deprecation rõ ràng.

## Detailed Answer (EN)
Goal: evolve the API **without breaking existing clients**. Options:\
\
- **URI versioning** (`/v1/users`): explicit, easy to cache/route — most common, but mixes the version into the resource URL.\
- **Query param** (`/users?version=1`): simple, but easy to omit.\
- **Header** (`Accept: application/vnd.app.v1+json` or a custom header): clean URLs, more RESTful, but harder to test/discover.\
\
Rule: bump the version only on a **breaking change**; backward-compatible changes (adding a field) do not need one. Pair it with a clear deprecation policy.
