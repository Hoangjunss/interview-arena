---
id: quiz-android-kotlin-hien-thi-danh-sach-dai-trong-compose-nen-dung-thanh-phan-nao
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hiển thị danh sách dài trong Compose nên dùng thành phần nào?

## Đáp án trắc nghiệm
- [ ] Cột thường kết hợp với khả năng cuộn
- [ ] Lưới có số cột cố định
- [x] Danh sách lười chỉ dựng phần thấy được
- [ ] Hộp chứa với các phần tử xếp chồng

## Giải thích (VI)
Dùng danh sách lười vì nó chỉ dựng các mục đang hiển thị. Cột thường kèm cuộn sẽ dựng toàn bộ phần tử ngay lập tức, nên với vài trăm mục là màn hình khựng khi mở và tốn bộ nhớ suốt vòng đời.

### Giải thích các phương án:
- **Cột thường kết hợp với khả năng cuộn** (Sai): Cách này dựng tất cả phần tử ngay lập tức.
- **Lưới có số cột cố định** (Sai): Lưới dành cho bố cục nhiều cột, không phải giải pháp cho danh sách dài.
- **Danh sách lười chỉ dựng phần thấy được** (Đúng): Cột thường dựng toàn bộ phần tử nên danh sách dài gây khựng và tốn bộ nhớ.
- **Hộp chứa với các phần tử xếp chồng** (Sai): Hộp xếp chồng các phần tử lên nhau chứ không tạo danh sách.
