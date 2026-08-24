---
id: contentprovider-la-gi-va-dung-trong-truong-hop-nao
position: backend
technology: android-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ContentProvider là gì và dùng trong trường hợp nào?

## Question (EN)
What is ContentProvider and its use case?

## Đáp án chi tiết (VI)
ContentProvider là lớp trừu tượng cung cấp quyền truy cập có kiểm soát vào dữ liệu của app cho các app hoặc process khác. Nó dùng URI để xác định resource và implement các thao tác CRUD qua `query()`, `insert()`, `update()`, `delete()`. Danh bạ, lịch, và ảnh đều dùng ContentProvider. Chúng đảm bảo tính nhất quán dữ liệu, bảo mật qua permission, và cho phép chia sẻ dữ liệu qua ranh giới app.

## Detailed Answer (EN)
ContentProvider is an abstraction that provides controlled access to app data for other apps or processes. It uses URIs to identify resources and implements CRUD operations through `query()`, `insert()`, `update()`, `delete()`. Contacts, calendars, and photos use ContentProviders. They ensure data consistency, security through permissions, and allow data sharing across app boundaries.
