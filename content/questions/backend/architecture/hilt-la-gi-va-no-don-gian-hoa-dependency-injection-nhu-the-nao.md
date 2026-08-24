---
id: hilt-la-gi-va-no-don-gian-hoa-dependency-injection-nhu-the-nao
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hilt là gì và nó đơn giản hóa dependency injection như thế nào?

## Question (EN)
What is Hilt and how does it simplify dependency injection?

## Đáp án chi tiết (VI)
Hilt là thư viện DI được xây trên Dagger, thiết kế riêng cho Android. Nó loại bỏ boilerplate bằng cách cung cấp module có sẵn cho Android component. Đánh dấu Application với `@HiltAndroidApp`, Activity/Fragment với `@AndroidEntryPoint`, và inject bằng `@Inject`. Hilt tự động quản lý scope (như `@Singleton`) và tích hợp liền mạch với ViewModel và composable.

## Detailed Answer (EN)
Hilt is a dependency injection library built on Dagger, designed specifically for Android. It eliminates boilerplate by providing predefined modules for Android components. Mark your Application with `@HiltAndroidApp`, Activities/Fragments with `@AndroidEntryPoint`, and inject with `@Inject`. Hilt automatically manages scopes (like `@Singleton`) and integrates seamlessly with ViewModels and composables.
