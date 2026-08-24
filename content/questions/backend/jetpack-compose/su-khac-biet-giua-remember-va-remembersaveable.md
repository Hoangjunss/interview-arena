---
id: su-khac-biet-giua-remember-va-remembersaveable
position: backend
technology: jetpack-compose
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa `remember` và `rememberSaveable`?

## Question (EN)
What is the difference between `remember` and `rememberSaveable`?

## Đáp án chi tiết (VI)
`remember` giữ state qua các lần recomposition trong scope của composable nhưng mất khi configuration change như xoay màn hình. `rememberSaveable` persist state qua configuration change bằng cách tự động lưu vào Bundle. Dùng `rememberSaveable` cho dữ liệu người dùng nhập (form fields) và `remember` cho state UI tạm thời (animation values). `rememberSaveable` có overhead cao hơn một chút.

## Detailed Answer (EN)
`remember` keeps state across recompositions but loses it on configuration changes like screen rotation. `rememberSaveable` persists state across configuration changes by automatically saving it to a Bundle. Use `rememberSaveable` for important user input (form fields) and `remember` for temporary UI state (animation values). `rememberSaveable` has slightly more overhead.
