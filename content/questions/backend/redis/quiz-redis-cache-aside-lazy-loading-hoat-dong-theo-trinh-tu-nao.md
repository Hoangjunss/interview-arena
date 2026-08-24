---
id: quiz-redis-cache-aside-lazy-loading-hoat-dong-theo-trinh-tu-nao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache-aside (lazy loading) hoạt động theo trình tự nào?

## Đáp án trắc nghiệm
- [x] Đọc cache; miss thì đọc DB, ghi vào cache rồi trả kết quả
- [ ] Nạp sẵn toàn bộ dữ liệu vào cache khi ứng dụng khởi động
- [ ] Ghi vào cache trước rồi cache tự đồng bộ xuống DB sau đó
- [ ] Ghi đồng thời vào cache và DB trong mỗi lần ghi

## Giải thích (VI)
Đọc cache → miss thì đọc DB → ghi vào cache (kèm TTL) → trả kết quả. Ứng dụng chủ động quản lý cache, nên khi cache chết hệ thống vẫn chạy được, chỉ chậm hơn.

### Giải thích các phương án:
- **Đọc cache; miss thì đọc DB, ghi vào cache rồi trả kết quả** (Đúng): Chỉ dữ liệu thật sự được yêu cầu mới nằm trong cache, nên bộ nhớ dùng hiệu quả.
- **Nạp sẵn toàn bộ dữ liệu vào cache khi ứng dụng khởi động** (Sai): Đó là cache warming, không phải cache-aside.
- **Ghi vào cache trước rồi cache tự đồng bộ xuống DB sau đó** (Sai): Đó là write-behind, và nó có rủi ro mất dữ liệu khi cache chết.
- **Ghi đồng thời vào cache và DB trong mỗi lần ghi** (Sai): Đó là write-through, một mẫu khác và giải quyết vấn đề khác.
