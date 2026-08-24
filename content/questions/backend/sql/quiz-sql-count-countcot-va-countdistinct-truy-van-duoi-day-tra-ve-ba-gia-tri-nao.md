---
id: quiz-sql-count-countcot-va-countdistinct-truy-van-duoi-day-tra-ve-ba-gia-tri-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
count(*), count(cột) và count(DISTINCT) — truy vấn dưới đây trả về ba giá trị nào?

## Đáp án trắc nghiệm
- [ ] 3, 2, 2 — DISTINCT giữ NULL như một giá trị khác biệt nên đếm được 2
- [ ] 2, 2, 1 — count( ) cũng bỏ qua dòng có bất kỳ cột nào NULL
- [ ] 3, 3, 2 — count(customer) đếm cả dòng NULL, và DISTINCT tính NULL là một giá trị riêng
- [x] 3, 2, 1 — mỗi biến thể count đếm một tập khác nhau

## Giải thích (VI)
Kết quả: 3, 2, 1. count( ) đếm số dòng, không quan tâm NULL — ra 3. count(customer) chỉ đếm giá trị khác NULL — ra 2. count(DISTINCT customer) đếm số giá trị khác nhau, cũng bỏ NULL — chỉ còn 'An', ra 1. Hiểu nhầm thường gặp là count(cột) đếm cả NULL; thực tế mọi hàm gộp (trừ count( )) đều bỏ qua NULL.

### Giải thích các phương án:
- **3, 2, 2 — DISTINCT giữ NULL như một giá trị khác biệt nên đếm được 2** (Sai): count(DISTINCT customer) chỉ đếm các giá trị khác NULL — còn lại duy nhất 'An', nên kết quả là 1 chứ không phải 2.
- **2, 2, 1 — count( ) cũng bỏ qua dòng có bất kỳ cột nào NULL** (Sai): count( ) đếm số dòng bất kể nội dung — kể cả dòng toàn NULL; chỉ count(cột) mới bỏ qua NULL của cột đó.
- **3, 3, 2 — count(customer) đếm cả dòng NULL, và DISTINCT tính NULL là một giá trị riêng** (Sai): Đây là hiểu nhầm phổ biến: count(cột) chỉ đếm giá trị khác NULL, và count(DISTINCT cột) cũng không tính NULL vào số giá trị.
- **3, 2, 1 — mỗi biến thể count đếm một tập khác nhau** (Đúng): Đúng: count( ) = 3 dòng; count(customer) = 2 vì hàm gộp bỏ qua NULL; DISTINCT còn lại đúng một giá trị 'An'. count( ) đếm mọi dòng; count(customer) bỏ dòng NULL; count(DISTINCT customer) đếm giá trị khác nhau và cũng bỏ NULL.
