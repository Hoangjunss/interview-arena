---
id: quiz-angular-trong-ung-dung-angular-hien-dai-dung-standalone-component-ngmodule-con-vai-tro-g
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong ứng dụng Angular hiện đại dùng standalone component, NgModule còn vai trò gì?

## Đáp án trắc nghiệm
- [ ] Vẫn bắt buộc phải có ít nhất một NgModule gốc thì mới bootstrap được ứng dụng
- [ ] Chỉ còn dùng cho lazy loading, vì loadComponent không tồn tại
- [x] Chủ yếu để tương thích với thư viện cũ và gom provider khi migrate dần
- [ ] Không còn tồn tại trong Angular hiện đại — code có NgModule sẽ không biên dịch được

## Giải thích (VI)
NgModule vẫn được hỗ trợ nhưng không còn là mặc định. Vai trò còn lại: tương thích với thư viện cũ xuất NgModule, và làm nơi gom một nhóm provider hoặc khai báo dùng chung trong quá trình migrate dần. Ứng dụng mới bootstrap bằng bootstrapApplication(AppComponent, { providers: [...] }), và mỗi standalone component tự khai báo imports của mình.

### Giải thích các phương án:
- **Vẫn bắt buộc phải có ít nhất một NgModule gốc thì mới bootstrap được ứng dụng** (Sai): bootstrapApplication khởi động thẳng từ component standalone, không cần module gốc.
- **Chỉ còn dùng cho lazy loading, vì loadComponent không tồn tại** (Sai): Ngược lại: loadComponent cho phép lazy load mà không cần module.
- **Chủ yếu để tương thích với thư viện cũ và gom provider khi migrate dần** (Đúng): Đúng: NgModule không biến mất mà lùi về vai trò tương thích (thư viện cũ còn xuất NgModule) và gom nhóm provider/khai báo dùng chung.
- **Không còn tồn tại trong Angular hiện đại — code có NgModule sẽ không biên dịch được** (Sai): NgModule vẫn được hỗ trợ; ứng dụng cũ chạy bình thường và có thể migrate dần.
