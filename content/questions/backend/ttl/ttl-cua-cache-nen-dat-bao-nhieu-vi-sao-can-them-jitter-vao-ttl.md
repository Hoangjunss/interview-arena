---
id: ttl-cua-cache-nen-dat-bao-nhieu-vi-sao-can-them-jitter-vao-ttl
position: backend
technology: ttl
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TTL của cache nên đặt bao nhiêu? Vì sao cần thêm jitter vào TTL?

## Question (EN)
How long should a cache TTL be? Why add jitter to it?

## Đáp án chi tiết (VI)
TTL là **thời gian sống** của một entry trước khi bị xoá tự động. Không có con số đúng cho mọi trường hợp — chọn theo **mức cũ mà nghiệp vụ chịu được**:\
\
- Dữ liệu gần như tĩnh (danh mục, cấu hình): vài giờ tới 1 ngày.\
- Dữ liệu đọc nhiều, đổi vừa (danh sách bài viết, hồ sơ): 1-10 phút.\
- Dữ liệu nhạy cảm về độ chính xác (số dư, tồn kho): rất ngắn hoặc không cache.\
\
**Jitter** là cộng thêm một lượng ngẫu nhiên vào TTL. Nếu 10.000 key được ghi cùng lúc (sau một lần warm-up hoặc deploy) và cùng TTL 300s, chúng sẽ **hết hạn đồng loạt** ở giây thứ 300 và toàn bộ traffic dồn xuống DB trong một nhịp.\
\
```js\
const base = 300\
const ttl = base + Math.floor(Math.random() * 60) // spread expiry over a 60s window\
await redis.set(key, JSON.stringify(value), 'EX', ttl)\
```\
\
Jitter phân tán thời điểm hết hạn nên tải xuống DB trở nên phẳng thay vì dạng gai. Cùng nguyên tắc với backoff có jitter khi retry.

## Detailed Answer (EN)
TTL is how long an entry **lives** before being evicted automatically. There is no single right number — pick it from **how stale the business can tolerate**:\
\
- Near-static data (catalogs, config): hours to a day.\
- Read-heavy, moderately changing data (article lists, profiles): 1-10 minutes.\
- Accuracy-sensitive data (balances, inventory): very short, or not cached at all.\
\
**Jitter** means adding a random amount to the TTL. If 10,000 keys are written at the same moment (after a warm-up or a deploy) with the same 300s TTL, they all **expire together** at second 300 and the whole traffic wave lands on the DB at once.\
\
```js\
const base = 300\
const ttl = base + Math.floor(Math.random() * 60) // spread expiry over a 60s window\
await redis.set(key, JSON.stringify(value), 'EX', ttl)\
```\
\
Jitter spreads out expiry times so DB load is flat instead of spiky. Same principle as jittered retry backoff.
