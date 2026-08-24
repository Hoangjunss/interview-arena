---
id: quiz-spring-boot-trong-controller-duoi-day-ba-tham-so-id-page-body-lan-luot-duoc-lay-tu-dau-cua-h
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong controller dưới đây, ba tham số id, page, body lần lượt được lấy từ đâu của HTTP request?

## Đáp án trắc nghiệm
- [ ] id từ query string, page từ path, body từ header — thứ tự khai báo tham số quyết định nguồn dữ liệu
- [x] id từ path {id}, page từ query string, body từ nội dung request body
- [ ] Cả ba đều lấy từ query string vì mọi tham số của controller method đều đến từ query parameter
- [ ] id và page đều từ path; body được đọc từ query string dưới dạng chuỗi JSON đã encode

## Giải thích (VI)
@PathVariable Long id lấy từ đoạn path {id} của URL (/users/42/notes → 42). @RequestParam int page lấy từ query string (?page=2), có defaultValue nên optional. @RequestBody NoteDto body lấy từ nội dung request body — Jackson deserialize JSON thành object. Nguồn dữ liệu do annotation quyết định, không phụ thuộc thứ tự khai báo tham số.

### Giải thích các phương án:
- **id từ query string, page từ path, body từ header — thứ tự khai báo tham số quyết định nguồn dữ liệu** (Sai): Sai: nguồn dữ liệu do annotation quyết định, không do thứ tự; và không tham số nào ở đây lấy từ header.
- **id từ path {id}, page từ query string, body từ nội dung request body** (Đúng): Đúng: @PathVariable đọc segment path, @RequestParam đọc query string, @RequestBody deserialize body (Jackson chuyển JSON thành NoteDto).
- **Cả ba đều lấy từ query string vì mọi tham số của controller method đều đến từ query parameter** (Sai): Sai: chỉ @RequestParam đọc query string; @PathVariable đọc path và @RequestBody đọc body.
- **id và page đều từ path; body được đọc từ query string dưới dạng chuỗi JSON đã encode** (Sai): Sai: page mang @RequestParam nên từ query string, còn @RequestBody đọc từ thân request chứ không từ query.
