---
id: quiz-angular-cau-hinh-router-co-ban-trong-angular-gom-nhng-manh-nao
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cấu hình router cơ bản trong Angular gồm những mảnh nào?

## Đáp án trắc nghiệm
- [ ] Route phải khai báo trong NgModule, standalone app không dùng router được
- [x] Mảng Routes ánh xạ path → component, provideRouter, <router-outlet>
- [ ] Chỉ cần đặt file component vào thư mục theo tên đường dẫn, Angular tự sinh route
- [ ] <router-outlet> chỉ dùng cho lazy route, route thường render thẳng vào body

## Giải thích (VI)
Ba mảnh: mảng Routes ánh xạ path sang component (kèm :id cho tham số động và ** cho trang không khớp), đăng ký bằng provideRouter(routes) trong bootstrapApplication, và <router-outlet> đánh dấu nơi component của route được render. Điều hướng trong template dùng routerLink, trong code dùng Router.navigate().

### Giải thích các phương án:
- **Route phải khai báo trong NgModule, standalone app không dùng router được** (Sai): Standalone app đăng ký router bằng provideRouter trong bootstrapApplication.
- **Mảng Routes ánh xạ path → component, provideRouter, <router-outlet>** (Đúng): Đúng: ba mảnh — cấu hình, đăng ký và chỗ hiển thị component khớp route.
- **Chỉ cần đặt file component vào thư mục theo tên đường dẫn, Angular tự sinh route** (Sai): Angular không dùng file-system routing; route phải khai báo tường minh.
- **<router-outlet> chỉ dùng cho lazy route, route thường render thẳng vào body** (Sai): Mọi route đều render vào vị trí <router-outlet>, không phân biệt lazy hay không.
