---
id: quiz-php-controller-laravel-khai-bao-constructorderservice-service-instance-orderservice
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Controller Laravel khai báo __construct(OrderService $service). Instance OrderService từ đâu ra?

## Đáp án trắc nghiệm
- [ ] Dev phải new và truyền vào khi khai báo route
- [ ] Composer autoload tạo sẵn mọi service lúc app khởi động
- [ ] PHP tự new object khi gặp type-hint trong constructor
- [x] Service container resolve theo type-hint và inject tự động

## Giải thích (VI)
Service container của Laravel. Khi cần dựng controller, container dùng reflection đọc type-hint trong constructor, tự resolve OrderService (và mọi dependency của chính nó, đệ quy) rồi inject vào. Dev không phải new ở đâu cả — đây là dependency injection tự động (auto-wiring).

### Giải thích các phương án:
- **Dev phải new và truyền vào khi khai báo route** (Sai): Laravel tự resolve controller từ container, không cần new tay.
- **Composer autoload tạo sẵn mọi service lúc app khởi động** (Sai): Autoload chỉ nạp file class khi cần, không khởi tạo object.
- **PHP tự new object khi gặp type-hint trong constructor** (Sai): Bản thân PHP không có cơ chế đó; đây là việc của framework.
- **Service container resolve theo type-hint và inject tự động** (Đúng): Container đọc type-hint qua reflection, tự dựng cả cây dependency.
