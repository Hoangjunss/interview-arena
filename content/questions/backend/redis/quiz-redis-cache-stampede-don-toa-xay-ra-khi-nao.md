---
id: quiz-redis-cache-stampede-don-toa-xay-ra-khi-nao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache stampede (dồn toa) xảy ra khi nào?

## Đáp án trắc nghiệm
- [ ] Bản sao trễ nên client đọc được dữ liệu cũ
- [x] Một key nóng hết hạn và nhiều request cùng lúc đi xuống DB
- [ ] Redis hết bộ nhớ nên trả lỗi cho mọi lệnh ghi tiếp theo
- [ ] Nhiều client cùng ghi vào một key làm mất cập nhật

## Giải thích (VI)
Khi một key nóng hết hạn, hàng loạt request đồng thời đều miss và cùng đi xuống DB. Nặng hơn nữa là nhiều key hết hạn cùng thời điểm vì được nạp cùng lúc với TTL bằng nhau.

### Giải thích các phương án:
- **Bản sao trễ nên client đọc được dữ liệu cũ** (Sai): Đó là độ trễ replication.
- **Một key nóng hết hạn và nhiều request cùng lúc đi xuống DB** (Đúng): Tải dồn vào DB đúng lúc cache không đỡ được, dễ làm DB quá tải.
- **Redis hết bộ nhớ nên trả lỗi cho mọi lệnh ghi tiếp theo** (Sai): Đó là tình huống OOM, một vấn đề khác.
- **Nhiều client cùng ghi vào một key làm mất cập nhật** (Sai): Đó là tranh chấp ghi, giải bằng lệnh atomic.
