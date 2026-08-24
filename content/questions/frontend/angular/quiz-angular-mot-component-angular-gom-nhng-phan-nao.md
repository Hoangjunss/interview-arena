---
id: quiz-angular-mot-component-angular-gom-nhng-phan-nao
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một component Angular gồm những phần nào?

## Đáp án trắc nghiệm
- [x] Class TypeScript chứa state/logic, cộng decorator @Component khai báo metadata
- [ ] Chỉ một file HTML — Angular tự sinh class tương ứng lúc build
- [ ] Một hàm trả về JSX giống React, được đăng ký qua NgModule
- [ ] Một object literal export mặc định, trong đó thuộc tính render là bắt buộc phải có

## Giải thích (VI)
Component Angular gồm ba phần: class TypeScript giữ state và logic, template HTML mô tả giao diện, và style. Decorator @Component nối chúng lại qua metadata: selector (tên thẻ dùng trong template khác), template/templateUrl và styles/styleUrl. Angular đọc metadata này lúc biên dịch để sinh code render.

### Giải thích các phương án:
- **Class TypeScript chứa state/logic, cộng decorator @Component khai báo metadata** (Đúng): Đúng: class giữ dữ liệu và hành vi, decorator cung cấp metadata (selector, template/templateUrl, styles) để Angular biết render ở đâu và bằng template nào.
- **Chỉ một file HTML — Angular tự sinh class tương ứng lúc build** (Sai): Template không tồn tại độc lập: nó luôn gắn với một class được đánh dấu @Component.
- **Một hàm trả về JSX giống React, được đăng ký qua NgModule** (Sai): Angular dùng template HTML với cú pháp riêng, không dùng JSX; component là class chứ không phải hàm.
- **Một object literal export mặc định, trong đó thuộc tính render là bắt buộc phải có** (Sai): Đây là mô tả của Vue Options API, không phải Angular.
