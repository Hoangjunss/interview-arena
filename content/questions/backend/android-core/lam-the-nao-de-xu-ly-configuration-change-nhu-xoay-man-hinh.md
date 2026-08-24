---
id: lam-the-nao-de-xu-ly-configuration-change-nhu-xoay-man-hinh
position: backend
technology: android-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để xử lý configuration change như xoay màn hình?

## Question (EN)
How do you handle configuration changes (like screen rotation)?

## Đáp án chi tiết (VI)
Configuration change destroy và recreate Activity/Fragment. Bảo toàn state bằng: SavedInstanceState (UI state tạm thời), ViewModel (logic và data), và SharedPreferences/DataStore (data lâu dài). Không nên dùng `android:configChanges` để tắt recreation trừ khi thực sự cần thiết. Trong Compose, state tự động tồn tại qua rotation nếu dùng `rememberSaveable`. State management đúng cách giúp rotation trong suốt với người dùng.

## Detailed Answer (EN)
Configuration changes destroy and recreate Activities/Fragments. Preserve state using: SavedInstanceState (temporary UI state), ViewModel (logic and data), and SharedPreferences/DataStore (persistent data). Don't use `android:configChanges` to suppress recreation unless absolutely necessary. In Compose, state automatically survives rotation if using `rememberSaveable`.
