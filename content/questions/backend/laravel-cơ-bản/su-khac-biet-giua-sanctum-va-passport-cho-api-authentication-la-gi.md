---
id: su-khac-biet-giua-sanctum-va-passport-cho-api-authentication-la-gi
position: backend
technology: laravel-cơ-bản
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa Sanctum và Passport cho API authentication là gì?

## Question (EN)
What is the difference between Sanctum and Passport for API authentication?

## Đáp án chi tiết (VI)
Cả hai đều xác thực Laravel API nhưng phục vụ nhu cầu khác nhau. Sanctum: nhẹ, phù hợp cho SPA cùng domain và personal access token, dùng session cho SPA và token DB-less cho mobile/external app. Passport: triển khai đầy đủ OAuth 2.0, phù hợp cho ứng dụng bên thứ ba cần tích hợp (như OAuth của GitHub), nặng hơn nhưng linh hoạt cho B2B. Quy tắc đơn giản: Sanctum cho frontend của chính bạn (SPA, mobile app công ty), Passport khi bên khác cần tích hợp vào hệ thống. Từ Laravel 11+, Sanctum là default được khuyến nghị cho hầu hết trường hợp.

## Detailed Answer (EN)
Both authenticate Laravel APIs but serve different needs. Sanctum: lightweight, good for same-domain SPAs and personal access tokens, session-based for SPAs and DB-less tokens for mobile/external apps. Passport: full OAuth 2.0 implementation for third-party app authentication (like GitHub OAuth apps), heavier but more flexible for B2B scenarios. Simple rule: Sanctum for your own frontend (SPA, company mobile app), Passport when external parties need to integrate into your system. From Laravel 11+, Sanctum is the recommended default for most use cases.
