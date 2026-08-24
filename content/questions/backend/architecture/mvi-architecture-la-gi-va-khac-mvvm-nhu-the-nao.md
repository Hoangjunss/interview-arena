---
id: mvi-architecture-la-gi-va-khac-mvvm-nhu-the-nao
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MVI architecture là gì và khác MVVM như thế nào?

## Question (EN)
What is MVI architecture and how does it differ from MVVM?

## Đáp án chi tiết (VI)
MVI (Model-View-Intent) dùng luồng dữ liệu một chiều như Flux hay Redux. View gửi intent (hành động người dùng) lên ViewModel, ViewModel xử lý và emit ViewState mới để cập nhật View. Khác với MVVM nơi ViewModel có thể expose nhiều StateFlow, MVI dùng một state object duy nhất được cập nhật theo một hướng. Có thể đoán trước hơn nhưng cần nhiều boilerplate hơn.

## Detailed Answer (EN)
MVI (Model-View-Intent) uses unidirectional data flow like Flux or Redux. The View sends intents (user actions) to the ViewModel, which processes them and emits new ViewStates updating the View. Unlike MVVM where ViewModels expose multiple StateFlows, MVI uses a single state object updated in one direction. It's more predictable but requires more boilerplate.
