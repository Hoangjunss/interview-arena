---
id: quiz-redis-dat-ttl-cho-mot-key-roi-ghi-lai-gia-tri-moi-bang-set-thi-ttl-con-khong
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt TTL cho một key rồi ghi lại giá trị mới bằng SET thì TTL còn không?

## Đáp án trắc nghiệm
- [x] Mất TTL — key trở thành không hết hạn
- [ ] Redis báo lỗi vì key đang có TTL
- [ ] TTL được reset về giá trị ban đầu đã đặt
- [ ] TTL được giữ nguyên đúng như trước khi ghi giá trị mới

## Giải thích (VI)
Mất TTL. SET ghi đè cả giá trị lẫn metadata thời gian sống, nên key thành vĩnh viễn. Đây là nguyên nhân rất hay gặp của việc cache phình ra mãi không co lại: code refresh cache bằng SET thuần và vô tình bỏ hạn.

### Giải thích các phương án:
- **Mất TTL — key trở thành không hết hạn** (Đúng): Muốn giữ thì dùng SET ... KEEPTTL, hoặc đặt lại TTL ngay trong lệnh SET ... EX.
- **Redis báo lỗi vì key đang có TTL** (Sai): Ghi lên key đang có TTL là hợp lệ và không báo gì.
- **TTL được reset về giá trị ban đầu đã đặt** (Sai): Redis không ghi nhớ TTL từng đặt để phục hồi lại.
- **TTL được giữ nguyên đúng như trước khi ghi giá trị mới** (Sai): SET mặc định xoá thời gian sống cũ của key.
