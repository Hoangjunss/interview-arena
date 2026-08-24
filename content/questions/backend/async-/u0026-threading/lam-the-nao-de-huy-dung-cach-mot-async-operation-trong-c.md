---
id: lam-the-nao-de-huy-dung-cach-mot-async-operation-trong-c
position: backend
technology: async-\u0026-threading
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để hủy đúng cách một async operation trong C#?

## Question (EN)
How do you properly cancel an asynchronous operation in C#?

## Đáp án chi tiết (VI)
Truyền `CancellationToken` vào các async methods và kiểm tra `token.IsCancellationRequested` định kỳ. Ném `OperationCanceledException` khi phát hiện cancellation. Gọi `cts.Cancel()` để báo hiệu hủy bỏ; dùng `cts.CancelAfter(TimeSpan)` cho timeout tự động. Xử lý cancellation đúng cách ngăn resource leak và orphaned tasks.

## Detailed Answer (EN)
Pass a `CancellationToken` to async methods and periodically check `token.IsCancellationRequested`. Throw `OperationCanceledException` when cancellation is detected. Call `cts.Cancel()` to signal cancellation; use `cts.CancelAfter(TimeSpan)` for automatic timeout. Properly handling cancellation prevents resource leaks and orphaned tasks.
