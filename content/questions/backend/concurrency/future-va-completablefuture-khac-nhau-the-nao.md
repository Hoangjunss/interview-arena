---
id: future-va-completablefuture-khac-nhau-the-nao
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Future và CompletableFuture khác nhau thế nào?

## Question (EN)
What are Future and CompletableFuture in Java?

## Đáp án chi tiết (VI)
**`Future`** (Java 5) đại diện cho kết quả async. Hạn chế: `get()` **block**, không chain được, exception handling khó.\
\
**`CompletableFuture`** (Java 8+) khắc phục: non-blocking, chain được, xử lý exception sạch.\
\
```java\
CompletableFuture.supplyAsync(() -\u003e fetchData())\
  .thenApply(data -\u003e process(data))            // chain transform\
  .thenAccept(System.out::println)\
  .exceptionally(ex -\u003e { log(ex); return null; });\
\
// Java 9+\
cf.orTimeout(5, TimeUnit.SECONDS);\
cf.completeOnTimeout(defaultValue, 5, TimeUnit.SECONDS);\
\
// Chạy song song nhiều task\
CompletableFuture.allOf(cf1, cf2, cf3).join();\
```\
\
**Operator phổ biến:** `thenApply` (map), `thenCompose` (flatMap), `thenAccept` (consumer), `thenCombine` (zip 2 CF), `handle` (xử lý cả success + error).\
\
**Java 21+:** `StructuredTaskScope` là alternative hiện đại — quản lý lifecycle task rõ ràng, hoạt động tốt với Virtual Threads.

## Detailed Answer (EN)
**`Future`** (Java 5) represents an async result. Limitations: `get()` **blocks**, no chaining, awkward exception handling.\
\
**`CompletableFuture`** (Java 8+) addresses this: non-blocking, chainable, clean exception handling.\
\
```java\
CompletableFuture.supplyAsync(() -\u003e fetchData())\
  .thenApply(data -\u003e process(data))            // chain transform\
  .thenAccept(System.out::println)\
  .exceptionally(ex -\u003e { log(ex); return null; });\
\
// Java 9+\
cf.orTimeout(5, TimeUnit.SECONDS);\
cf.completeOnTimeout(defaultValue, 5, TimeUnit.SECONDS);\
\
// Run many tasks in parallel\
CompletableFuture.allOf(cf1, cf2, cf3).join();\
```\
\
**Common operators:** `thenApply` (map), `thenCompose` (flatMap), `thenAccept` (consumer), `thenCombine` (zip two CFs), `handle` (success + error).\
\
**Java 21+:** `StructuredTaskScope` is the modern alternative — explicit task lifecycle, integrates well with Virtual Threads.
