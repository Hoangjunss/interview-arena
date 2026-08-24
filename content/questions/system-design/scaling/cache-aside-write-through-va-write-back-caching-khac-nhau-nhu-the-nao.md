---
id: cache-aside-write-through-va-write-back-caching-khac-nhau-nhu-the-nao
position: system-design
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache-aside, Write-through, và Write-back caching khác nhau như thế nào?

## Question (EN)
How do Cache-aside, Write-through, and Write-back caching strategies differ?

## Đáp án chi tiết (VI)
Cache-aside (Lazy Loading): application tự quản lý cache – trước tiên check cache, nếu miss thì đọc từ DB và populate cache (cache-aside pattern). Ưu: chỉ cache dữ liệu thực sự được đọc, cache failure không block read; Nhược: cache miss đầu tiên luôn có extra latency, dữ liệu cache có thể stale nếu DB được update trực tiếp. Write-through: mỗi write đồng thời cập nhật cả cache và DB trước khi trả response. Ưu: cache luôn fresh, không bao giờ stale; Nhược: write latency cao hơn, cache dữ liệu ít được đọc lãng phí memory. Write-back (Write-behind): write chỉ vào cache trước, trả response ngay, sau đó async flush xuống DB. Ưu: write latency rất thấp, tốt cho write-heavy workloads; Nhược: data loss risk nếu cache crash trước khi flush, phức tạp hơn. Redis thường dùng cho cả 3 pattern; cache-aside là phổ biến nhất trong thực tế vì đơn giản và phù hợp hầu hết use case.

## Detailed Answer (EN)
$87
