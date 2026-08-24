---
id: quiz-spring-boot-phat-bieu-nao-sau-day-sai-ve-dependency-injection-va-autowired-trong-spring
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào sau đây SAI về dependency injection và @Autowired trong Spring?

## Đáp án trắc nghiệm
- [ ] @Autowired mặc định bắt buộc phải tìm được bean, thiếu bean thì app không khởi động
- [x] Field injection dễ viết unit test hơn vì không phải khai constructor
- [ ] Constructor injection cho phép field khai báo final (immutable) và làm dependency bắt buộc trở nên rõ ràng
- [ ] Với class chỉ có đúng một constructor, từ Spring 4.3+ không cần ghi @Autowired trên constructor đó
- [ ] Setter injection phù hợp cho dependency optional (có thể không cần)

## Giải thích (VI)
Constructor injection cho phép field final và làm dependency bắt buộc rõ ràng; class có đúng một constructor thì Spring 4.3+ khỏi cần @Autowired; setter injection hợp cho dependency optional. Ngược lại, field injection khó test hơn (cần reflection), và @Autowired mặc định required=true nên thiếu bean sẽ khiến app không khởi động.

### Giải thích các phương án:
- **@Autowired mặc định bắt buộc phải tìm được bean, thiếu bean thì app không khởi động** (Sai): Phát biểu đúng: muốn cho phép thiếu thì đặt required = false hoặc dùng Optional.
- **Field injection dễ viết unit test hơn vì không phải khai constructor** (Đúng): Đây là chỗ sai: field injection khiến test phải dùng reflection hoặc bật cả context Spring, trong khi constructor injection cho phép new thẳng object trong test.
- **Constructor injection cho phép field khai báo final (immutable) và làm dependency bắt buộc trở nên rõ ràng** (Sai): Phát biểu đúng: field final cho dependency bất biến và làm phụ thuộc bắt buộc trở nên rõ ràng.
- **Với class chỉ có đúng một constructor, từ Spring 4.3+ không cần ghi @Autowired trên constructor đó** (Sai): Phát biểu đúng: từ Spring 4.3+, class chỉ có một constructor thì không cần ghi @Autowired.
- **Setter injection phù hợp cho dependency optional (có thể không cần)** (Sai): Phát biểu đúng: setter injection hợp cho dependency optional.
