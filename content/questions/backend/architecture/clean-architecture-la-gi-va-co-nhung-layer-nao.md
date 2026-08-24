---
id: clean-architecture-la-gi-va-co-nhung-layer-nao
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Clean Architecture là gì và có những layer nào?

## Question (EN)
Explain Clean Architecture and its layers.

## Đáp án chi tiết (VI)
Clean Architecture gồm 3 layer: Presentation (UI, ViewModel), Domain (business logic, use case), và Data (database, API, repository). Mỗi layer độc lập và có thể test riêng. Domain layer là Kotlin thuần không phụ thuộc Android, test được trên JVM. Data layer cung cấp repository mà domain layer sử dụng. Cấu trúc này ngăn tight coupling và cải thiện tổ chức code.

## Detailed Answer (EN)
Clean Architecture has three layers: Presentation (UI, ViewModels), Domain (business logic, use cases), and Data (databases, APIs, repositories). Each layer is independent and testable in isolation. Domain layer is pure Kotlin with no Android dependencies, making it testable on the JVM. This structure prevents tight coupling and improves code organization.
