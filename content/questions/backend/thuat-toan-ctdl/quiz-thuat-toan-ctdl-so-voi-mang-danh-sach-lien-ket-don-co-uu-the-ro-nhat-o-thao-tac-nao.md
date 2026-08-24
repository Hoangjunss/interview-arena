---
id: quiz-thuat-toan-ctdl-so-voi-mang-danh-sach-lien-ket-don-co-uu-the-ro-nhat-o-thao-tac-nao
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So với mảng, danh sách liên kết đơn có ưu thế rõ nhất ở thao tác nào?

## Đáp án trắc nghiệm
- [ ] Truy cập phần tử thứ i theo chỉ số
- [ ] Tìm giá trị lớn nhất trong cấu trúc
- [ ] Duyệt tuần tự toàn bộ phần tử
- [x] Chèn hoặc xoá khi đã có con trỏ

## Giải thích (VI)
Chèn và xoá tại một vị trí đã cầm con trỏ : chỉ cần nối lại liên kết, O(1), trong khi mảng phải dịch phần tử nên O(n). Đổi lại danh sách liên kết mất khả năng truy cập theo chỉ số ở O(1) và kém thân thiện với cache.

### Giải thích các phương án:
- **Truy cập phần tử thứ i theo chỉ số** (Sai): Phải đi từ đầu nên là O(i), còn mảng là O(1).
- **Tìm giá trị lớn nhất trong cấu trúc** (Sai): Cả hai đều phải duyệt hết, không bên nào có ưu thế.
- **Duyệt tuần tự toàn bộ phần tử** (Sai): Cùng bậc O(n) nhưng mảng nhanh hơn trong thực tế nhờ bộ nhớ đệm.
- **Chèn hoặc xoá khi đã có con trỏ** (Đúng): Chỉ cần nối lại con trỏ, không phải dịch phần tử nào.
