---
id: quiz-elasticsearch-truy-van-match-va-truy-van-term-khac-nhau-the-nao
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn match và truy vấn term khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] term nhanh hơn vì bỏ qua bước tính điểm liên quan
- [ ] match chỉ dùng cho số, term chỉ dùng cho chuỗi
- [x] match phân tích chuỗi tìm kiếm, term thì không
- [ ] match chỉ tìm được một từ, term tìm được nhiều từ

## Giải thích (VI)
match phân tích chuỗi tìm kiếm bằng cùng bộ phân tích của trường rồi mới khớp, còn term khớp nguyên văn với thứ nằm trong chỉ mục. Dùng term trên trường text thường không ra kết quả.

### Giải thích các phương án:
- **term nhanh hơn vì bỏ qua bước tính điểm liên quan** (Sai): Tốc độ không phải điểm khác biệt cốt lõi giữa hai loại.
- **match chỉ dùng cho số, term chỉ dùng cho chuỗi** (Sai): Cả hai đều áp cho nhiều kiểu dữ liệu.
- **match phân tích chuỗi tìm kiếm, term thì không** (Đúng): Vì thế dùng term trên trường text thường không ra kết quả do chuỗi gốc không nằm trong chỉ mục.
- **match chỉ tìm được một từ, term tìm được nhiều từ** (Sai): Ngược lại, match xử lý được cả câu nhiều từ.
