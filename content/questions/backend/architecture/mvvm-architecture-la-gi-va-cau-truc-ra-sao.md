---
id: mvvm-architecture-la-gi-va-cau-truc-ra-sao
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MVVM architecture là gì và cấu trúc ra sao?

## Question (EN)
What is MVVM architecture and how is it structured?

## Đáp án chi tiết (VI)
MVVM (Model-View-ViewModel) tách UI logic khỏi business logic: Model chứa dữ liệu và business rule, View hiển thị UI (Activity/Fragment/Composable), ViewModel chứa UI state và logic, tồn tại qua configuration change. ViewModel expose LiveData/StateFlow để View observe. Sự tách biệt này cải thiện khả năng test (test ViewModel không cần UI), tái sử dụng, và bảo trì. Hầu hết app Android ngày nay đều dùng MVVM.

## Detailed Answer (EN)
MVVM (Model-View-ViewModel) separates UI logic from business logic: Model holds data and business rules, View displays UI (Activity/Fragment/Composable), and ViewModel holds UI state and logic, surviving configuration changes. ViewModel exposes LiveData/StateFlow that View observes. This separation improves testability, reusability, and maintainability.
