---
id: garbage-collection-hoat-dong-the-nao-so-sanh-gc-trong-jvm-go-va-v8
position: backend
technology: memory-\u0026-storage
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Garbage Collection hoạt động thế nào? So sánh GC trong JVM, Go và V8.

## Question (EN)
How does Garbage Collection work? Compare GC in JVM, Go, and V8.

## Đáp án chi tiết (VI)
GC tự động reclaim memory không còn được reference. Thuật toán cơ bản: Mark-and-Sweep (mark reachable objects từ roots, sweep unmarked); Reference Counting (Python: mỗi object đếm số references, về 0 thì free — không xử lý được circular references nên có cyclic GC bổ sung).\
\
JVM (G1GC/ZGC): generational GC (young gen/old gen/metaspace) vì hầu hết objects chết sớm; minor GC thường xuyên cho young gen; major/full GC cho old gen — là nguồn Stop-The-World pause. ZGC (experimental từ Java 11, production-ready từ Java 15) và Shenandoah: concurrent GC với pause \u003c 1ms dù heap hàng trăm GB.\
\
Go GC: non-generational, concurrent tri-color mark-and-sweep; GOGC=100 trigger GC khi heap tăng gấp đôi; target \u003c 1ms STW.\
\
V8 (Node.js): generational, Orinoco concurrent GC; young gen dùng Scavenge (semi-space copy); old gen dùng Mark-Compact.\
\
Thực tế: GC pressure là vấn đề performance — giảm bằng cách tái sử dụng objects (Go sync.Pool), giảm allocation trong hot path, tune heap size.

## Detailed Answer (EN)
$89
