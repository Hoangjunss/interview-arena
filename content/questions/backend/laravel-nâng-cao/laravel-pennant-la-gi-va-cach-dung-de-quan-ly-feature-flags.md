---
id: laravel-pennant-la-gi-va-cach-dung-de-quan-ly-feature-flags
position: backend
technology: laravel-nâng-cao
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Laravel Pennant là gì và cách dùng để quản lý feature flags?

## Question (EN)
What is Laravel Pennant and how does it enable feature flag management?

## Đáp án chi tiết (VI)
Pennant là package feature flag chính thức của Laravel (cài riêng: `composer require laravel/pennant`, có official support từ Laravel 10+) để kiểm soát khả năng hiển thị tính năng. Hỗ trợ flag đơn giản và logic phức tạp theo class. \
\
**Ví dụ:** `Feature::define('new-checkout', fn() =\u003e rand(1,100) \u003c= 50)` cho A/B testing, hoặc `Feature::define(PurchaseButton::class, fn($user) =\u003e $user-\u003eisPremium())` cho feature theo user. Dùng trong Blade: `@feature('flag-name')`, trong controller: `Feature::active('flag-name')`. Cho phép: deploy không downtime, rollout từng bước, thử nghiệm A/B, tắt/bật tính năng mà không cần deploy lại.

## Detailed Answer (EN)
Pennant is Laravel's official feature flag package (install separately: `composer require laravel/pennant`, officially supported from Laravel 10+) for controlling feature visibility. Supports simple string flags and complex class-based logic. \
\
**Example:** `Feature::define('new-checkout', fn() =\u003e rand(1,100) \u003c= 50)` for A/B testing, or `Feature::define(PurchaseButton::class, fn($user) =\u003e $user-\u003eisPremium())` for user-specific features. Use in Blade: `@feature('flag-name')`, in controllers: `Feature::active('flag-name')`. Enables: zero-downtime deployments, gradual rollouts, A/B experiments, toggling features without redeployment.
