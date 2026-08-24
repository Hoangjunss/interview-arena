---
id: configureawait-false-la-gi-va-khi-nao-nen-dung
position: backend
technology: async-\u0026-threading
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ConfigureAwait(false)` là gì và khi nào nên dùng?

## Question (EN)
What is ConfigureAwait(false) and when should you use it?

## Đáp án chi tiết (VI)
`ConfigureAwait(false)` báo cho async runtime không cần resume trên synchronization context đã được capture. Điều này quan trọng trong library code và services nơi không cần thread affinity. Lý do chính trong code hiện đại: tránh context-switching overhead và là \\"good library citizen\\" — không bắt context của caller. Lưu ý: trong classic ASP.NET (có SynchronizationContext) nó cũng ngăn deadlock khi `.Result` được dùng; nhưng trong ASP.NET Core thì không có SynchronizationContext nên deadlock prevention không áp dụng — lý do dùng chủ yếu là performance. Luôn dùng trong non-UI async code của library.

## Detailed Answer (EN)
`ConfigureAwait(false)` tells the async runtime not to resume on the captured synchronization context. The primary modern reason is performance — avoiding unnecessary context-switching overhead — and being a good library citizen that doesn't capture the caller's context. Note: in classic ASP.NET (which has a SynchronizationContext), it also prevents deadlocks when `.Result` is used; but ASP.NET Core has no SynchronizationContext, so deadlock prevention is not the reason to use it there. Always use it in non-UI async library code.
