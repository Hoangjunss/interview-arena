---
id: bcrypt-la-gi-cach-dung-de-hash-password
position: backend
technology: security-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
bcrypt là gì? Cách dùng để hash password?

## Question (EN)
What is bcrypt? How do you use it to hash passwords?

## Đáp án chi tiết (VI)
bcrypt được thiết kế đặc biệt cho password hashing — khác hoàn toàn SHA-256/MD5 vốn được tối ưu để NHANH (SHA-256 hash 10 tỷ lần/giây trên GPU, bcrypt cost=12 chỉ ~250 lần/giây). Adaptive cost factor: `saltRounds` (cost) tăng thì thời gian tăng gấp đôi — cost=10 ~100ms, cost=12 ~400ms, cost=14 ~1.6s. Chọn cost sao cho ~250ms trên server của bạn và tăng dần theo năm khi phần cứng mạnh lên. Built-in salt: bcrypt tự tạo random salt unique per password và nhúng vào hash output — tránh rainbow table attacks và đảm bảo cùng password tạo hash khác nhau mỗi lần. Timing attacks: `bcrypt.compare()` là constant-time comparison, không dùng `===` để so sánh hash. Argon2 là alternative hiện đại hơn (winner PHC 2015): argon2id kháng GPU và side-channel attacks tốt hơn, được OWASP khuyến nghị năm 2023+; dùng `argon2` package trong Node.js. Lưu ý: hash password trong service layer, không trong model hook — dễ bị double-hash nếu hook chạy lại khi update field khác.

## Detailed Answer (EN)
"])</script><script>self.__next_f.push([1
