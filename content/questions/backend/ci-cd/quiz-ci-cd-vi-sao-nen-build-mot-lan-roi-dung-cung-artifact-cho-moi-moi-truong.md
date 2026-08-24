---
id: quiz-ci-cd-vi-sao-nen-build-mot-lan-roi-dung-cung-artifact-cho-moi-moi-truong
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên build một lần rồi dùng cùng artifact cho mọi môi trường?

## Đáp án trắc nghiệm
- [ ] Vì công cụ CI không cho build nhiều lần trong cùng một pipeline
- [ ] Để pipeline chạy nhanh hơn nhờ bỏ bước build
- [x] Để thứ đã kiểm ở staging đúng là thứ chạy thật
- [ ] Để tiết kiệm dung lượng lưu trữ trên registry

## Giải thích (VI)
Để thứ đã kiểm chính là thứ chạy thật . Build lại cho từng môi trường có thể ra kết quả khác nhau (dependency đổi, cấu hình build lệch), khiến việc kiểm ở staging mất giá trị.

### Giải thích các phương án:
- **Vì công cụ CI không cho build nhiều lần trong cùng một pipeline** (Sai): Không có giới hạn như vậy.
- **Để pipeline chạy nhanh hơn nhờ bỏ bước build** (Sai): Nhanh hơn là lợi ích phụ, không phải lý do chính.
- **Để thứ đã kiểm ở staging đúng là thứ chạy thật** (Đúng): Build lại cho từng môi trường có thể cho ra kết quả khác nhau.
- **Để tiết kiệm dung lượng lưu trữ trên registry** (Sai): Dung lượng không phải vấn đề đáng kể ở đây.
