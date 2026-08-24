---
id: quiz-ci-cd-deploy-tu-dong-khi-merge-vao-main-can-dieu-kien-gi-de-an-toan
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deploy tự động khi merge vào main cần điều kiện gì để an toàn?

## Đáp án trắc nghiệm
- [ ] Có môi trường staging giống production hoàn toàn
- [ ] Deploy vào giờ thấp điểm để giảm ảnh hưởng
- [x] Test đủ tin, rollback nhanh, giám sát phát hiện lỗi sớm
- [ ] Mọi pull request đều được ít nhất hai người review

## Giải thích (VI)
Ba điều kiện: test đủ tin để merge là deploy được, rollback nhanh đã diễn tập, và giám sát báo được ngay khi lỗi tăng. Thiếu bất kỳ điều nào thì deploy tự động chỉ đẩy lỗi ra production nhanh hơn.

### Giải thích các phương án:
- **Có môi trường staging giống production hoàn toàn** (Sai): Hữu ích nhưng không thay được rollback và giám sát.
- **Deploy vào giờ thấp điểm để giảm ảnh hưởng** (Sai): Giảm thiệt hại nhưng cũng làm ít người phát hiện vấn đề hơn.
- **Test đủ tin, rollback nhanh, giám sát phát hiện lỗi sớm** (Đúng): Thiếu một trong ba thì deploy tự động chỉ làm sự cố tới nhanh hơn.
- **Mọi pull request đều được ít nhất hai người review** (Sai): Tốt cho chất lượng nhưng người review không bắt được mọi lỗi runtime.
