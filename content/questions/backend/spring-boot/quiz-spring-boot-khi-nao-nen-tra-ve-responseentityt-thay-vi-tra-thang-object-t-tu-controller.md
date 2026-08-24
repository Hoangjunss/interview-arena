---
id: quiz-spring-boot-khi-nao-nen-tra-ve-responseentityt-thay-vi-tra-thang-object-t-tu-controller
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên trả về ResponseEntity<T> thay vì trả thẳng object T từ controller?

## Đáp án trắc nghiệm
- [ ] Bắt buộc luôn dùng ResponseEntity, trả thẳng object đã bị loại bỏ từ Spring Boot 3
- [ ] Khi controller cần chạy bất đồng bộ; trả object thường thì luôn chặn luồng
- [ ] Khi muốn trả về JSON — trả thẳng object thì Spring luôn trả XML
- [x] Khi cần kiểm soát status code và header của response

## Giải thích (VI)
Dùng ResponseEntity khi cần tự quyết định status hoặc thêm header. Trả thẳng object thì Spring luôn dùng 200 OK (trừ khi có @ResponseStatus). Ví dụ điển hình cần ResponseEntity: 201 Created kèm header Location, hoặc phân nhánh 200/404 ngay trong method.

### Giải thích các phương án:
- **Bắt buộc luôn dùng ResponseEntity, trả thẳng object đã bị loại bỏ từ Spring Boot 3** (Sai): Trả thẳng object vẫn hợp lệ và rất phổ biến.
- **Khi controller cần chạy bất đồng bộ; trả object thường thì luôn chặn luồng** (Sai): Bất đồng bộ dùng CompletableFuture/Mono, không liên quan tới ResponseEntity.
- **Khi muốn trả về JSON — trả thẳng object thì Spring luôn trả XML** (Sai): Định dạng do content negotiation và HttpMessageConverter quyết định.
- **Khi cần kiểm soát status code và header của response** (Đúng): ResponseEntity gói cả body, status và header trong một giá trị trả về — ví dụ trả 201 kèm header Location sau khi tạo, hoặc chọn giữa 200 và 404 ngay trong method.
