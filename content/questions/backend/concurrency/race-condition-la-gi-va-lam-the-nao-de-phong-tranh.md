---
id: race-condition-la-gi-va-lam-the-nao-de-phong-tranh
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Race condition là gì và làm thế nào để phòng tránh?

## Question (EN)
What is a race condition and how do you prevent it?

## Đáp án chi tiết (VI)
**Race condition** xảy ra khi nhiều thread truy cập shared data đồng thời, kết quả cuối phụ thuộc vào thứ tự thực thi → không thể đoán trước.\
\
```java\
int count = 0;\
// 2 thread cùng chạy:\
count++;     // 3 op: read → add → write\
// → có thể overlap → lost update\
```\
\
**Phòng tránh, theo thứ tự ưu tiên:**\
1. **Atomic variables:** `AtomicInteger.incrementAndGet()` — lock-free, CAS.\
2. **`synchronized` / `Lock`** cho critical section đa bước.\
3. **Immutable object** — không có \\"write\\" thì không có race.\
4. **Thread-safe collection:** `ConcurrentHashMap`, `CopyOnWriteArrayList`.\
5. **Thread-local data** — không share thì không race.\
\
**Cách test:** tăng concurrency cao (`Executors.newFixedThreadPool(100)` + chạy 10K lần), assertion ở cuối — race sẽ lộ rõ với tỉ lệ fail nhỏ.\
\
Nguyên nhân gốc: **non-atomic operation trên shared state**. Fix là làm op atomic hoặc loại bỏ shared state.

## Detailed Answer (EN)
**Race condition** occurs when multiple threads access shared data concurrently and the final result depends on execution order → unpredictable.\
\
```java\
int count = 0;\
// 2 threads run simultaneously:\
count++;     // 3 ops: read → add → write\
// → may overlap → lost update\
```\
\
**Prevention, in order of preference:**\
1. **Atomic variables:** `AtomicInteger.incrementAndGet()` — lock-free, CAS.\
2. **`synchronized` / `Lock`** for multi-step critical sections.\
3. **Immutable objects** — no \\"write\\" = no race.\
4. **Thread-safe collections:** `ConcurrentHashMap`, `CopyOnWriteArrayList`.\
5. **Thread-local data** — not shared = no race.\
\
**Testing:** crank up concurrency (`Executors.newFixedThreadPool(100)` running 10K iterations) with an assertion at the end — races reveal themselves with a small failure rate.\
\
Root cause: **non-atomic operations on shared state**. The fix is making the op atomic or eliminating shared state.
