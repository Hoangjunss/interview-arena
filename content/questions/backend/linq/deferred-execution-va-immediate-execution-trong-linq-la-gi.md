---
id: deferred-execution-va-immediate-execution-trong-linq-la-gi
position: backend
technology: linq
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deferred execution và immediate execution trong LINQ là gì?

## Question (EN)
What is the difference between deferred and immediate execution in LINQ?

## Đáp án chi tiết (VI)
Deferred execution trì hoãn việc thực thi query cho đến khi dữ liệu thực sự được truy cập — `var result = collection.Where(x =\u003e x \u003e 5)` chưa chạy cho đến khi bạn iterate hoặc gọi `ToList()`. Immediate execution chạy ngay lập tức: `ToList()`, `ToArray()`, `Count()`, `First()`. Hầu hết LINQ operators dùng deferred execution. Hiểu rõ khi nào query thực sự chạy để tránh bug khó tìm.

## Detailed Answer (EN)
Deferred execution delays query evaluation until data is accessed — `var result = collection.Where(x =\u003e x \u003e 5)` does not execute until you iterate or call `ToList()`. Immediate execution runs right away: `ToList()`, `ToArray()`, `Count()`, `First()`. Most LINQ operators use deferred execution. Understanding when queries actually run is key to avoiding subtle bugs.
