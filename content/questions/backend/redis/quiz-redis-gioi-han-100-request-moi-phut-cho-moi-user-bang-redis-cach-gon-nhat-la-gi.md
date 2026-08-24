---
id: quiz-redis-gioi-han-100-request-moi-phut-cho-moi-user-bang-redis-cach-gon-nhat-la-gi
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giới hạn 100 request mỗi phút cho mỗi user bằng Redis, cách gọn nhất là gì?

## Đáp án trắc nghiệm
- [x] INCR key gắn mốc phút, lần đầu thì đặt TTL 60 giây
- [ ] Đếm trong bộ nhớ của từng instance ứng dụng rồi cộng lại
- [ ] Lưu danh sách toàn bộ timestamp rồi đếm mỗi lần gọi
- [ ] Ghi mỗi request vào DB rồi đếm bằng câu truy vấn

## Giải thích (VI)
Cửa sổ cố định: key kiểu rl:<user>:<phút>, INCR mỗi request, nếu trả về 1 thì EXPIRE 60. Key tự hết hạn nên không cần dọn. Gói hai lệnh vào Lua nếu muốn tuyệt đối chắc chắn TTL luôn được đặt.

### Giải thích các phương án:
- **INCR key gắn mốc phút, lần đầu thì đặt TTL 60 giây** (Đúng): Key tự biến mất khi hết phút nên không phải dọn, và INCR đã atomic.
- **Đếm trong bộ nhớ của từng instance ứng dụng rồi cộng lại** (Sai): Nhiều instance thì mỗi cái đếm riêng nên giới hạn thật cao gấp số instance.
- **Lưu danh sách toàn bộ timestamp rồi đếm mỗi lần gọi** (Sai): Chính xác hơn nhưng tốn bộ nhớ và phải tự dọn phần tử cũ.
- **Ghi mỗi request vào DB rồi đếm bằng câu truy vấn** (Sai): Chi phí quá lớn cho một việc phải chạy trên mọi request.
