---
id: quiz-elasticsearch-khai-bao-mot-truong-vua-co-dang-text-vua-co-dang-keyword-de-lam-gi
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khai báo một trường vừa có dạng text vừa có dạng keyword để làm gì?

## Đáp án trắc nghiệm
- [ ] Tăng tốc độ ghi tài liệu vào chỉ mục
- [ ] Cho phép đổi kiểu trường mà không cần nạp lại
- [ ] Tiết kiệm dung lượng vì dữ liệu chỉ lưu một lần
- [x] Vừa tìm toàn văn vừa lọc và gộp nhóm chính xác

## Giải thích (VI)
Cùng một dữ liệu được đánh chỉ mục theo hai cách: dạng text cho tìm toàn văn , dạng con keyword cho lọc chính xác, sắp xếp và gộp nhóm . Đổi lại chỉ mục lớn hơn vì lưu trùng nội dung.

### Giải thích các phương án:
- **Tăng tốc độ ghi tài liệu vào chỉ mục** (Sai): Ghi chậm hơn một chút vì phải phân tích hai lần.
- **Cho phép đổi kiểu trường mà không cần nạp lại** (Sai): Đổi kiểu vẫn cần chỉ mục mới.
- **Tiết kiệm dung lượng vì dữ liệu chỉ lưu một lần** (Sai): Ngược lại, chỉ mục lớn hơn vì lưu theo hai cách.
- **Vừa tìm toàn văn vừa lọc và gộp nhóm chính xác** (Đúng): Cùng một dữ liệu được đánh chỉ mục theo hai cách nên phục vụ được cả hai nhu cầu.
