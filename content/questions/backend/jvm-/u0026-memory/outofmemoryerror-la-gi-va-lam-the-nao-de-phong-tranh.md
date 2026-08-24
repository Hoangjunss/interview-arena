---
id: outofmemoryerror-la-gi-va-lam-the-nao-de-phong-tranh
position: backend
technology: jvm-\u0026-memory
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OutOfMemoryError là gì và làm thế nào để phòng tránh?

## Question (EN)
What is OutOfMemoryError and how do you prevent it?

## Đáp án chi tiết (VI)
**OutOfMemoryError (OOM)** xảy ra khi JVM không cấp phát được bộ nhớ — heap đầy, GC không giải phóng đủ.\
\
**Các loại OOM thường gặp:**\
- `Java heap space` — heap đầy. Phổ biến nhất.\
- `GC overhead limit exceeded` — GC chạy \u003e98% thời gian mà chỉ giải phóng được \u003c2%.\
- `Metaspace` — class metadata đầy (Java 8+, thay PermGen).\
- `Direct buffer memory` — direct ByteBuffer (NIO) tràn.\
- `unable to create new native thread` — quá nhiều thread, hết stack.\
\
**Nguyên nhân:**\
- Memory leak (reference giữ object không dùng).\
- Data structure phình mãi (cache không evict).\
- Heap size không đủ cho workload.\
\
**Phòng t"])</script><script>self.__next_f.push([1,"ránh:**\
1. Tăng heap nếu workload thật sự lớn: `-Xmx2048m`.\
2. Fix leak: tìm reference thừa (static collection, listener không unregister, ThreadLocal).\
3. Cache có **eviction policy** (`Caffeine`, `LinkedHashMap.removeEldestEntry`).\
4. Bật heap dump khi OOM để debug: `-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/dump`.\
5. Profile với **Eclipse MAT**, JFR, VisualVM.

## Detailed Answer (EN)
$85
