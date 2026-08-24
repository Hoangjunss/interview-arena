---
id: giai-thich-android-activity-lifecycle-va-muc-dich-cua-tung-method
position: backend
technology: android-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích Android Activity lifecycle và mục đích của từng method.

## Question (EN)
Explain the Android Activity lifecycle and each method's purpose.

## Đáp án chi tiết (VI)
Activity lifecycle có 6 method chính theo thứ tự: `onCreate()` (khởi tạo), `onStart()` (trở nên visible), `onResume()` (có focus), `onPause()` (mất focus), `onStop()` (không còn visible), `onDestroy()` (dọn dẹp). Hiểu lifecycle rất quan trọng vì bạn phải lưu state trong `onSaveInstanceState()` và khôi phục trong `onCreate()`. Memory leak thường xảy ra khi giữ strong reference đến Activity quá vòng đời của nó.

## Detailed Answer (EN)
Activity lifecycle has six main methods: `onCreate()` (initialize), `onStart()` (become visible), `onResume()` (gain focus), `onPause()` (lose focus), `onStop()` (not visible), `onDestroy()` (cleanup). Understanding this is critical because you must save state in `onSaveInstanceState()` and restore it in `onCreate()`. Memory leaks often occur if you hold strong references to activities beyond their lifecycle.
