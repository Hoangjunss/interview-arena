---
id: lam-the-nao-de-toi-uu-app-performance-va-cac-metric-quan-trong-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để tối ưu app performance và các metric quan trọng là gì?

## Question (EN)
How do you optimize app performance and what are the key metrics?

## Đáp án chi tiết (VI)
Đo lường bằng Android Profiler (CPU, memory, network). Các metric quan trọng: thời gian khởi động app (cold/warm/hot), frame rate (60fps, hoặc 90/120fps trên thiết bị high-refresh), memory footprint, và battery drain. Tối ưu bằng: giảm tác vụ trên main thread, lazy-loading, caching, layout hiệu quả (Compose loại bỏ bottleneck do nested XML nhưng không phải lúc nào cũng nhanh hơn hoàn toàn — dùng Baseline Profile để giảm startup overhead), load ảnh đúng cách, và xử lý tác vụ nền đúng chỗ. Profile trước để tìm bottleneck — tối ưu sớm là lãng phí.

## Detailed Answer (EN)
Measure with Android Profiler (CPU, memory, network). Key metrics: app startup time (cold/warm/hot), frame rate (60fps target, 90/120fps on high-refresh devices), memory footprint, battery drain. Optimize by: reducing main thread work, lazy-loading, caching, efficient layouts (Compose removes measure-pass bottlenecks from deeply nested XML but is not universally faster — use Baseline Profiles to reduce startup overhead), proper image loading, and background work. Profile first to find bottlenecks — premature optimization is wasteful.
