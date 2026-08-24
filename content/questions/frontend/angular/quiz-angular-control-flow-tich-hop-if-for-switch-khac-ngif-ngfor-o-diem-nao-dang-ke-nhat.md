---
id: quiz-angular-control-flow-tich-hop-if-for-switch-khac-ngif-ngfor-o-diem-nao-dang-ke-nhat
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Control flow tích hợp @if, @for, @switch khác *ngIf, *ngFor ở điểm nào đáng kể nhất?

## Đáp án trắc nghiệm
- [x] Tích hợp trong compiler nên không cần CommonModule; track là bắt buộc
- [ ] Chỉ là đổi cú pháp cho đẹp, bản chất vẫn được biên dịch thành *ngIf/*ngFor
- [ ] @if chỉ hoạt động với signal, không dùng được với biến thường
- [ ] @for không cần khoá định danh vì Angular tự so sánh bằng tham chiếu

## Giải thích (VI)
Control flow mới nằm trong compiler chứ không phải directive, nên template không cần import CommonModule. Cú pháp đầy đủ hơn: @else if/@else, @empty cho danh sách rỗng, và as để đặt tên giá trị. track trong @for là bắt buộc — buộc phải nghĩ về khoá định danh, thứ quyết định hiệu năng khi danh sách thay đổi.

### Giải thích các phương án:
- **Tích hợp trong compiler nên không cần CommonModule; track là bắt buộc** (Đúng): Đúng: gộp cả ba khác biệt thực chất — tích hợp compiler, cú pháp đầy đủ hơn (@else/@empty), track bắt buộc trong @for, và không còn giới hạn một structural directive mỗi phần tử.
- **Chỉ là đổi cú pháp cho đẹp, bản chất vẫn được biên dịch thành *ngIf/*ngFor** (Sai): Control flow mới được compiler xử lý riêng, không phải lớp bọc quanh directive cũ, và cho hiệu năng lặp tốt hơn.
- **@if chỉ hoạt động với signal, không dùng được với biến thường** (Sai): Dùng được với mọi biểu thức; signal chỉ là một nguồn dữ liệu phổ biến.
- **@for không cần khoá định danh vì Angular tự so sánh bằng tham chiếu** (Sai): Ngược lại: track là bắt buộc, chính là điểm khác *ngFor (nơi trackBy là tuỳ chọn).
