---
id: signals-trong-flutter-la-gi-va-khi-nao-nen-dung-thay-vi-riverpod
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Signals trong Flutter là gì và khi nào nên dùng thay vì Riverpod?

## Question (EN)
What are Signals in Flutter and when should you use them over Riverpod?

## Đáp án chi tiết (VI)
Signals là hệ thống reactive nguyên bản lấy cảm hứng từ SolidJS, cho phép cập nhật UI theo kiểu fine-grained—chỉ widget nào phụ thuộc vào signal đó mới rebuild, không phải cả cây widget. Khai báo: `final count = signal(0);`, dùng trong widget: `Watch((context) =\u003e Text('${count.value}'))`. Package `signals_flutter` đã có từ 2023 và đạt 1.0; awareness rộng rãi hơn vào 2023-2024. Riverpod phù hợp hơn cho global/shared state phức tạp, cần dependency injection. Signals lý tưởng cho local state performance-critical, ít boilerplate, phạm vi component nhỏ.

## Detailed Answer (EN)
Signals is a reactive system inspired by SolidJS, enabling fine-grained reactivity — only widgets depending on a signal rebuild, not the entire tree. The `signals_flutter` package has been available since 2023 and gained wider adoption in 2023-2024. Declare with `signal(0)`, consume with `Watch`. Use Signals for performance-critical, locally-scoped state with minimal boilerplate; use Riverpod for complex global/shared state requiring dependency injection.
