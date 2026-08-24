---
id: qua-trinh-garbage-collection-hoat-dong-the-nao
position: backend
technology: jvm-\u0026-memory
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quá trình Garbage Collection hoạt động thế nào?

## Question (EN)
Explain the Garbage Collection process in Java.

## Đáp án chi tiết (VI)
GC tự động thu hồi bộ nhớ từ object không còn được tham chiếu — Java dev không cần `free()` thủ công.\
\
**3 bước cốt lõi:**\
1. **Marking** — duyệt object graph từ **GC roots** (stack frame, static field, JNI ref), đánh dấu object reachable.\
2. **Sweeping** — xóa object không được đánh dấu, giải phóng bộ nhớ.\
3. **Compacting** — di chuyển surviving object lại gần nhau, giảm fragmentation.\
\
**Loại GC:**\
- **Minor GC:** dọn Young Generation (object mới), nhanh, tần suất cao.\
- **Major/Full GC:** dọn Old Generation (object sống lâu), chậm, ảnh hưởng latency.\
\
**Pause time** quan trọng với latency-sensitive app:\
- G1GC (default Java 9+): pause ~100-200ms.\
- ZGC (Java 15+): pause \u003c10ms ngay cả heap 100GB+.\
- Shenandoah: tương tự ZGC.\
\
Tuning GC bằng JVM flag (`-Xmx`, `-XX:+UseZGC`) + monitoring (JFR, GC log) khi performance bị ảnh hưởng.

## Detailed Answer (EN)
GC automatically reclaims memory from unreferenced objects — no manual `free()` in Java.\
\
**Three core steps:**\
1. **Marking** — traverse the object graph from **GC roots** (stack frames, static fields, JNI refs), mark reachable objects.\
2. **Sweeping** — delete unmarked objects, free their memory.\
3. **Compacting** — move surviving objects together to reduce fragmentation.\
\
**GC types:**\
- **Minor GC:** cleans Young Generation (new objects) — fast, frequent.\
- **Major/Full GC:** cleans Old Generation (long-lived objects) — slower, hurts latency.\
\
**Pause time** matters for latency-sensitive apps:\
- G1GC (Java 9+ default): pauses ~100-200ms.\
- ZGC (Java 15+): pauses \u003c10ms even on 100GB+ heaps.\
- Shenandoah: similar to ZGC.\
\
Tune GC via JVM flags (`-Xmx`, `-XX:+UseZGC`) + monitoring (JFR, GC logs) when performance matters.
