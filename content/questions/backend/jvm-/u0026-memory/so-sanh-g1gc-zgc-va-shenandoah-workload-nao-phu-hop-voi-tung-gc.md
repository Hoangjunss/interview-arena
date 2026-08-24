---
id: so-sanh-g1gc-zgc-va-shenandoah-workload-nao-phu-hop-voi-tung-gc
position: backend
technology: jvm-\u0026-memory
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh G1GC, ZGC và Shenandoah: workload nào phù hợp với từng GC?

## Question (EN)
Compare G1GC, ZGC, and Shenandoah: which workloads suit each garbage collector?

## Đáp án chi tiết (VI)
| GC | Pause | Heap size | CPU overhead | Phù hợp |\
|---|---|---|---|---|\
| **G1GC** (Java 9+ default) | ~100-200ms | đến ~20GB | Thấp | General-purpose web service, batch |\
| **ZGC** (Java 15+) | \u003c10ms | 100GB+ | Cao hơn | Real-time, trading, gaming — latency-critical |\
| **Shenandoah** (RedHat, OpenJDK 12+) | \u003c10ms | Lớn | Nhỏ hơn ZGC | Tương tự ZGC, footprint nhỏ hơn |\
\
**Cách chọn:**\
1. Latency \u003c10ms → **ZGC** (hoặc Shenandoah).\
2. Heap lớn (\u003e20GB) → **ZGC** hoặc **Shenandoah**.\
3. General-purpose → **G1GC** (default, không cần config).\
\
**Cấu hình:**\
```\
-XX:+UseG1GC          # default Java 9+\
-XX:+UseZGC -XX:+ZGenerational   # Java 21 generational ZGC\
-XX:+UseShenandoahGC\
```\
\
**Monitor:** `-Xlog:gc*` để in GC log; JFR (Java Flight Recorder) phân tích pause time. Validate bằng metric thực tế trước khi đổi GC.\
\
**Lưu ý:** đổi GC không phải lúc nào cũng cải thiện — JIT/heap sizing thường là nguyên nhân thật. Profile trước rồi mới tune.

## Detailed Answer (EN)
| GC | Pause | Heap size | CPU overhead | Best for |\
|---|---|---|---|---|\
| **G1GC** (Java 9+ default) | ~100-200ms | up to ~20GB | Low | General-purpose web services, batch jobs |\
| **ZGC** (Java 15+) | \u003c10ms | 100GB+ | Higher | Real-time, trading, gaming — latency-critical |\
| **Shenandoah** (RedHat, OpenJDK 12+) | \u003c10ms | Large | Smaller than ZGC | Similar to ZGC, lower CPU footprint |\
\
**How to choose:**\
1. Latency \u003c10ms → **ZGC** (or Shenandoah).\
2. Large heap (\u003e20GB) → **ZGC** or **Shenandoah**.\
3. General-purpose → **G1GC** (default, no config needed).\
\
**Configuration:**\
```\
-XX:+UseG1GC          # default in Java 9+\
-XX:+UseZGC -XX:+ZGenerational   # Java 21 generational ZGC\
-XX:+UseShenandoahGC\
```\
\
**Monitor:** `-Xlog:gc*` for GC logs; JFR (Java Flight Recorder) for pause analysis. Validate with real metrics before switching GC.\
\
**Note:** changing GC is not always a fix — JIT or heap sizing is often the real issue. Profile first, then tune.
