---
id: quiz-system-design-cache-aside-lazy-loading-hoat-dong-the-nao
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache-aside (lazy loading) hoạt động thế nào?

## Đáp án trắc nghiệm
- [ ] Ứng dụng chỉ đọc cache, còn một job nền đồng bộ dữ liệu từ DB
- [x] Đọc cache trước, miss thì đọc DB rồi ghi lại cache
- [ ] Ghi vào cache và DB cùng lúc trong mọi lần ghi
- [ ] Nạp sẵn toàn bộ dữ liệu vào cache khi khởi động

## Giải thích (VI)
Đọc cache trước; miss thì đọc DB, ghi kết quả vào cache kèm TTL, rồi trả về. Chỉ dữ liệu được yêu cầu thật mới vào cache — đơn giản và tiết kiệm, nên là mẫu mặc định.

### Giải thích các phương án:
- **Ứng dụng chỉ đọc cache, còn một job nền đồng bộ dữ liệu từ DB** (Sai): Cách này làm cache thành nguồn duy nhất và dễ phục vụ dữ liệu cũ.
- **Đọc cache trước, miss thì đọc DB rồi ghi lại cache** (Đúng): Chỉ dữ liệu thực sự được yêu cầu mới nằm trong cache, nên không nạp thừa.
- **Ghi vào cache và DB cùng lúc trong mọi lần ghi** (Sai): Đó là write-through, một mẫu khác.
- **Nạp sẵn toàn bộ dữ liệu vào cache khi khởi động** (Sai): Đó là cache warming, tốn bộ nhớ cho dữ liệu có thể không ai dùng.
