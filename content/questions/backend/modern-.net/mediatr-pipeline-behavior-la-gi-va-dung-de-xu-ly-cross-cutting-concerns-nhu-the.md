---
id: mediatr-pipeline-behavior-la-gi-va-dung-de-xu-ly-cross-cutting-concerns-nhu-the
position: backend
technology: modern-.net
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MediatR pipeline behavior là gì và dùng để xử lý cross-cutting concerns như thế nào?

## Question (EN)
What are MediatR pipeline behaviors and how do they handle cross-cutting concerns?

## Đáp án chi tiết (VI)
MediatR pipeline behavior chặn request trước khi handler thực thi. Đăng ký behavior: `services.AddTransient(typeof(IPipelineBehavior\u003c,\u003e), typeof(LoggingBehavior\u003c,\u003e))`. Dùng để logging, validation, caching, authorization mà không sửa từng handler. Thứ tự behavior quan trọng — thường là: validation → caching → logging → handler. Giữ handler tập trung vào business logic; giảm boilerplate. Chuẩn công nghiệp cho clean architecture với MediatR.

## Detailed Answer (EN)
MediatR pipeline behaviors intercept requests before handlers execute. Register behaviors via `services.AddTransient(typeof(IPipelineBehavior\u003c,\u003e), typeof(LoggingBehavior\u003c,\u003e))`. They enable logging, validation, caching, and authorization without modifying individual handlers. Behavior order matters — typically: validation → caching → logging → handler. Handlers stay focused on business logic; cross-cutting concerns are decoupled. Industry standard for clean architecture with MediatR.
