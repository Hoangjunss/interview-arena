---
id: quiz-postgresql-voi-composite-index-duoi-day-truy-van-nao-khong-tan-dung-duoc-index
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với composite index dưới đây, truy vấn nào KHÔNG tận dụng được index?

## Đáp án trắc nghiệm
- [x] WHERE created at > '2026-01-01'
- [ ] WHERE org id IN (3, 7) AND created at < '2026-06-01'
- [ ] WHERE org id = 7
- [ ] WHERE org id = 7 AND created at > '2026-01-01'

## Giải thích (VI)
Leftmost prefix rule : composite index (a, b) sắp xếp theo a trước, rồi mới tới b trong từng nhóm a. Truy vấn chỉ lọc b (created_at) không có điểm vào — giá trị created_at nằm rải rác khắp cây. Muốn lọc riêng created_at thì cần index riêng cho nó.

### Giải thích các phương án:
- **WHERE created at > '2026-01-01'** (Đúng): Thiếu cột dẫn đầu org id nên không thu hẹp được phạm vi tìm trong cây.
- **WHERE org id IN (3, 7) AND created at < '2026-06-01'** (Sai): IN trên cột dẫn đầu tách thành vài lần tra, mỗi lần vẫn đi theo cây bình thường.
- **WHERE org id = 7** (Sai): Cột đầu của index đứng một mình vẫn tra được, như dùng index đơn trên org id.
- **WHERE org id = 7 AND created at > '2026-01-01'** (Sai): Đây là trường hợp lý tưởng: khoá đẳng thức ở cột đầu, quét khoảng ở cột sau.
