---
id: cach-to-chuc-folder-package-trong-app-flutter-clean-architecture-nhu-the-nao
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tổ chức folder/package trong app Flutter clean architecture như thế nào?

## Question (EN)
How do you structure folders/packages in a clean architecture Flutter app?

## Đáp án chi tiết (VI)
Cấu trúc phổ biến: `lib/presentation/` (UI, widget, BLoC/ViewModel), `lib/domain/` (entity, repository interface, use case), `lib/data/` (API client, local DB, repository implementation), `lib/config/` (cấu hình app, constant). Mỗi feature có thể có domain/data/presentation riêng. Điều này giữ code có tổ chức, dễ điều hướng và test.

## Detailed Answer (EN)
Common structure: `presentation/` for UI and BLoCs/ViewModels, `domain/` for entities and use cases, `data/` for API clients and repository implementations, `config/` for app configuration. Each feature can have its own domain/data/presentation subdirectory.
