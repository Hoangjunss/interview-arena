---
id: cac-loai-context-trong-android-khac-nhau-the-nao-vi-sao-de-gay-ro-ri-bo-nho
position: backend
technology: fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các loại Context trong Android khác nhau thế nào? Vì sao dễ gây rò rỉ bộ nhớ?

## Question (EN)
How do Android Context types differ and why can they cause memory leaks?

## Đáp án chi tiết (VI)
`Context` là cầu nối tới tài nguyên và dịch vụ hệ thống (resource, khởi Activity, truy cập DB...). Hai loại thường gặp:\
\
- **Application Context**: sống theo **toàn app**. Dùng cho thứ cần tồn tại lâu hơn một màn (singleton, database, WorkManager).\
- **Activity Context**: gắn với **một Activity**, chứa thông tin theme/UI. Dùng cho việc liên quan UI (inflate layout, hiện dialog).\
\
Vì sao rò rỉ:\
- Nếu giữ **Activity Context** trong một object sống lâu (singleton, static, ViewModel), Activity không được GC dù đã bị hủy → **rò rỉ bộ nhớ**.\
- Quy tắc: việc lâu dài dùng Application Context; việc UI dùng Activity Context; **không** để ViewModel/static giữ Activity/View.\
\
Hay hỏi: khi nào không được dùng Application Context (những thao tác cần theme UI như hiện dialog).

## Detailed Answer (EN)
`Context` bridges to resources and system services (resources, starting Activities, DB access...). Two common types:\
\
- **Application Context**: lives for the **whole app**. Use it for things that must outlive a screen (singletons, database, WorkManager).\
- **Activity Context**: tied to **one Activity**, carries theme/UI info. Use it for UI work (inflating layouts, showing dialogs).\
\
Why leaks happen:\
- Holding an **Activity Context** in a long-lived object (singleton, static, ViewModel) prevents the destroyed Activity from being GC'd → **memory leak**.\
- Rule: long-lived work uses the Application Context; UI work uses the Activity Context; **never** let a ViewModel/static hold an Activity/View.\
\
Common ask: when you cannot use the Application Context (operations needing a UI theme, like showing a dialog).
