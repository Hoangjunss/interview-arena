---
id: docker-image-production-nen-toi-uu-security-the-nao
position: backend
technology: images-\u0026-build
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker image production nên tối ưu security thế nào?

## Question (EN)
How should a production Docker image be hardened?

## Đáp án chi tiết (VI)
Image production nên dùng base image nhỏ, pin version, giảm packages thừa, chạy non-root, không chứa secrets, scan vulnerabilities, ký/verify image nếu pipeline yêu cầu và cập nhật dependency đều đặn.\
\
Ví dụ non-root:\
```\
RUN addgroup -S app \u0026\u0026 adduser -S app -G app\
USER app\
```\
Distroless hoặc slim image có thể giảm surface, nhưng cần đảm bảo observability/debug strategy vì image quá tối giản có thể thiếu shell/tools khi xử lý incident.

## Detailed Answer (EN)
A production image should use a small base image, pinned versions, fewer unnecessary packages, non-root runtime, no secrets, vulnerability scanning, image signing/verification when required by the pipeline and regular dependency updates.\
\
Non-root example:\
```\
RUN addgroup -S app \u0026\u0026 adduser -S app -G app\
USER app\
```\
Distroless or slim images can reduce surface area, but make sure observability and debugging strategy are ready because very minimal images may lack shells/tools during incidents.
