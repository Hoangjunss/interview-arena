---
id: su-khac-biet-giua-livedata-va-stateflow
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa LiveData và StateFlow?

## Question (EN)
Explain the difference between LiveData and StateFlow.

## Đáp án chi tiết (VI)
StateFlow là lựa chọn ưu tiên cho code mới (2025) — tích hợp tự nhiên với coroutine, luôn có `value` non-null có thể đọc an toàn, và hoạt động tốt với Compose. LiveData lifecycle-aware và tự động unsubscribe nhưng đang ở chế độ maintenance. StateFlow yêu cầu initial value; LiveData thì không. Khi dùng StateFlow trong Fragment, observe trong `repeatOnLifecycle` để tránh memory leak.

## Detailed Answer (EN)
StateFlow is the preferred choice for new code (2025) — it integrates naturally with coroutines, always has a non-null `.value` you can read safely at any time, and works better with Compose. LiveData is lifecycle-aware and auto-unsubscribes but is in maintenance mode. StateFlow requires an initial value; LiveData does not. When collecting StateFlow in Fragments, use `repeatOnLifecycle` to avoid leaks.
