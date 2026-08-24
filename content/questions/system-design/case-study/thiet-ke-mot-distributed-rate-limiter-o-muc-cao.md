---
id: thiet-ke-mot-distributed-rate-limiter-o-muc-cao
position: system-design
technology: case-study
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế một distributed rate limiter ở mức cao?

## Question (EN)
How would you design a distributed rate limiter at a high level?

## Đáp án chi tiết (VI)
Yêu cầu: giới hạn số request theo client (user/IP/API key) trong một cửa sổ, chính xác **trên toàn cụm nhiều node**, thêm độ trễ tối thiểu.\
\
Hướng thiết kế:\
- **Thuật toán**: **token bucket** (cho burst có kiểm soát, phổ biến) hoặc **sliding window log/counter** (chính xác hơn ở ranh giới). Fixed window đơn giản nhưng có burst ở mép cửa sổ.\
- **State tập trung**: đếm cục bộ từng node sẽ sai tổng → lưu counter ở **store chia sẻ, nhanh (Redis)**, key theo client + cửa sổ. Dùng thao tác **atomic** (INCR + EXPIRE, hoặc Lua script) để tránh race.\
- **Vị trí**: đặt ở **API gateway/edge** để chặn sớm; per-service cho giới hạn riêng.\
- **Phản hồi**: vượt hạn trả **`429`** kèm `Retry-After` và header `X-RateLimit-*`.\
- **Đánh đổi độ chính xác/độ trễ**: gọi Redis mỗi request là chính xác nhưng thêm hop → có thể dùng **token cục bộ + đồng bộ định kỳ** để giảm latency, chấp nhận sai số nhỏ.\
\
Lưu ý: xử lý Redis chết (fail-open hay fail-closed?), và đồng hồ lệch giữa các node.

## Detailed Answer (EN)
Requirements: limit requests per client (user/IP/API key) in a window, accurate **across a multi-node cluster**, with minimal added latency.\
\
Design direction:\
- **Algorithm**: **token bucket** (controlled bursts, popular) or **sliding window log/counter** (more accurate at boundaries). Fixed window is simple but bursts at window edges.\
- **Centralized state**: per-node counting is globally wrong → keep counters in a **shared, fast store (Redis)**, keyed by client + window. Use **atomic** ops (INCR + EXPIRE, or a Lua script) to avoid races.\
- **Placement**: at the **API gateway/edge** to block early; per-service for local limits.\
- **Response**: on exceed return **`429`** with `Retry-After` and `X-RateLimit-*` headers.\
- **Accuracy/latency trade-off**: calling Redis per request is accurate but adds a hop → you can use **local tokens + periodic sync** to cut latency, accepting small inaccuracy.\
\
Note: handle Redis failure (fail-open vs fail-closed?) and clock skew across nodes.
