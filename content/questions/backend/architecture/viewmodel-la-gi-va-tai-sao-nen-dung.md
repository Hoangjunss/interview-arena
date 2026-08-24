---
id: viewmodel-la-gi-va-tai-sao-nen-dung
position: backend
technology: architecture
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ViewModel là gì và tại sao nên dùng?

## Question (EN)
What is a ViewModel and why should you use it?

## Đáp án chi tiết (VI)
ViewModel lưu trữ dữ liệu UI theo cách lifecycle-aware, tồn tại qua configuration change như xoay màn hình. Nó không giữ reference đến View (ngăn memory leak) và là nơi lý tưởng để đặt business logic, gọi API, và quản lý state. Tạo ViewModel mỗi màn hình bằng `viewModel()` trong Compose hoặc `ViewModelProvider` trong Activity/Fragment. Tuyệt đối không truyền Activity hay View vào ViewModel.

## Detailed Answer (EN)
ViewModel holds UI-related data in a lifecycle-aware manner, surviving configuration changes like screen rotation. It doesn't hold references to Views (preventing memory leaks) and is the perfect place for business logic, API calls, and state management. Create one per screen using `viewModel()` in Compose or `ViewModelProvider` in Activities/Fragments. Never pass Activities or Views to ViewModel.
