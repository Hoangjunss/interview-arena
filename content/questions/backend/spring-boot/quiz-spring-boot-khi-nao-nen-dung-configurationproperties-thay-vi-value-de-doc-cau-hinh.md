---
id: quiz-spring-boot-khi-nao-nen-dung-configurationproperties-thay-vi-value-de-doc-cau-hinh
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng @ConfigurationProperties thay vì @Value để đọc cấu hình?

## Đáp án trắc nghiệm
- [x] Khi cần bind một NHÓM property vào class/record type-safe, có validation
- [ ] Chỉ @Value mới đọc được từ application.yml; @ConfigurationProperties chỉ đọc từ biến môi trường
- [ ] @ConfigurationProperties nhanh hơn lúc runtime vì đọc property trực tiếp từ file mỗi lần truy cập, bỏ qua Environment
- [ ] @ConfigurationProperties là bắt buộc cho mọi property; @Value đã bị loại bỏ (deprecated) trong Spring Boot 3

## Giải thích (VI)
Dùng @ConfigurationProperties khi cần bind một NHÓM property liên quan (thường ≥3 key) vào một class/record: type-safe, chuyển kiểu đầy đủ, validate được bằng @Validated + Bean Validation, và IDE autocomplete/navigation. Dùng @Value cho một property đơn lẻ hoặc khi cần biểu thức SpEL. Cả hai đọc từ cùng nguồn Environment; khác biệt nằm ở phạm vi bind và type-safety.

### Giải thích các phương án:
- **Khi cần bind một NHÓM property vào class/record type-safe, có validation** (Đúng): Đúng: @ConfigurationProperties bind nhóm property, chuyển kiểu đầy đủ và validate được (@Validated + Bean Validation); @Value hợp hơn cho một property đơn lẻ hoặc biểu thức SpEL.
- **Chỉ @Value mới đọc được từ application.yml; @ConfigurationProperties chỉ đọc từ biến môi trường** (Sai): Sai: cả hai đọc từ cùng nguồn Environment (yml, properties, env var...); khác biệt là bind một property hay cả nhóm.
- **@ConfigurationProperties nhanh hơn lúc runtime vì đọc property trực tiếp từ file mỗi lần truy cập, bỏ qua Environment** (Sai): Sai: cả hai bind giá trị một lần khi tạo bean qua Environment, không đọc lại file mỗi lần truy cập; đây không phải khác biệt về tốc độ.
- **@ConfigurationProperties là bắt buộc cho mọi property; @Value đã bị loại bỏ (deprecated) trong Spring Boot 3** (Sai): Sai: @Value vẫn được hỗ trợ đầy đủ và hữu ích cho property đơn lẻ; @ConfigurationProperties không thay thế hoàn toàn nó.
