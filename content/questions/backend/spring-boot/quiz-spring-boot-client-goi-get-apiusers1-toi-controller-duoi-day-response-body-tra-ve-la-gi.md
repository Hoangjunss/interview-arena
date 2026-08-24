---
id: quiz-spring-boot-client-goi-get-apiusers1-toi-controller-duoi-day-response-body-tra-ve-la-gi
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Client gọi GET /api/users/1 tới controller dưới đây. Response body trả về là gì?

## Đáp án trắc nghiệm
- [ ] Spring coi "Ann" là tên view và đi tìm template user rồi render HTML
- [ ] Lỗi biên dịch — controller method không được trả về kiểu object tuỳ ý, phải là String hoặc ResponseEntity
- [x] JSON của object User — @RestController = @Controller + @ResponseBody
- [ ] Response rỗng với status 200 — method trả object nhưng thiếu @ResponseBody nên body không được ghi

## Giải thích (VI)
Trả về JSON của object User, ví dụ {"id":1,"name":"Ann"}. @RestController = @Controller + @ResponseBody, nên mọi method mặc định ghi giá trị trả về thẳng vào response body qua message converter (Jackson) thay vì hiểu nó là tên view. Đây là điểm khác cốt lõi với @Controller — vốn dùng cho web MVC trả về template HTML.

### Giải thích các phương án:
- **Spring coi "Ann" là tên view và đi tìm template user rồi render HTML** (Sai): Sai: view resolution là hành vi của @Controller thường; @RestController bỏ qua bước này và serialize object trả về.
- **Lỗi biên dịch — controller method không được trả về kiểu object tuỳ ý, phải là String hoặc ResponseEntity** (Sai): Sai: trả về kiểu object tuỳ ý là hợp lệ; Spring tự serialize. ResponseEntity chỉ cần khi muốn kiểm soát status/header.
- **JSON của object User — @RestController = @Controller + @ResponseBody** (Đúng): Đúng: @RestController ngầm thêm @ResponseBody cho mọi method nên Spring dùng message converter (Jackson) ghi thẳng object ra response body.
- **Response rỗng với status 200 — method trả object nhưng thiếu @ResponseBody nên body không được ghi** (Sai): Sai: @RestController đã bao gồm @ResponseBody, không cần ghi thêm; body sẽ chứa JSON.
