---
id: mutex-va-rwmutex-dung-khi-nao
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mutex và RWMutex dùng khi nào?

## Question (EN)
When should you use Mutex and RWMutex?

## Đáp án chi tiết (VI)
`sync.Mutex`: Lock()/Unlock() cho exclusive access (1 goroutine tại 1 thời điểm). `sync.RWMutex`: RLock() cho nhiều readers đồng thời, Lock() cho exclusive write. Dùng khi shared state giữa goroutines. Luôn `defer mu.Unlock()`. Tránh deadlock: lock order nhất quán.

## Detailed Answer (EN)
`sync.Mutex`: Lock()/Unlock() for exclusive access (one goroutine at a time). `sync.RWMutex`: RLock() allows multiple concurrent readers, Lock() for exclusive writes. Use when goroutines share mutable state. Always `defer mu.Unlock()`. Prevent deadlocks by acquiring locks in a consistent order.
