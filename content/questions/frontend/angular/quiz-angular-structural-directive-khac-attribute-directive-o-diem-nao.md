---
id: quiz-angular-structural-directive-khac-attribute-directive-o-diem-nao
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Structural directive khác attribute directive ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Attribute directive bắt buộc phải có dấu * phía trước tên
- [ ] Structural directive không được tự viết, chỉ Angular mới định nghĩa được
- [x] Structural directive thêm/bớt phần tử khỏi DOM; attribute chỉ đổi diện mạo
- [ ] Structural directive chỉ chạy trên server, attribute directive chỉ chạy trên client

## Giải thích (VI)
Structural directive thay đổi cấu trúc DOM: thêm, bớt hoặc lặp phần tử — *ngIf, *ngFor, *ngSwitchCase. Dấu * là cú pháp rút gọn của việc bọc phần tử trong <ng-template>. Attribute directive giữ nguyên cấu trúc và chỉ thay đổi diện mạo hay hành vi của phần tử sẵn có — ngClass, ngStyle, hoặc directive tự viết.

### Giải thích các phương án:
- **Attribute directive bắt buộc phải có dấu * phía trước tên** (Sai): Dấu * là cú pháp rút gọn của structural directive, không phải attribute directive.
- **Structural directive không được tự viết, chỉ Angular mới định nghĩa được** (Sai): Hoàn toàn viết được directive tuỳ biến bằng TemplateRef và ViewContainerRef.
- **Structural directive thêm/bớt phần tử khỏi DOM; attribute chỉ đổi diện mạo** (Đúng): Đúng: khác biệt nằm ở chỗ có thay đổi cây DOM hay không — *ngIf/*ngFor so với ngClass/ngStyle.
- **Structural directive chỉ chạy trên server, attribute directive chỉ chạy trên client** (Sai): Cả hai đều là khái niệm template, chạy ở bất cứ đâu Angular render.
