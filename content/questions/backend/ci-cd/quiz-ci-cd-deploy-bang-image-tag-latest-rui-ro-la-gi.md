---
id: quiz-ci-cd-deploy-bang-image-tag-latest-rui-ro-la-gi
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deploy bằng image tag latest. Rủi ro là gì?

## Đáp án trắc nghiệm
- [x] Không biết chính xác bản nào đang chạy nên khó rollback
- [ ] Image latest luôn bị tải lại nên deploy chậm hơn
- [ ] Không thể dùng latest với môi trường nhiều node
- [ ] Registry sẽ xoá tag latest sau một thời gian

## Giải thích (VI)
latest là cái tên di động : nó trỏ vào đâu tuỳ lần push cuối. Khi có sự cố, bạn không biết chính xác code nào đang chạy và không rollback về đúng bản trước được. Tag theo commit SHA hoặc phiên bản.

### Giải thích các phương án:
- **Không biết chính xác bản nào đang chạy nên khó rollback** (Đúng): Tag theo commit SHA cho biết đúng code nào đang chạy trên production.
- **Image latest luôn bị tải lại nên deploy chậm hơn** (Sai): Có thể xảy ra tuỳ chính sách pull nhưng không phải rủi ro chính.
- **Không thể dùng latest với môi trường nhiều node** (Sai): Dùng được, chỉ là không xác định được phiên bản.
- **Registry sẽ xoá tag latest sau một thời gian** (Sai): Không có chính sách xoá tự động như vậy.
