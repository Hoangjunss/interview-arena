---
id: nang-cap-len-spring-boot-2-6-thi-app-khong-khoi-dong-duoc-vi-beancurrentlyincrea
position: backend
technology: dependency-injection
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nâng cấp lên Spring Boot 2.6+ thì app không khởi động được vì `BeanCurrentlyInCreationException` — xử lý thế nào?

## Question (EN)
After upgrading to Spring Boot 2.6+ the app fails to start with `BeanCurrentlyInCreationException` — how do you fix it?

## Đáp án chi tiết (VI)
Từ **Spring Boot 2.6**, circular reference giữa các bean bị **cấm mặc định**. Trước đó container tự phá vòng lặp bằng cách tiêm bean chưa khởi tạo xong, giờ nó fail-fast ngay lúc startup.\
\
**Cách chữa nhanh (chỉ để unblock deploy):**\
\
```properties\
spring.main.allow-circular-references=true\
```\
\
**Cách chữa đúng, theo thứ tự ưu tiên:**\
1. **Tách phần dùng chung** của A và B ra một bean C, cả hai cùng phụ thuộc C. Vòng lặp thường là dấu hiệu hai service ôm chung một trách nhiệm.\
2. **Đảo chiều bằng event**: A publish `ApplicationEvent`, B lắng nghe — bỏ hẳn tham chiếu trực tiếp.\
3. `@Lazy` trên một đầu của vòng để Spring tiêm proxy, hoãn khởi tạo. Đây là giải pháp làm dịu triệu chứng, không sửa thiết kế.\
\
Lưu ý: chuyển từ constructor injection sang field injection cũng làm app chạy được, nhưng chỉ là giấu vòng lặp — constructor injection fail-fast chính là thứ đang giúp bạn phát hiện vấn đề.

## Detailed Answer (EN)
Since **Spring Boot 2.6**, circular references between beans are **prohibited by default**. Previously the container broke the cycle by injecting a partially initialised bean; now it fails fast at startup.\
\
**Quick escape (only to unblock a deploy):**\
\
```properties\
spring.main.allow-circular-references=true\
```\
\
**Proper fixes, in order of preference:**\
1. **Extract the shared part** of A and B into a bean C that both depend on. A cycle usually means two services share one responsibility.\
2. **Invert with events**: A publishes an `ApplicationEvent`, B listens — the direct reference disappears.\
3. `@Lazy` on one side of the cycle so Spring injects a proxy and defers initialisation. This relieves the symptom, it does not fix the design.\
\
Note: switching from constructor to field injection also makes the app boot, but it merely hides the cycle — constructor injection failing fast is precisely what surfaced the problem.
