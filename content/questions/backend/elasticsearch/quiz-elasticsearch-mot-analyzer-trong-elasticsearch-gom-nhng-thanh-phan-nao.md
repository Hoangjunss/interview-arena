---
id: quiz-elasticsearch-mot-analyzer-trong-elasticsearch-gom-nhng-thanh-phan-nao
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một analyzer trong Elasticsearch gồm những thành phần nào?

## Đáp án trắc nghiệm
- [ ] Bộ kiểm tra chính tả và bộ dịch ngôn ngữ
- [ ] Bộ nén dữ liệu và bộ mã hoá ký tự
- [ ] Bộ sắp xếp và bộ tính điểm liên quan
- [x] Bộ lọc ký tự, bộ tách từ và các bộ lọc từ

## Giải thích (VI)
Ba tầng chạy tuần tự: bộ lọc ký tự xử lý chuỗi thô, bộ tách từ cắt thành các từ, rồi các bộ lọc từ chuẩn hoá như hạ chữ thường, bỏ dấu, loại từ dừng. Kết quả mới là thứ được lưu vào chỉ mục.

### Giải thích các phương án:
- **Bộ kiểm tra chính tả và bộ dịch ngôn ngữ** (Sai): Hai thứ này không có trong analyzer tiêu chuẩn.
- **Bộ nén dữ liệu và bộ mã hoá ký tự** (Sai): Nén và mã hoá không thuộc quy trình phân tích văn bản.
- **Bộ sắp xếp và bộ tính điểm liên quan** (Sai): Tính điểm diễn ra lúc truy vấn, không nằm trong analyzer.
- **Bộ lọc ký tự, bộ tách từ và các bộ lọc từ** (Đúng): Ba tầng này chạy tuần tự để biến chuỗi gốc thành các từ khoá đưa vào chỉ mục.
