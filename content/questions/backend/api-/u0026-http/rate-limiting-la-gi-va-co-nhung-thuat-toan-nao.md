---
id: rate-limiting-la-gi-va-co-nhung-thuat-toan-nao
position: backend
technology: api-\u0026-http
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rate limiting là gì và có những thuật toán nào?

## Question (EN)
What is rate limiting and what algorithms are used?

## Đáp án chi tiết (VI)
Rate limiting giới hạn số request một client được gửi trong khoảng thời gian → **chống lạm dụng/DoS**, đảm bảo công bằng, kiểm soát chi phí. Vượt hạn trả **`429 Too Many Requests`** (thường kèm header `Retry-After`).\
\
Thuật toán phổ biến:\
- **Fixed window**: đếm request theo cửa sổ cố định (đơn giản nhưng có burst ở ranh giới).\
- **Sliding window**: cửa sổ trượt, mượt hơn.\
- **Token bucket**: bù token đều đặn, cho phép burst có kiểm soát.\
- **Leaky bucket**: xử lý theo tốc độ cố định, làm phẳng traffic.\
\
Thường đặt ở API gateway/reverse proxy, key theo user/IP/API key.

## Detailed Answer (EN)
Rate limiting caps how many requests a client may send in a time window → **prevents abuse/DoS**, ensures fairness, controls cost. Exceeding the limit returns **`429 Too Many Requests`** (often with a `Retry-After` header).\
\
Common algorithms:\
- **Fixed window**: count per fixed window (simple but allows bursts at boundaries).\
- **Sliding window**: a rolling window, smoother.\
- **Token bucket**: refill tokens steadily, allowing controlled bursts.\
- **Leaky bucket**: process at a fixed rate, smoothing traffic.\
\
Usually enforced at an API gateway/reverse proxy, keyed by user/IP/API key.
