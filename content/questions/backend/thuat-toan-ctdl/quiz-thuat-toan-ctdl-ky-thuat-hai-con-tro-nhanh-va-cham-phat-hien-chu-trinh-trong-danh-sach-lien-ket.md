---
id: quiz-thuat-toan-ctdl-ky-thuat-hai-con-tro-nhanh-va-cham-phat-hien-chu-trinh-trong-danh-sach-lien-ket
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kỹ thuật hai con trỏ nhanh và chậm phát hiện chu trình trong danh sách liên kết dựa trên điều gì?

## Đáp án trắc nghiệm
- [ ] Con trỏ chậm ghi lại các nút đã thăm để so sánh
- [ ] Hai con trỏ luôn gặp nhau đúng ở nút bắt đầu chu trình
- [ ] Con trỏ nhanh gặp lại nút đầu danh sách sau đúng một vòng
- [x] Nếu có chu trình, con trỏ nhanh sẽ đuổi kịp con chậm

## Giải thích (VI)
Con trỏ chậm đi một bước, con trỏ nhanh đi hai bước. Nếu có chu trình, cả hai đều mắc trong vòng và khoảng cách giữa chúng giảm đúng một đơn vị mỗi bước , nên chắc chắn về 0. Không có chu trình thì con trỏ nhanh chạm null và dừng. Chi phí O(n) thời gian, O(1) bộ nhớ.

### Giải thích các phương án:
- **Con trỏ chậm ghi lại các nút đã thăm để so sánh** (Sai): Kỹ thuật này hấp dẫn chính vì không dùng bộ nhớ phụ nào.
- **Hai con trỏ luôn gặp nhau đúng ở nút bắt đầu chu trình** (Sai): Điểm gặp thường không phải điểm vào chu trình, cần thêm một bước nữa để tìm.
- **Con trỏ nhanh gặp lại nút đầu danh sách sau đúng một vòng** (Sai): Chu trình không nhất thiết chứa nút đầu, phần đuôi thẳng có thể dài tuỳ ý.
- **Nếu có chu trình, con trỏ nhanh sẽ đuổi kịp con chậm** (Đúng): Trong vòng, khoảng cách giữa hai con trỏ giảm một đơn vị mỗi bước nên phải về 0.
