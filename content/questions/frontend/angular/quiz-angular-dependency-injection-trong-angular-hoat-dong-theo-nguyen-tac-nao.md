---
id: quiz-angular-dependency-injection-trong-angular-hoat-dong-theo-nguyen-tac-nao
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency Injection trong Angular hoạt động theo nguyên tắc nào?

## Đáp án trắc nghiệm
- [ ] Mỗi class tự new service của nó để đảm bảo không dùng chung state
- [ ] Service chỉ dùng được trong component đã import file service đó bằng import của ES module
- [ ] Angular tự động import service dựa trên tên file, không cần khai báo gì
- [x] Class khai báo thứ nó cần, Angular tra injector và tự cung cấp instance

## Giải thích (VI)
DI đảo ngược quyền tạo phụ thuộc: class chỉ khai báo mình cần gì, còn việc tạo và cung cấp instance do injector của Angular lo. Service đánh dấu @Injectable({ providedIn: "root" }) là có sẵn toàn ứng dụng dưới dạng singleton. Nhờ vậy khi test có thể cung cấp bản thay thế mà không sửa code component.

### Giải thích các phương án:
- **Mỗi class tự new service của nó để đảm bảo không dùng chung state** (Sai): Đó chính là cách làm mà DI thay thế; tự new khiến việc thay thế khi test rất khó.
- **Service chỉ dùng được trong component đã import file service đó bằng import của ES module** (Sai): Import ES module chỉ để lấy kiểu/token; instance đến từ injector chứ không từ câu lệnh import.
- **Angular tự động import service dựa trên tên file, không cần khai báo gì** (Sai): DI dựa trên token đã đăng ký với injector, không dựa trên quy ước tên file.
- **Class khai báo thứ nó cần, Angular tra injector và tự cung cấp instance** (Đúng): Đúng: quyền tạo instance chuyển từ class sang framework (qua constructor hoặc inject()), nên dễ thay thế và test.
