---
id: isolate-trong-dart-la-gi-va-khi-nao-dung-chung
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Isolate trong Dart là gì và khi nào dùng chúng?

## Question (EN)
What are isolates in Dart and when do you use them?

## Đáp án chi tiết (VI)
Isolate là các luồng thực thi riêng biệt không chia sẻ bộ nhớ — mỗi isolate có heap và event loop riêng. Dùng isolate cho công việc tốn CPU (parse JSON lớn, mã hóa, xử lý ảnh) để tránh block main UI thread. API hiện đại (2025): `Isolate.run()` (Dart 2.19+ / Flutter 3.7+) cho tác vụ one-shot ngắn gọn; `compute()` là Flutter helper wrapper. `Isolate.spawn()` vẫn dùng cho long-lived isolate cần giao tiếp liên tục qua SendPort/ReceivePort. Isolate nhẹ hơn OS thread nhưng nặng hơn async/await, nên dùng tiết kiệm.

## Detailed Answer (EN)
Isolates are separate execution threads that don't share memory — each has its own heap and event loop. Use isolates for CPU-intensive work (JSON parsing, encryption, image processing) to avoid blocking the main UI thread. Modern API (2025): use `Isolate.run()` (Dart 2.19+ / Flutter 3.7+) for concise one-shot background tasks, or `compute()` as the Flutter helper wrapper. Use `Isolate.spawn()` for long-lived isolates that need continuous communication via SendPort/ReceivePort. They are lighter than OS threads but heavier than async/await.
