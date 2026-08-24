---
id: phan-biet-explicit-intent-va-implicit-intent
position: backend
technology: intents
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt explicit intent và implicit intent?

## Question (EN)
What is the difference between explicit and implicit intents?

## Đáp án chi tiết (VI)
`Intent` là đối tượng mô tả một thao tác cần thực hiện (mở màn hình, chạy service, gửi broadcast).\
\
- **Explicit intent**: chỉ đích danh **component cụ thể** bằng tên class/package (ví dụ mở `DetailActivity` trong chính app). Dùng khi biết chính xác cần gọi cái gì — điều hướng nội bộ.\
- **Implicit intent**: **không nêu component**, chỉ khai báo **action + data + category** (ví dụ `ACTION_VIEW` một URL). Hệ thống tìm mọi app có `intent-filter` khớp và để người dùng chọn (chooser). Dùng để nhờ app khác xử lý — mở web, gọi điện, chia sẻ ảnh.\
\
Lưu ý: implicit intent nên kiểm tra có app xử lý được không; và cân nhắc `android:exported` cho bảo mật khi nhận intent từ app khác.

## Detailed Answer (EN)
An `Intent` is an object describing an operation to perform (open a screen, start a service, send a broadcast).\
\
- **Explicit intent**: names a **specific component** by class/package (e.g. open `DetailActivity` in your own app). Use it when you know exactly what to invoke — internal navigation.\
- **Implicit intent**: **names no component**, only declares an **action + data + category** (e.g. `ACTION_VIEW` a URL). The system finds every app with a matching `intent-filter` and lets the user pick (chooser). Use it to have another app handle something — open web, dial, share a photo.\
\
Note: implicit intents should check that a handler exists; and consider `android:exported` for security when receiving intents from other apps.
