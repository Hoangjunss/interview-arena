---
id: inter-process-communication-ipc-la-gi-cac-co-che-ipc-pho-bien
position: backend
technology: process-\u0026-thread
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Inter-Process Communication (IPC) là gì? Các cơ chế IPC phổ biến?

## Question (EN)
What is Inter-Process Communication (IPC)? What are the common IPC mechanisms?

## Đáp án chi tiết (VI)
IPC là các cơ chế để các process độc lập trao đổi dữ liệu, vì chúng không chia sẻ bộ nhớ trực tiếp.\
\
- Pipe (anonymous pipe): luồng dữ liệu một chiều giữa parent-child process.\
- Named pipe (FIFO): pipe có tên trong filesystem, không cần parent-child relationship.\
- Shared Memory: vùng nhớ được map vào address space của nhiều process — nhanh nhất vì không copy data, nhưng cần đồng bộ (mutex/semaphore).\
- Message Queue: process gửi/nhận messages qua kernel queue (POSIX mqueue, System V) — asynchronous, có thể buffer.\
- Socket: Unix domain socket (local) hoặc TCP/UDP socket (network) — linh hoạt nhất, dùng cả local và remote; microservices giao tiếp qua HTTP/gRPC là IPC qua socket.\
- Signal: notification đơn giản (SIGTERM, SIGKILL, SIGUSR1) — limited data.\
- Memory-mapped file (mmap): file được map vào memory, nhiều process cùng đọc/ghi — Node.js dùng cho large file processing.\
\
Thực tế: Nginx worker processes giao tiếp với master qua pipe và shared memory.

## Detailed Answer (EN)
$88
