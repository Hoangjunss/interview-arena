---
id: quiz-spring-boot-service-nem-usernotfoundexception-voi-restcontrolleradvice-duoi-day-client-nhan
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service ném UserNotFoundException. Với @RestControllerAdvice dưới đây, client nhận status code nào?

## Đáp án trắc nghiệm
- [x] 404 kèm body JSON của ApiError — @ResponseStatus quyết định status
- [ ] 500, vì mọi exception chưa được xử lý đều thành Internal Server Error
- [ ] 404 nhưng body rỗng, vì @ResponseStatus luôn loại bỏ body
- [ ] 200, vì handler trả về object thành công nên coi như request đã xử lý xong

## Giải thích (VI)
404 kèm body JSON của ApiError. @RestControllerAdvice = @ControllerAdvice + @ResponseBody, gom xử lý exception cho toàn bộ controller. @ExceptionHandler chọn loại exception, @ResponseStatus đặt status, giá trị trả về thành response body.

### Giải thích các phương án:
- **404 kèm body JSON của ApiError — @ResponseStatus quyết định status** (Đúng): Handler trong @RestControllerAdvice bắt đúng loại exception từ mọi controller, @ResponseStatus đặt 404 và giá trị trả về được serialize vào body.
- **500, vì mọi exception chưa được xử lý đều thành Internal Server Error** (Sai): Exception ở đây ĐÃ được xử lý bởi @ExceptionHandler nên không rơi vào 500.
- **404 nhưng body rỗng, vì @ResponseStatus luôn loại bỏ body** (Sai): @RestControllerAdvice hàm ý @ResponseBody nên ApiError vẫn được serialize vào body.
- **200, vì handler trả về object thành công nên coi như request đã xử lý xong** (Sai): @ResponseStatus(NOT FOUND) ghi đè status mặc định thành 404.
