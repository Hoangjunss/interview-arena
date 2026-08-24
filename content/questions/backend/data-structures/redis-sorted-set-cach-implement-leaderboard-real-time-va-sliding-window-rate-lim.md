---
id: redis-sorted-set-cach-implement-leaderboard-real-time-va-sliding-window-rate-lim
position: backend
technology: data-structures
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis Sorted Set: cách implement leaderboard real-time và sliding window rate limiter?

## Question (EN)
Redis Sorted Set: how do you implement a real-time leaderboard and a sliding window rate limiter?

## Đáp án chi tiết (VI)
**Leaderboard:**\
```bash\
ZADD leaderboard 9500 'alice'   # alice: 9500 điểm\
ZADD leaderboard 8200 'bob'\
ZRANGE leaderboard 0 9 REV WITHSCORES  # top 10 giảm dần\
ZRANK leaderboard 'alice'               # rank của alice\
ZINCRBY leaderboard 100 'alice'         # tăng 100 điểm\
```\
O(log N) cho mỗi update. **Sliding Window Rate Limiter** dùng Sorted Set:\
```python\
# Key: ratelimit:user123, score = timestamp, member = unique_id\
# (pseudocode - wrap in Lua script for atomicity in production)\
ZADD ratelimit:user123 now() uuid()\
ZREMRANGEBYSCORE ratelimit:user123 0 (now() - window)\
count = ZCARD ratelimit:user123\
if count \u003e limit: reject\
EXPIRE ratelimit:user123 window\
```\
Tất cả thao tác này cần wrap trong Lua script để atomic. So với Fixed Window: Sliding Window chính xác hơn, không có boundary spike. Nhược điểm: tốn memory hơn (lưu timestamp từng request) — dùng ZSET với member là timestamp+uuid.

## Detailed Answer (EN)
**Leaderboard:**\
```bash\
ZADD leaderboard 9500 'alice'   # alice: 9500 points\
ZADD leaderboard 8200 'bob'\
ZRANGE leaderboard 0 9 REV WITHSCORES  # top 10 descending\
ZRANK leaderboard 'alice'               # alice's rank\
ZINCRBY leaderboard 100 'alice'         # add 100 points\
```\
O(log N) per update. **Sliding Window Rate Limiter** using Sorted Set:\
```python\
# Key: ratelimit:user123, score = timestamp, member = unique_id\
# (pseudocode - wrap in Lua script for atomicity in production)\
ZADD ratelimit:user123 now() uuid()\
ZREMRANGEBYSCORE ratelimit:user123 0 (now() - window)\
count = ZCARD ratelimit:user123\
if count \u003e limit: reject\
EXPIRE ratelimit:user123 window\
```\
All these operations must be wrapped in a Lua script for atomicity. Compared to Fixed Window: Sliding Window is more accurate and has no boundary spike. Drawback: higher memory usage (stores a timestamp per request) — use a ZSET with member = timestamp+uuid.
