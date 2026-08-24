---
id: observer-pattern-la-gi-va-duoc-dung-nhu-the-nao-trong-android
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Observer pattern là gì và được dùng như thế nào trong Android?

## Question (EN)
What is the Observer pattern and how is it used in Android?

## Đáp án chi tiết (VI)
Observer pattern cho phép các object (observer) đăng ký nhận thông báo về thay đổi trạng thái của object khác (subject). Trong Android, LiveData/StateFlow là các implementation của pattern này. Khi bạn gọi `observe()` hoặc `collect()`, bạn đang đăng ký làm observer. Khi dữ liệu thay đổi, tất cả observer được thông báo, decoupling nguồn dữ liệu khỏi UI.

## Detailed Answer (EN)
Observer pattern lets objects (observers) subscribe to state changes of another object (subject). In Android, LiveData/StateFlow are implementations. When you call `observe()` or `collect()`, you're registering as an observer. When data changes, all observers are notified. This pattern decouples the data source from UI, allowing multiple UIs to react to the same data.
