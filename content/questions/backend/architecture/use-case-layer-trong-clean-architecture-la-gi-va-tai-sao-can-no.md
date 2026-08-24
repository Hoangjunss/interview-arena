---
id: use-case-layer-trong-clean-architecture-la-gi-va-tai-sao-can-no
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Use-case layer trong clean architecture là gì và tại sao cần nó?

## Question (EN)
What is the use-case layer in clean architecture and why include it?

## Đáp án chi tiết (VI)
Use case đóng gói logic nghiệp vụ cho một tính năng: `GetUserUseCase`, `LoginUseCase`. Mỗi use case là một class với method `call()` nhận tham số và trả về kết quả. Use case nằm ở domain layer, không phụ thuộc framework, và dễ test cao. Chúng nối cầu giữa UI (trigger use case) và repository (lấy data). Use case được thiết kế tốt có thể tái sử dụng và test độc lập.

## Detailed Answer (EN)
Use cases encapsulate business logic for single features, each as a class with a `call()` method. They are domain-level, framework-agnostic, and highly testable. They bridge the gap between UI triggers and repositories, and well-designed use cases are reusable and testable in isolation.
