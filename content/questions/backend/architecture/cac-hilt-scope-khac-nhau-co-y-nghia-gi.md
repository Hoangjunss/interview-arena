---
id: cac-hilt-scope-khac-nhau-co-y-nghia-gi
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các Hilt scope khác nhau có ý nghĩa gì?

## Question (EN)
What are the different Hilt scopes and what do they mean?

## Đáp án chi tiết (VI)
Hilt scope kiểm soát thời gian sống của dependency instance: `@Singleton` sống suốt vòng đời app, `@ActivityScoped` theo vòng đời Activity, `@ViewModelScoped` theo ViewModel, và `@FragmentScoped` theo Fragment. Scope mặc định là unscoped (tạo instance mới mỗi lần). Chọn scope dựa vào thời gian muốn tái sử dụng instance. `@Singleton` phổ biến nhất nhưng dùng loại khác để quản lý bộ nhớ tốt hơn.

## Detailed Answer (EN)
Hilt scopes control how long dependency instances live: `@Singleton` lives for the app's lifetime, `@ActivityScoped` for the activity, `@ViewModelScoped` for the ViewModel, and `@FragmentScoped` for the fragment. Default scope is unscoped (new instance each time). Choose scopes based on how long you want to reuse instances. `@Singleton` is most common but use others to manage memory.
