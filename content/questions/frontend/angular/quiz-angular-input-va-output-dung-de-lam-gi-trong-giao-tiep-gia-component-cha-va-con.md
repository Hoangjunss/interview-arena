---
id: quiz-angular-input-va-output-dung-de-lam-gi-trong-giao-tiep-gia-component-cha-va-con
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Input() và @Output() dùng để làm gì trong giao tiếp giữa component cha và con?

## Đáp án trắc nghiệm
- [ ] @Input() dành cho service, @Output() dành cho HTTP response
- [ ] @Output() truyền dữ liệu từ cha xuống con, còn @Input() gửi ngược lên
- [ ] Cả hai đều truyền dữ liệu hai chiều, nên sửa ở con là cha tự đổi theo
- [x] @Input() nhận dữ liệu từ cha; @Output() phát sự kiện lên cha

## Giải thích (VI)
@Input() khai báo property mà component cha gán vào bằng property binding (<child [value]="x">) — dữ liệu đi từ cha xuống con. @Output() khai báo một EventEmitter, con gọi emit(payload) và cha lắng nghe bằng (changed)="onChanged($event)" — sự kiện đi từ con lên cha. Luồng dữ liệu vì thế luôn rõ một chiều mỗi hướng.

### Giải thích các phương án:
- **@Input() dành cho service, @Output() dành cho HTTP response** (Sai): Cả hai đều thuộc về giao tiếp giữa component, không liên quan tới service hay HTTP.
- **@Output() truyền dữ liệu từ cha xuống con, còn @Input() gửi ngược lên** (Sai): Đảo chiều: input là xuống, output là lên.
- **Cả hai đều truyền dữ liệu hai chiều, nên sửa ở con là cha tự đổi theo** (Sai): Con gán lại giá trị input không làm cha đổi state; muốn cha đổi thì con phải emit qua output.
- **@Input() nhận dữ liệu từ cha; @Output() phát sự kiện lên cha** (Đúng): Đúng: một chiều xuống bằng property binding, một chiều lên bằng event — @Output() phát qua EventEmitter mà cha lắng nghe bằng event binding.
