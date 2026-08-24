---
id: architecture-testing-trong-laravel-voi-pest-la-gi-va-tai-sao-quan-trong
position: backend
technology: laravel-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Architecture testing trong Laravel với Pest là gì và tại sao quan trọng?

## Question (EN)
What is architecture testing in Laravel with Pest and why is it important?

## Đáp án chi tiết (VI)
Architecture testing kiểm tra quy tắc cấu trúc code mà không cần thực thi logic, phát hiện vi phạm design sớm. Ví dụ với Pest: `arch('Service không được truy cập trực tiếp DB')-\u003eexpect('App\\\\\\\\Services')-\u003enot-\u003etoUseClasses(['Illuminate\\\\\\\\Database\\\\\\\\Eloquent\\\\\\\\Model'])`. \
\
**Lợi ích:** ngăn tight coupling, bắt dependency injection bị bỏ qua, phát hiện cross-module dependency trái phép, enforce naming convention. Dùng cho: đảm bảo model nằm trong `Models/`, service trong `Services/`, controller chỉ gọi service. Vi phạm bị bắt tại CI thay vì runtime—tiết kiệm debug thời gian thực.

## Detailed Answer (EN)
Architecture testing enforces code structure rules without executing logic, catching design violations early. Example with Pest: `arch('Services should not access DB directly')-\u003eexpect('App\\\\\\\\Services')-\u003enot-\u003etoUseClasses(['Illuminate\\\\\\\\Database\\\\\\\\Eloquent\\\\\\\\Model'])`. \
\
**Benefits:** prevent tight coupling, catch bypassed dependency injection, detect unauthorized cross-module dependencies, enforce naming conventions. Use for: ensuring models stay in `Models/`, services in `Services/`, controllers only call services. Violations caught at CI time instead of runtime—saves live debugging effort.
