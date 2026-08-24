---
id: countdownlatch-va-cyclicbarrier-khac-nhau-the-nao
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CountdownLatch và CyclicBarrier khác nhau thế nào?

## Question (EN)
What is the difference between CountdownLatch and CyclicBarrier?

## Đáp án chi tiết (VI)
| | **CountdownLatch** | **CyclicBarrier** |\
|---|---|---|\
| Đồng bộ | Một chiều, một lần | **Cyclic** (tái sử dụng) |\
| Ai chờ ai | Main thread chờ N worker xong | N thread chờ nhau cùng tiến |\
| Reset | Không | Có (tự reset sau mỗi vòng) |\
\
```java\
// CountdownLatch — main chờ N worker xong\
CountDownLatch latch = new CountDownLatch(3);\
for (int i = 0; i \u003c 3; i++) {\
  new Thread(() -\u003e {\
    doWork();\
    latch.countDown();\
  }).start();\
}\
latch.await();   // block đến khi counter = 0\
\
// CyclicBarrier — N thread đồng bộ tại checkpoint\
CyclicBarrier barrier = new CyclicBarrier(3, () -\u003e System.out.println(\\"all here\\"));\
for (int i = 0; i \u003c 3; i++) {\
  new Thread(() -\u003e {\
    phase1();\
    barrier.await();   // chờ 2 thread khác\
    phase2();\
  }).start();\
}\
```\
\
**Dùng:** CountdownLatch cho one-shot wait (start N service rồi mới ready); CyclicBarrier cho phased coordination (chia work theo round, mỗi round đồng bộ).

## Detailed Answer (EN)
| | **CountdownLatch** | **CyclicBarrier** |\
|---|---|---|\
| Sync | One-way, one-shot | **Cyclic** (reusable) |\
| Who waits whom | Main waits for N workers | N threads wait for each other |\
| Reset | No | Yes (auto resets each round) |\
\
```java\
// CountdownLatch — main waits for N workers\
CountDownLatch latch = new CountDownLatch(3);\
for (int i = 0; i \u003c 3; i++) {\
  new Thread(() -\u003e {\
    doWork();\
    latch.countDown();\
  }).start();\
}\
latch.await();   // blocks until counter hits 0\
\
// CyclicBarrier — N threads synchronise at a checkpoint\
CyclicBarrier barrier = new CyclicBarrier(3, () -\u003e System.out.println(\\"all here\\"));\
for (int i = 0; i \u003c 3; i++) {\
  new Thread(() -\u003e {\
    phase1();\
    barrier.await();   // waits for the other 2 threads\
    phase2();\
  }).start();\
}\
```\
\
**Use:** CountdownLatch for one-shot waits (start N services before ready); CyclicBarrier for phased coordination (split work into rounds, sync each round).
