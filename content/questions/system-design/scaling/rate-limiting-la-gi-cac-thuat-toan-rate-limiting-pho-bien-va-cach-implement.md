---
id: rate-limiting-la-gi-cac-thuat-toan-rate-limiting-pho-bien-va-cach-implement
position: system-design
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rate Limiting là gì? Các thuật toán rate limiting phổ biến và cách implement?

## Question (EN)
What is Rate Limiting? What are common algorithms and how to implement it?

## Đáp án chi tiết (VI)
Rate Limiting là kỹ thuật kiểm soát tần suất request từ một client/IP/user để bảo vệ hệ thống khỏi abuse, DDoS, và đảm bảo fair usage.\
\
Các thuật toán:\
- Token Bucket – bucket chứa tokens, mỗi request tiêu 1 token, tokens được refill theo rate cố định; cho phép burst ngắn.\
- Leaky Bucket – requests được xử lý ở rate cố định; smooths out bursts nhưng không cho phép burst.\
- Fixed Window Counter – đếm request trong window cố định (mỗi phút); đơn giản nhưng có boundary problem.\
- Sliding Window Log – lưu timestamp của mỗi request, chính xác nhất nhưng tốn memory.\
- Sliding Window Counter – kết hợp Fixed Window + sliding, cân bằng tốt.\
\
Implementation: Redis với INCR + EXPIRE cho distributed rate limiting; Nginx module; API Gateway built-in (AWS API GW, Kong). Trả về 429 Too Many Requests với Retry-After header khi vượt limit.

## Detailed Answer (EN)
$87
