---
id: quiz-spring-boot-endpoint-duoi-day-nhan-body-co-email-sai-dinh-dang-dieu-gi-xay-ra
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Endpoint dưới đây nhận body có email sai định dạng. Điều gì xảy ra?

## Đáp án trắc nghiệm
- [x] Spring ném MethodArgumentNotValidException, trả 400 trước khi vào method
- [ ] Trả về 500 Internal Server Error vì exception chưa được bắt
- [ ] Spring tự sửa email về chuỗi rỗng rồi tiếp tục xử lý
- [ ] Method vẫn chạy bình thường; muốn biết có lỗi phải tự gọi validator trong thân method

## Giải thích (VI)
Trả 400 Bad Request, service.create không được gọi. @Valid kích hoạt Bean Validation ngay khi bind @RequestBody; vi phạm ràng buộc sinh MethodArgumentNotValidException và Spring Boot ánh xạ sẵn thành 400. Cần thư viện spring-boot-starter-validation trên classpath.

### Giải thích các phương án:
- **Spring ném MethodArgumentNotValidException, trả 400 trước khi vào method** (Đúng): @Valid chạy ở tầng binding tham số, trước khi thân method của controller thực thi — nên service.create không hề được gọi.
- **Trả về 500 Internal Server Error vì exception chưa được bắt** (Sai): Spring Boot có sẵn handler cho exception này và ánh xạ thành 400, không phải 500.
- **Spring tự sửa email về chuỗi rỗng rồi tiếp tục xử lý** (Sai): Bean Validation chỉ kiểm tra, không bao giờ tự sửa dữ liệu.
- **Method vẫn chạy bình thường; muốn biết có lỗi phải tự gọi validator trong thân method** (Sai): Có @Valid thì Spring tự kiểm tra và chặn lại trước khi gọi method.
