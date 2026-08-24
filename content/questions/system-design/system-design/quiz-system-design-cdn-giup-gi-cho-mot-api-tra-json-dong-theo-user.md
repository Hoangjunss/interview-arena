---
id: quiz-system-design-cdn-giup-gi-cho-mot-api-tra-json-dong-theo-user
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CDN giúp gì cho một API trả JSON động theo user?

## Đáp án trắc nghiệm
- [x] Rất ít cho response riêng theo user, nhưng giảm độ trễ TLS
- [ ] Không giúp gì cả, CDN chỉ dành cho file tĩnh
- [ ] Tăng tốc truy vấn DB nhờ cache ở tầng gần người dùng
- [ ] Cache toàn bộ response nên giảm hẳn tải cho origin

## Giải thích (VI)
Với JSON riêng theo user thì không cache chung được , nhưng CDN vẫn hữu ích: kết thúc TLS ở điểm gần người dùng (giảm thời gian bắt tay), giữ kết nối sẵn tới origin, và chặn tấn công ở biên. Phần cache thật chỉ áp dụng cho dữ liệu dùng chung.

### Giải thích các phương án:
- **Rất ít cho response riêng theo user, nhưng giảm độ trễ TLS** (Đúng): Response phụ thuộc người dùng không cache chung được, nên lợi ích chính là kết nối gần.
- **Không giúp gì cả, CDN chỉ dành cho file tĩnh** (Sai): CDN vẫn giảm độ trễ bắt tay và chống tấn công cho API.
- **Tăng tốc truy vấn DB nhờ cache ở tầng gần người dùng** (Sai): CDN không biết gì về truy vấn DB.
- **Cache toàn bộ response nên giảm hẳn tải cho origin** (Sai): Response khác nhau theo user thì không thể dùng chung một bản cache.
