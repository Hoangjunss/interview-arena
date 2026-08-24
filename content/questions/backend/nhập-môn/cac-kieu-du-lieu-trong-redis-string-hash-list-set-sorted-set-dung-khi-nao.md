---
id: cac-kieu-du-lieu-trong-redis-string-hash-list-set-sorted-set-dung-khi-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các kiểu dữ liệu trong Redis: String, Hash, List, Set, Sorted Set dùng khi nào?

## Question (EN)
Redis data types: when should you use String, Hash, List, Set, and Sorted Set?

## Đáp án chi tiết (VI)
Redis có 5 kiểu dữ liệu cơ bản (String, Hash, List, Set, Sorted Set), mỗi loại tối ưu cho một use case khác nhau.\
\
Các kiểu dữ liệu Redis và khi nào dùng:\
\
- String: kiểu cơ bản nhất, dùng cho cache HTML/JSON, counter (`INCR pageview`), session token. Lệnh: `SET key value EX 3600`, `GET key`, `INCR counter`.\
- Hash: lưu object có nhiều field (như row trong database), hiệu quả hơn lưu từng field dưới dạng String riêng. Dùng cho: user profile, product info. Lệnh: `HSET user:1 name 'Alice' age 30`, `HGETALL user:1`.\
- List: linked list có thể push/pop từ cả hai đầu — dùng cho message queue, activity feed, recent items. Lệnh: `LPUSH queue task1`, `RPOP queue`.\
- Set: tập hợp unique member — dùng cho tags, unique visitors, friend list. Lệnh: `SADD tags:post:1 redis database`, `SISMEMBER`, `SUNION`.\
- Sorted Set: như Set nhưng mỗi member có score — dùng cho leaderboard, rate limiting, priority queue. Lệnh: `ZADD leaderboard 1000 'Alice'`, `ZRANGE leaderboard 0 9 REV WITHSCORES`.

## Detailed Answer (EN)
$89
