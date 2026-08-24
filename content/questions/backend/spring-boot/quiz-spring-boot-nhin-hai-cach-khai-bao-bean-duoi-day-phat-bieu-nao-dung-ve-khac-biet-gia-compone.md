---
id: quiz-spring-boot-nhin-hai-cach-khai-bao-bean-duoi-day-phat-bieu-nao-dung-ve-khac-biet-gia-compone
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nhìn hai cách khai báo bean dưới đây, phát biểu nào đúng về khác biệt giữa @Component và @Bean?

## Đáp án trắc nghiệm
- [ ] @Component chỉ dùng được cho class có sẵn của framework, còn @Bean mới dùng cho class trong ứng dụng của bạn
- [ ] @Bean và @Component tạo ra bean với scope khác nhau: @Bean luôn là prototype còn @Component luôn là singleton
- [x] @Component để Spring tự new qua component scan; @Bean trả về object bạn tự tạo
- [ ] Chỉ @Bean tạo ra Spring bean thật; class gắn @Component chỉ là POJO thường, không được container quản lý

## Giải thích (VI)
@Component đặt trên class của bạn — Spring phát hiện qua component scan rồi tự khởi tạo bằng default constructor. @Bean đặt trên method trong @Configuration và trả về object do bạn tự tạo, hợp cho class thư viện ngoài (RestTemplate, ObjectMapper) hoặc init cần logic tuỳ ý. Cả hai mặc định là singleton scope.

### Giải thích các phương án:
- **@Component chỉ dùng được cho class có sẵn của framework, còn @Bean mới dùng cho class trong ứng dụng của bạn** (Sai): Ngược lại: @Component dành cho class của bạn (scan được); @Bean thường dùng cho class thư viện ngoài không thể gắn @Component.
- **@Bean và @Component tạo ra bean với scope khác nhau: @Bean luôn là prototype còn @Component luôn là singleton** (Sai): Sai: cả hai mặc định đều là singleton scope; scope do @Scope quyết định, không phụ thuộc cách khai báo.
- **@Component để Spring tự new qua component scan; @Bean trả về object bạn tự tạo** (Đúng): Đúng: @Component dựa vào component scan + default constructor; @Bean đặt trên method trong @Configuration nên bạn kiểm soát cách tạo object — hợp cho class thư viện ngoài (RestTemplate) hoặc init cần logic tuỳ ý.
- **Chỉ @Bean tạo ra Spring bean thật; class gắn @Component chỉ là POJO thường, không được container quản lý** (Sai): Sai: class @Component được component scan phát hiện và đăng ký thành bean do container quản lý y như @Bean.
