---
id: error-boundary-khong-bat-duoc-loi-nao
position: backend
technology: forms-\u0026-error
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error Boundary không bắt được lỗi nào?

## Question (EN)
What errors does an Error Boundary NOT catch?

## Đáp án chi tiết (VI)
Error Boundary không bắt: errors trong event handlers (phải try/catch thủ công), async code (setTimeout, Promises), server-side rendering, errors trong chính Error Boundary component. Chỉ bắt errors trong render phase, lifecycle methods, constructors của component tree bên dưới.

## Detailed Answer (EN)
Error Boundaries do not catch: errors inside event handlers (use try/catch manually), errors in async code (setTimeout, Promises), server-side rendering errors, or errors thrown by the Error Boundary component itself. They only catch errors that occur during the render phase, lifecycle methods, and constructors of the component tree below them.
