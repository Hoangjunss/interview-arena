---
id: synchronized-va-volatile-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
synchronized và volatile khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
What is the difference between synchronized and volatile? When should you use each?

## Đáp án chi tiết (VI)
| | **`synchronized`** | **`volatile`** |\
|---|---|---|\
| Mutual exclusion | Có — 1 thread vào block | Không |\
| Atomicity (compound op) | Có | Không |\
| Visibility (memory) | Có | Có — |\
| Cost | Đắt (lock contention, context switch) | Rẻ (memory barrier) |\
\
**`synchronized`** dùng cho: critical section đa bước, compound op (`count++`, check-then-act).\
\
**`volatile`** dùng cho: boolean flag, reference immutable object, singleton DCL.\
\
```java\
// synchronized\
synchronized (lock) { count++; }   // atomic + visible\
\
// volatile — chỉ visible, KHÔNG atomic\
volatile boolean stop = false;     // OK cho flag\
volatile int count;\
count++;     // BAD: vẫn race\
```\
\
Hiện đại: cần atomicity → dùng **`AtomicInteger`/`AtomicReference`** (CAS, rẻ hơn synchronized). Cần lock có timeout/fairness → **`ReentrantLock`**.\
\
`volatile` không phải \\"synchronized rẻ\\" — chỉ giải quyết visibility, không phải mutex.

## Detailed Answer (EN)
| | **`synchronized`** | **`volatile`** |\
|---|---|---|\
| Mutual exclusion | Yes — one thread per block | No |\
| Atomicity (compound op) | Yes | No |\
| Visibility (memory) | Yes | Yes — |\
| Cost | Expensive (lock contention, context switch) | Cheap (memory barrier) |\
\
**`synchronized`** for: multi-step critical sections, compound ops (`count++`, check-then-act).\
\
**`volatile`** for: boolean flags, immutable object references, singleton DCL.\
\
```java\
// synchronized\
synchronized (lock) { count++; }   // atomic + visible\
\
// volatile — visible only, NOT atomic\
volatile boolean stop = false;     // OK for flags\
volatile int count;\
count++;     // BAD: still races\
```\
\
Modern: for atomicity → use **`AtomicInteger`/`AtomicReference`** (CAS, cheaper than synchronized). For locks with timeout/fairness → **`ReentrantLock`**.\
\
`volatile` is not \\"cheap synchronized\\" — it only solves visibility, not mutual exclusion.
