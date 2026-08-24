---
id: quiz-ai-engineering-du-an-da-dung-postgresql-co-nhat-thiet-phai-them-mot-vector-database-rieng-cho-r
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dự án đã dùng PostgreSQL. Có nhất thiết phải thêm một vector database riêng cho RAG không?

## Đáp án trắc nghiệm
- [ ] Không cần lưu vector — chỉ cần lưu văn bản rồi tính embedding mỗi lần truy vấn
- [x] Không — extension vector của PostgreSQL đủ cho phần lớn quy mô
- [ ] Bắt buộc phải có vector database chuyên dụng, database quan hệ không lưu vector được
- [ ] Bắt buộc, vì tìm kiếm ngữ nghĩa không thể thực hiện bằng SQL

## Giải thích (VI)
Không bắt buộc. pgvector cho PostgreSQL lưu và đánh index vector, đủ cho hàng trăm nghìn tới vài triệu đoạn. Lợi thế lớn nhất là lọc theo quyền và join với dữ liệu nghiệp vụ trong cùng một truy vấn — điều mà tách hai hệ thống làm phức tạp hơn nhiều.

### Giải thích các phương án:
- **Không cần lưu vector — chỉ cần lưu văn bản rồi tính embedding mỗi lần truy vấn** (Sai): Tính lại embedding cho toàn bộ kho ở mỗi truy vấn là bất khả thi về chi phí và tốc độ.
- **Không — extension vector của PostgreSQL đủ cho phần lớn quy mô** (Đúng): Thêm một hệ thống lưu trữ mới là chi phí vận hành thật, cần lý do rõ ràng. Giữ mọi thứ trong một database còn giúp lọc theo quyền và join với dữ liệu nghiệp vụ.
- **Bắt buộc phải có vector database chuyên dụng, database quan hệ không lưu vector được** (Sai): PostgreSQL có extension lưu và đánh index vector.
- **Bắt buộc, vì tìm kiếm ngữ nghĩa không thể thực hiện bằng SQL** (Sai): Truy vấn theo khoảng cách vector viết được bằng SQL bình thường.
