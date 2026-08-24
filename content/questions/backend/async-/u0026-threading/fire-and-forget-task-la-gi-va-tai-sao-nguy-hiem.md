---
id: fire-and-forget-task-la-gi-va-tai-sao-nguy-hiem
position: backend
technology: async-\u0026-threading
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Fire-and-forget task là gì và tại sao nguy hiểm?

## Question (EN)
What are fire-and-forget tasks and why are they risky?

## Đáp án chi tiết (VI)
Fire-and-forget task thực thi mà không được await: `_ = someAsync();`. Nguy hiểm vì exceptions biến mất trong im lặng, gây ra lỗi rất khó debug. Luôn capture task result hoặc await. Đăng ký global handler `TaskScheduler.UnobservedTaskException` để bắt các exception bị bỏ sót. Không bao giờ \\"bắn rồi quên\\" trong production code trừ khi được xử lý cẩn thận.

## Detailed Answer (EN)
Fire-and-forget tasks execute without being awaited: `_ = someAsync();`. They are risky because exceptions silently disappear, causing hard-to-debug failures. Always capture task results or await them. Register `TaskScheduler.UnobservedTaskException` for a global safety net. Never fire-and-forget in production without proper exception handling.
