---
id: daemon-thread-khac-user-thread-the-nao
position: backend
technology: thread
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Daemon thread khác user thread thế nào?

## Question (EN)
How does a daemon thread differ from a user thread?

## Đáp án chi tiết (VI)
JVM chỉ **chờ user thread**. Khi user thread cuối cùng kết thúc, JVM thoát và **giết ngay mọi daemon thread đang chạy dở**.\
\
```java\
Thread cleaner = new Thread(this::sweepCache);\
cleaner.setDaemon(true);   // phải gọi TRƯỚC start()\
cleaner.start();           // sau start() -\u003e IllegalThreadStateException\
```\
\
Hệ quả quan trọng: daemon bị dừng đột ngột, **`finally` và shutdown logic có thể không chạy**. Vì vậy không dùng daemon cho việc phải hoàn tất trọn vẹn — ghi file, flush buffer, commit transaction. Chỉ dùng cho tác vụ nền hỗ trợ có thể mất bất cứ lúc nào: heartbeat, dọn cache định kỳ, thu thập metric.\
\
Mặc định thread mới **kế thừa trạng thái daemon từ thread tạo ra nó**; `main` là user thread nên thread bạn tạo trong `main` mặc định cũng là user thread. Các thread nội bộ của JVM (GC, JIT compiler) đều là daemon.

## Detailed Answer (EN)
The JVM only **waits for user threads**. When the last user thread finishes, the JVM exits and **kills any running daemon threads immediately**.\
\
```java\
Thread cleaner = new Thread(this::sweepCache);\
cleaner.setDaemon(true);   // must be called BEFORE start()\
cleaner.start();           // after start() -\u003e IllegalThreadStateException\
```\
\
The key consequence: a daemon is stopped abruptly, so **`finally` blocks and shutdown logic may never run**. Never use a daemon for work that must complete — writing files, flushing buffers, committing transactions. Use them only for background support work that can be dropped at any moment: heartbeats, periodic cache eviction, metrics collection.\
\
A new thread **inherits the daemon flag from its creator**; `main` is a user thread, so threads you spawn from `main` are user threads by default. The JVM's own internal threads (GC, JIT compiler) are daemons.
