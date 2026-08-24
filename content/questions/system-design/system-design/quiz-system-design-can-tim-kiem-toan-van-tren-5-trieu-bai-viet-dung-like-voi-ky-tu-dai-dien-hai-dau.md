---
id: quiz-system-design-can-tim-kiem-toan-van-tren-5-trieu-bai-viet-dung-like-voi-ky-tu-dai-dien-hai-dau
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần tìm kiếm toàn văn trên 5 triệu bài viết. Dùng LIKE với ký tự đại diện hai đầu có vấn đề gì?

## Đáp án trắc nghiệm
- [x] Không dùng được index B-tree nên phải quét toàn bảng
- [ ] Kết quả không sắp xếp được theo thời gian tạo của bài viết
- [ ] Chỉ tìm được từ khoá đứng đầu chuỗi văn bản
- [ ] Có giới hạn độ dài chuỗi tìm kiếm nên hay bị lỗi

## Giải thích (VI)
Ký tự đại diện ở đầu chuỗi làm index B-tree vô dụng — DB phải quét toàn bảng mỗi lần tìm. Với Postgres thì dùng tsvector + index GIN; ngoài ra pg_trgm cho tìm gần đúng.

### Giải thích các phương án:
- **Không dùng được index B-tree nên phải quét toàn bảng** (Đúng): Cần full-text index (tsvector + GIN) hoặc một máy tìm kiếm riêng.
- **Kết quả không sắp xếp được theo thời gian tạo của bài viết** (Sai): Vẫn sắp xếp được bình thường bằng ORDER BY.
- **Chỉ tìm được từ khoá đứng đầu chuỗi văn bản** (Sai): Nó tìm được ở mọi vị trí, chính vì thế mới không dùng được index B-tree.
- **Có giới hạn độ dài chuỗi tìm kiếm nên hay bị lỗi** (Sai): Không có giới hạn gây ra vấn đề ở đây.
