---
id: savedinstancestate-va-onsaveinstancestate-khac-nhau-nhu-the-nao
position: backend
technology: android-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`savedInstanceState` và `onSaveInstanceState()` khác nhau như thế nào?

## Question (EN)
What is the difference between savedInstanceState and onSaveInstanceState()?

## Đáp án chi tiết (VI)
`onSaveInstanceState()` là callback để lưu trạng thái UI tạm thời (như vị trí scroll) trước khi activity bị destroy do configuration change. Bundle này được truyền vào `onCreate()` hoặc `onRestoreInstanceState()`. Khác với lưu trữ lâu dài như SharedPreferences hay database. Dùng nó cho trạng thái tạm thời dễ lưu hơn là phải tạo lại UI từ đầu.

## Detailed Answer (EN)
`onSaveInstanceState()` is a callback that saves transient UI state (like scroll position) before the activity is destroyed due to configuration changes. The Bundle is passed to `onCreate()` or `onRestoreInstanceState()`. This is different from permanent storage like SharedPreferences or database. Use it for temporary state that's cheap to save but better than recreating UI from scratch.
