---
id: quiz-angular-signal-input-input-khac-input-truyen-thong-o-cho-nao
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Signal input input() khác @Input() truyền thống ở chỗ nào?

## Đáp án trắc nghiệm
- [x] Giá trị được bọc trong signal nên computed/effect phản ứng trực tiếp
- [ ] Signal input chỉ dùng được trong component không standalone
- [ ] Chỉ là cú pháp ngắn hơn, bên trong Angular vẫn gọi ngOnChanges nên phải tự so sánh giá trị
- [ ] Signal input cho phép component con gán giá trị ngược lên cha bằng set()

## Giải thích (VI)
input() trả về một signal chỉ đọc: đọc bằng user() và mọi computed/effect đọc nó sẽ tự chạy lại khi cha truyền giá trị mới. input.required<T>() bắt buộc cha phải truyền, compiler báo lỗi nếu thiếu. So với @Input(), không cần ngOnChanges để theo dõi thay đổi, và kiểu dữ liệu chặt hơn vì không phải khai báo undefined cho trạng thái chưa gán.

### Giải thích các phương án:
- **Giá trị được bọc trong signal nên computed/effect phản ứng trực tiếp** (Đúng): Đúng: input trở thành nguồn phản ứng (đọc bằng user()), ghép thẳng vào hệ thống signal thay vì phải đi qua ngOnChanges.
- **Signal input chỉ dùng được trong component không standalone** (Sai): Không có ràng buộc như vậy; signal input dùng được ở mọi component.
- **Chỉ là cú pháp ngắn hơn, bên trong Angular vẫn gọi ngOnChanges nên phải tự so sánh giá trị** (Sai): Signal input không cần ngOnChanges để theo dõi thay đổi — phụ thuộc được ghi nhận tự động.
- **Signal input cho phép component con gán giá trị ngược lên cha bằng set()** (Sai): Input là chỉ đọc từ phía con; muốn hai chiều phải dùng model() — đó là điểm khác biệt của model input.
