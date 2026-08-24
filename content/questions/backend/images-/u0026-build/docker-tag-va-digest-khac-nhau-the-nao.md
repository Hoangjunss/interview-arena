---
id: docker-tag-va-digest-khac-nhau-the-nao
position: backend
technology: images-\u0026-build
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker tag và digest khác nhau thế nào?

## Question (EN)
How are Docker tags and digests different?

## Đáp án chi tiết (VI)
Tag là tên tham chiếu dễ đọc như `app:1.2.0` hoặc `app:latest`, có thể bị trỏ lại image khác. Digest là content-addressed reference theo hash, bất biến theo nội dung image.\
\
Production nên tránh phụ thuộc `latest`. Dùng version tag rõ ràng và trong môi trường yêu cầu reproducibility cao có thể pin digest để đảm bảo đúng artifact được deploy.

## Detailed Answer (EN)
A tag is a human-readable reference such as `app:1.2.0` or `app:latest`, and it can be moved to another image. A digest is a content-addressed reference by hash, immutable for the image content.\
\
Production should avoid depending on `latest`. Use explicit version tags, and in environments that require strong reproducibility, pin digests to ensure the exact artifact is deployed.
