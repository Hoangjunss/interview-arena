---
id: mutex-va-semaphore-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: process-\u0026-thread
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mutex và Semaphore khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do Mutex and Semaphore differ? When should you use each?

## Đáp án chi tiết (VI)
Mutex (Mutual Exclusion Lock) là binary lock: chỉ có 2 trạng thái locked/unlocked, và quan trọng là chỉ thread nào lock thì mới được unlock (ownership semantics). Dùng để bảo vệ critical section — chỉ 1 thread access vào một lúc.\
\
Semaphore là counter: counting semaphore cho phép N thread cùng access (semaphore=N); binary semaphore (N=1) tương tự mutex nhưng không có ownership — thread A có thể signal semaphore mà thread B đã wait.\
\
Dùng mutex khi: bảo vệ shared data (HashMap, linked list) — một thread đọc/ghi tại một thời điểm. Dùng semaphore khi: giới hạn concurrent access (connection pool tối đa 10 connections), producer-consumer synchronization (producer signal khi có item mới). Deadlock risk: mutex thường dùng recursive mutex để tránh self-deadlock. Go dùng `sync.Mutex` và `sync.RWMutex` (nhiều reader, 1 writer); channel thường là cách idiomatic hơn để synchronize trong Go.

## Detailed Answer (EN)
$85
