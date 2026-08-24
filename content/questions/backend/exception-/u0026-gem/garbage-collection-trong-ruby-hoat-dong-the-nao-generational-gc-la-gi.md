---
id: garbage-collection-trong-ruby-hoat-dong-the-nao-generational-gc-la-gi
position: backend
technology: exception-\u0026-gem
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Garbage Collection trong Ruby hoạt động thế nào? Generational GC là gì?

## Question (EN)
How does garbage collection work in Ruby? What is generational GC?

## Đáp án chi tiết (VI)
Ruby dùng thuật toán **mark-and-sweep**: GC đánh dấu mọi object còn reachable từ root (stack, globals), sau đó sweep dọn object không được đánh dấu.\
\
Ruby 2.1+ — **Generational GC (RGenGC):** object chia 2 thế hệ: young (mới tạo) và old (sống qua ≥1 GC cycle). Minor GC chỉ quét young — nhanh, thường xuyên. Major GC quét toàn bộ — chậm, ít hơn. Dựa trên giả thuyết \\"most objects die young\\" — đúng với phần lớn workload web.\
\
Ruby 2.2+ — **Incremental GC:** chia Major GC thành nhiều bước nhỏ, giảm pause time. Tuning qua env var (`RUBY_GC_HEAP_GROWTH_FACTOR`, `RUBY_GC_MALLOC_LIMIT`) — hiếm dùng, chỉ khi có benchmark evidence.

## Detailed Answer (EN)
Ruby uses a **mark-and-sweep** algorithm: the GC marks all objects still reachable from roots (stack, globals), then sweeps and frees everything unmarked.\
\
Ruby 2.1+ — **Generational GC (RGenGC):** objects split into young (newly created) and old (survived ≥1 GC cycle). Minor GC scans only the young generation — fast, frequent. Major GC is a full sweep — slow, infrequent. Based on the \\"most objects die young\\" hypothesis — true for most web workloads.\
\
Ruby 2.2+ — **Incremental GC:** splits Major GC into smaller steps, reducing pause time. Tunable via env vars (`RUBY_GC_HEAP_GROWTH_FACTOR`, `RUBY_GC_MALLOC_LIMIT`) — rarely needed, only with benchmark evidence.
