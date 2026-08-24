---
id: su-khac-biet-giua-feature-tests-va-unit-tests-trong-laravel-la-gi
position: backend
technology: laravel-cơ-bản
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa Feature tests và Unit tests trong Laravel là gì?

## Question (EN)
What is the difference between feature tests and unit tests in Laravel?

## Đáp án chi tiết (VI)
Feature tests kiểm tra toàn bộ chu trình request/response bao gồm route, middleware, authentication, validation và database—bắt bug thực tế người dùng gặp. Unit tests cô lập từng component (Service, Model method) mà không có HTTP layer. Ví dụ feature test: kiểm tra flow đăng nhập end-to-end với DB thực. Ví dụ unit test: kiểm tra logic hash password trong isolation. Community Laravel thường ưu tiên feature test vì mang lại ROI cao hơn cho Laravel app thông thường, nhưng tỷ lệ tối ưu tùy thuộc vào từng dự án. Unit test phù hợp cho business logic phức tạp (tính giá, thuật toán). Pest nhấn mạnh feature test là chiến lược test chính.

## Detailed Answer (EN)
Feature tests exercise the full request/response cycle including routes, middleware, authentication, validation, and database—catching realistic bugs users experience. Unit tests isolate individual components (Services, Model methods) without the HTTP layer. Example feature test: testing full login flow end-to-end with real DB. Example unit test: testing password hashing logic in isolation. The Laravel community generally favors feature tests for their higher ROI in typical apps, though the right balance depends on the project. Unit tests suit complex business logic (pricing engines, algorithms). Pest emphasizes feature tests as the primary testing strategy.
