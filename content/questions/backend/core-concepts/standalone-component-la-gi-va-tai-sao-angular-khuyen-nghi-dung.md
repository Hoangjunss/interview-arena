---
id: standalone-component-la-gi-va-tai-sao-angular-khuyen-nghi-dung
position: backend
technology: core-concepts
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Standalone component là gì và tại sao Angular khuyến nghị dùng?

## Question (EN)
What is a standalone component and why does Angular recommend it?

## Đáp án chi tiết (VI)
Standalone component là component tự quản lý các dependencies của nó thông qua mảng `imports` bên trong decorator `@Component` và có thể bootstrap trực tiếp bằng `bootstrapApplication()` mà không cần đến `NgModule`.\
\
**Lợi ích chính:**\
- **Giảm boilerplate:** Loại bỏ sự cồng kềnh của `NgModule`.\
- **Dễ hiểu hơn:** Dependency graph (biểu đồ phụ thuộc) rõ ràng, code dễ đọc và maintain.\
- **Lazy loading dễ hơn:** Có thể lười tải (lazy load) từng component trực tiếp qua route thay vì phải tạo nguyên một module.\
\
*Lưu ý:* `NgModule` vẫn được hỗ trợ và có thể sử dụng song song để tương thích ngược với các thư viện cũ (legacy).

## Detailed Answer (EN)
A standalone component declares its dependencies through `imports` and can be bootstrapped directly with `bootstrapApplication`.\
\
Benefits: less NgModule boilerplate, a clearer dependency graph, easier route-level lazy loading and better alignment with modern Angular. NgModules are still supported in legacy apps or older libraries. If the goal is to test root app bootstrap/configuration, split that into a separate API-focused question.
