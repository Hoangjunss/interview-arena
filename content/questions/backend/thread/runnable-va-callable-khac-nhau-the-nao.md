---
id: runnable-va-callable-khac-nhau-the-nao
position: backend
technology: thread
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Runnable` và `Callable` khác nhau thế nào?

## Question (EN)
How do `Runnable` and `Callable` differ?

## Đáp án chi tiết (VI)
Khác ở **giá trị trả về** và **cách lỗi được truyền đi**.\
\
| | `Runnable.run()` | `Callable.call()` |\
|---|---|---|\
| Trả về | `void` | `V` (generic) |\
| Checked exception | không ném được | `throws Exception` |\
| Nộp cho pool | `execute()` hoặc `submit()` | chỉ `submit()` |\
| Kết quả | không có | `Future\u003cV\u003e` |\
\
```java\
ExecutorService pool = Executors.newFixedThreadPool(2);\
\
pool.execute(() -\u003e load());              // Runnable: fire and forget\
Future\u003cInteger\u003e f = pool.submit(() -\u003e count());  // Callable: có kết quả\
int n = f.get();   // block tới khi xong\
```\
\
Điểm dễ vấp trong thực tế: nếu task ném exception, `execute(Runnable)` đẩy lỗi ra `UncaughtExceptionHandler` (thường in ra log), còn `submit(...)` **nuốt lỗi vào `Future`** — bạn chỉ thấy nó khi gọi `get()`, lúc đó nhận `ExecutionException` bọc lỗi gốc. Nộp task bằng `submit()` rồi không bao giờ đọc `Future` là cách phổ biến nhất làm mất exception.

## Detailed Answer (EN)
They differ in the **return value** and in **how errors propagate**.\
\
| | `Runnable.run()` | `Callable.call()` |\
|---|---|---|\
| Returns | `void` | `V` (generic) |\
| Checked exceptions | cannot throw | `throws Exception` |\
| Submitting | `execute()` or `submit()` | `submit()` only |\
| Result | none | `Future\u003cV\u003e` |\
\
```java\
ExecutorService pool = Executors.newFixedThreadPool(2);\
\
pool.execute(() -\u003e load());              // Runnable: fire and forget\
Future\u003cInteger\u003e f = pool.submit(() -\u003e count());  // Callable: produces a result\
int n = f.get();   // blocks until done\
```\
\
The practical gotcha: if a task throws, `execute(Runnable)` routes the error to the `UncaughtExceptionHandler` (usually logged), while `submit(...)` **captures it inside the `Future`** — you only see it when calling `get()`, wrapped in an `ExecutionException`. Submitting with `submit()` and never reading the `Future` is the most common way exceptions get lost.
