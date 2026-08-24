---
id: quiz-postgresql-transaction-a-chay-nhu-duoi-gia-hai-lan-select-transaction-b-commit-mot-insert-v
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transaction A chạy như dưới. Giữa hai lần SELECT, transaction B commit một INSERT vào bảng orders. SELECT thứ hai của A trả về gì?

## Đáp án trắc nghiệm
- [ ] Không xác định — phụ thuộc B commit trước hay sau khi A chạy SELECT thứ hai
- [ ] Lỗi serialization vì dữ liệu đã thay đổi dưới chân transaction A
- [ ] 101 — dữ liệu đã commit thì mọi transaction đều thấy
- [x] 100 — cả transaction dùng chung một snapshot

## Giải thích (VI)
100. Ở REPEATABLE READ, snapshot được chụp tại câu lệnh đầu tiên của transaction và dùng cho toàn bộ transaction — commit của B xảy ra sau thời điểm đó nên A không nhìn thấy. Nếu chạy ở READ COMMITTED (mặc định), mỗi câu lệnh lấy snapshot mới và SELECT thứ hai trả về 101 .

### Giải thích các phương án:
- **Không xác định — phụ thuộc B commit trước hay sau khi A chạy SELECT thứ hai** (Sai): Đề đã nói B commit trước SELECT thứ hai; snapshot của A vẫn không đổi.
- **Lỗi serialization vì dữ liệu đã thay đổi dưới chân transaction A** (Sai): Chỉ đọc thì không xung đột; lỗi serialization cần có ghi đụng nhau.
- **101 — dữ liệu đã commit thì mọi transaction đều thấy** (Sai): Đó là hành vi của READ COMMITTED, không phải REPEATABLE READ.
- **100 — cả transaction dùng chung một snapshot** (Đúng): REPEATABLE READ chụp snapshot ở câu lệnh đầu và giữ nguyên tới khi commit.
