---
id: cac-loai-android-permission-va-cach-xu-ly-runtime-permissions
position: backend
technology: android-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các loại Android permission và cách xử lý runtime permissions?

## Question (EN)
What are the different Android permission types and how do you handle runtime permissions?

## Đáp án chi tiết (VI)
Normal permission (internet, vibrate) được cấp tự động khi cài đặt. Dangerous permission (camera, location, contacts) phải xin lúc runtime. Để xin runtime permission: tạo `ActivityResultContract`, dùng `registerForActivityResult()`, và kiểm tra `ContextCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED` trước khi dùng tính năng được bảo vệ. Từ Android 6 trở đi, bỏ qua runtime permission sẽ làm app crash.

## Detailed Answer (EN)
Normal permissions (internet, vibrate) are granted at install time. Dangerous permissions (camera, location, contacts) require runtime requests. To request runtime permissions: create an `ActivityResultContract`, request using `registerForActivityResult()`, and check `ContextCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED` before using protected features. Starting from Android 6, skipping runtime permission requests will crash the app.
