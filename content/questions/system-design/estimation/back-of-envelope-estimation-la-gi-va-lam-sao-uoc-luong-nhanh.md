---
id: back-of-envelope-estimation-la-gi-va-lam-sao-uoc-luong-nhanh
position: system-design
technology: estimation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Back-of-envelope estimation là gì và làm sao ước lượng nhanh?

## Question (EN)
What is back-of-envelope estimation and how do you do it quickly?

## Đáp án chi tiết (VI)
Là **ước lượng thô** quy mô hệ thống (QPS, storage, băng thông) bằng phép tính đơn giản, để chọn kiến trúc hợp lý thay vì đoán mò. Các bước:\
\
- **Từ người dùng → QPS**: ví dụ 100M DAU, mỗi user 10 request/ngày → ~1B req/ngày ÷ 86.400s ≈ **~11.6K req/s trung bình**, đỉnh nhân 2–3.\
- **Storage**: số bản ghi × kích thước × thời gian lưu (nhớ nhân hệ số replication).\
- **Bandwidth**: QPS × payload size.\
- Thuộc lòng vài mốc: 1 ngày ≈ 86.400s, đọc RAM ~100ns, round-trip trong datacenter ~0.5ms, đọc disk/SSD chậm hơn RAM nhiều bậc.\
\
Mục tiêu là **đúng bậc độ lớn (order of magnitude)**, không cần chính xác từng số.

## Detailed Answer (EN)
A **rough estimate** of system scale (QPS, storage, bandwidth) using simple arithmetic, so you pick a sensible architecture instead of guessing. Steps:\
\
- **Users → QPS**: e.g. 100M DAU × 10 requests/day → ~1B req/day ÷ 86,400s ≈ **~11.6K req/s average**, multiply 2–3× for peak.\
- **Storage**: records × size × retention (remember the replication factor).\
- **Bandwidth**: QPS × payload size.\
- Memorize a few anchors: 1 day ≈ 86,400s, RAM read ~100ns, intra-datacenter round-trip ~0.5ms, disk/SSD reads are orders of magnitude slower than RAM.\
\
The goal is the right **order of magnitude**, not exact numbers.
