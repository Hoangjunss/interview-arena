---
id: use-case-pattern-la-gi-va-khi-nao-nen-tao-mot-use-case
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Use Case pattern là gì và khi nào nên tạo một Use Case?

## Question (EN)
What is the Use Case pattern and when should you create one?

## Đáp án chi tiết (VI)
Use Case (hay Interactor) đóng gói một thao tác business logic duy nhất, nhận input và trả về output. \
\
**Ví dụ:** `LoginUseCase`, `FetchUserDataUseCase`. Use Case là phần của Domain layer trong Clean Architecture và độc lập với UI framework. Chúng giúp logic tái sử dụng được, test được, và dễ hiểu. Tạo Use Case khi một logic cần được dùng từ nhiều ViewModel hoặc cần test độc lập.

## Detailed Answer (EN)
A Use Case (or Interactor) encapsulates a single business logic operation, taking input parameters and returning output. Examples: `LoginUseCase`, `FetchUserDataUseCase`. Use Cases are part of Clean Architecture's Domain layer and are independent of UI frameworks. Create one when a piece of logic needs to be used from multiple ViewModels or tested independently.
