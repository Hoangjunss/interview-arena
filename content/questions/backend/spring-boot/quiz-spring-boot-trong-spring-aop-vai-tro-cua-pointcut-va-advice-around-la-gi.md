---
id: quiz-spring-boot-trong-spring-aop-vai-tro-cua-pointcut-va-advice-around-la-gi
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Spring AOP, vai trò của Pointcut và advice @Around là gì?

## Đáp án trắc nghiệm
- [ ] Pointcut là đoạn logic cross-cutting thực thi; @Around là nơi khai báo pattern chọn method
- [ ] Pointcut và @Around chỉ dùng được cho method static và phải khai trong file XML riêng
- [x] Pointcut chọn method bị intercept; @Around bao quanh và phải gọi proceed()
- [ ] @Around chỉ chạy được SAU khi method kết thúc và không thể can thiệp giá trị trả về

## Giải thích (VI)
Pointcut là biểu thức chọn những join point (method) sẽ bị intercept, ví dụ execution( com.example.service. . (..)). @Around là advice bao quanh method: nhận ProceedingJoinPoint, chạy logic trước, gọi proceed() để thực thi method thật, rồi chạy logic sau — kiểm soát được cả giá trị trả về và exception. AOP dùng để tách cross-cutting concern (logging, security, transaction) khỏi business logic.

### Giải thích các phương án:
- **Pointcut là đoạn logic cross-cutting thực thi; @Around là nơi khai báo pattern chọn method** (Sai): Sai: lẫn vai trò — pointcut là biểu thức chọn method, còn advice (@Around/@Before...) mới chứa logic thực thi.
- **Pointcut và @Around chỉ dùng được cho method static và phải khai trong file XML riêng** (Sai): Sai: AOP proxy áp cho instance method của bean; khai bằng annotation (@Aspect/@Pointcut/@Around), không bắt buộc XML.
- **Pointcut chọn method bị intercept; @Around bao quanh và phải gọi proceed()** (Đúng): Đúng: pointcut là biểu thức khớp join point cần áp advice; @Around nhận ProceedingJoinPoint, kiểm soát cả việc có gọi proceed() hay không nên xử lý được trước lẫn sau.
- **@Around chỉ chạy được SAU khi method kết thúc và không thể can thiệp giá trị trả về** (Sai): Sai: @Around bao quanh cả trước và sau, và có thể thay đổi/thay thế giá trị trả về; "chỉ sau" là @AfterReturning.
