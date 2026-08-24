---
id: thiet-ke-he-rut-gon-url-url-shortener-o-muc-cao
position: system-design
technology: case-study
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế hệ rút gọn URL (URL shortener) ở mức cao?

## Question (EN)
How would you design a URL shortener at a high level?

## Đáp án chi tiết (VI)
Yêu cầu: từ URL dài tạo mã ngắn; truy cập mã ngắn → **redirect** tới URL gốc. Đặc thù: **đọc nhiều hơn ghi rất nhiều**, cần latency thấp, độ sẵn sàng cao.\
\
Hướng thiết kế:\
- **Sinh mã**: dùng **base62** (`[a-zA-Z0-9]`) — 7 ký tự ≈ 3.5 nghìn tỉ tổ hợp. Cách sinh: (a) mã hóa một **counter/ID tự tăng** (dùng ID generator phân tán để tránh trùng), hoặc (b) **hash + kiểm tra trùng**. Tránh đoán được thứ tự nếu cần.\
- **Lưu trữ**: bảng `short_code → long_url` — key-value/NoSQL hợp vì truy vấn đơn giản, ghi lớn; đánh index theo `short_code`.\
- **Đọc/redirect**: **cache nóng** (Redis) cho mã phổ biến; trả **301/302** (302 nếu cần đếm click). Phục vụ qua nhiều app server stateless sau load balancer.\
- **Mở rộng**: sharding theo `short_code`, thêm analytics (đếm click qua queue bất đồng bộ), custom alias, expiry.\
\
Điểm hay bị hỏi: chống trùng mã, đọc-nặng nên cache/CDN, và trade-off 301 vs 302.

## Detailed Answer (EN)
Requirements: turn a long URL into a short code; hitting the short code **redirects** to the original. Traits: **far more reads than writes**, needs low latency and high availability.\
\
Design direction:\
- **Code generation**: use **base62** (`[a-zA-Z0-9]`) — 7 chars ≈ 3.5 trillion combos. Options: (a) encode an **auto-increment counter/ID** (use a distributed ID generator to avoid collisions), or (b) **hash + collision check**. Avoid guessable ordering if needed.\
- **Storage**: a `short_code → long_url` table — key-value/NoSQL fits (simple lookups, heavy writes); index on `short_code`.\
- **Read/redirect**: **hot cache** (Redis) for popular codes; return **301/302** (302 if you must count clicks). Serve via many stateless app servers behind a load balancer.\
- **Scaling**: shard by `short_code`, add analytics (count clicks via an async queue), custom aliases, expiry.\
\
Common probes: collision avoidance, read-heavy → cache/CDN, and the 301 vs 302 trade-off.
