---
id: widgetsflutterbinding-la-gi-va-khi-nao-dung-no
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`WidgetsFlutterBinding` là gì và khi nào dùng nó?

## Question (EN)
What is `WidgetsFlutterBinding` and when do you use it?

## Đáp án chi tiết (VI)
`WidgetsFlutterBinding` khởi tạo Flutter engine. Dùng `WidgetsFlutterBinding.ensureInitialized()` trước khi chạy app để khởi tạo plugin/service trước `runApp()`. Trường hợp dùng phổ biến: setup `GetIt` trước khi app khởi động, khởi tạo code native, cấu hình logging. Không có nó, một số khởi tạo bất đồng bộ sẽ thất bại vì binding chưa sẵn sàng. Luôn gọi trong `main()` nếu có setup trước app.

## Detailed Answer (EN)
`WidgetsFlutterBinding.ensureInitialized()` initializes the Flutter engine before `runApp()`. Use it when you need to initialize plugins, native code, or services before the app starts. Without it, some async initialization fails because the binding isn't ready yet.
