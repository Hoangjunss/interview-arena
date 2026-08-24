---
id: quiz-spring-boot-restcontroller-khac-controller-o-diem-nao
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@RestController khác @Controller ở điểm nào?

## Đáp án trắc nghiệm
- [ ] @Controller đã bị loại bỏ từ Spring Boot 3, chỉ còn @RestController
- [ ] @RestController tự động thêm CORS cho mọi endpoint, @Controller thì không
- [ ] @RestController chỉ nhận request GET, còn @Controller nhận mọi HTTP method
- [x] @RestController = @Controller + @ResponseBody, trả về vào response body

## Giải thích (VI)
@RestController = @Controller + @ResponseBody. Giá trị trả về được ghi thẳng vào response body qua HttpMessageConverter (mặc định Jackson → JSON). @Controller không có @ResponseBody thì chuỗi trả về bị hiểu là tên view để template engine render.

### Giải thích các phương án:
- **@Controller đã bị loại bỏ từ Spring Boot 3, chỉ còn @RestController** (Sai): @Controller vẫn dùng bình thường cho ứng dụng render view phía server.
- **@RestController tự động thêm CORS cho mọi endpoint, @Controller thì không** (Sai): CORS cấu hình riêng bằng @CrossOrigin hoặc WebMvcConfigurer.
- **@RestController chỉ nhận request GET, còn @Controller nhận mọi HTTP method** (Sai): Cả hai đều xử lý mọi method; việc đó do @GetMapping/@PostMapping quyết định.
- **@RestController = @Controller + @ResponseBody, trả về vào response body** (Đúng): Đúng — đây là meta-annotation gộp hai annotation đó, nên giá trị trả về được serialize (thường là JSON) thay vì được hiểu là tên view để render.
