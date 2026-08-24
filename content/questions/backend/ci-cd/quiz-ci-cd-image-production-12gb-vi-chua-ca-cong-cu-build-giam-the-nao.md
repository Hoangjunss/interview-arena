---
id: quiz-ci-cd-image-production-12gb-vi-chua-ca-cong-cu-build-giam-the-nao
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Image production 1.2GB vì chứa cả công cụ build. Giảm thế nào?

## Đáp án trắc nghiệm
- [x] Multi-stage build: chỉ copy kết quả sang base image gọn
- [ ] Chuyển sang base image nhỏ hơn như Alpine là đủ
- [ ] Nén image lại trước khi push lên registry
- [ ] Xoá cache và tệp tạm ở dòng cuối của Dockerfile

## Giải thích (VI)
Multi-stage build : stage đầu cài dependency và build, stage cuối FROM một base gọn rồi chỉ COPY --from kết quả cần chạy. Công cụ build không đi vào image cuối.

### Giải thích các phương án:
- **Multi-stage build: chỉ copy kết quả sang base image gọn** (Đúng): Stage build có đủ công cụ, stage cuối chỉ chứa những gì cần để chạy.
- **Chuyển sang base image nhỏ hơn như Alpine là đủ** (Sai): Giúp giảm phần nào nhưng công cụ build vẫn còn trong image.
- **Nén image lại trước khi push lên registry** (Sai): Registry đã nén khi truyền; image giải nén ra vẫn lớn như vậy.
- **Xoá cache và tệp tạm ở dòng cuối của Dockerfile** (Sai): Layer trước vẫn giữ dữ liệu nên kích thước image không giảm.
