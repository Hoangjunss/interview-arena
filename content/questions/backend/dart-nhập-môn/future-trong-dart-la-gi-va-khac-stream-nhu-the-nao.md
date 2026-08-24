---
id: future-trong-dart-la-gi-va-khac-stream-nhu-the-nao
position: backend
technology: dart-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Future` trong Dart là gì và khác `Stream` như thế nào?

## Question (EN)
What is a `Future` in Dart and how is it different from a `Stream`?

## Đáp án chi tiết (VI)
`Future` đại diện cho một giá trị bất đồng bộ duy nhất sẽ có trong tương lai — giống như một lời hứa cho một kết quả. `Stream` đại diện cho nhiều sự kiện bất đồng bộ theo thời gian — như một chuỗi các giá trị liên tục. Dùng `Future` cho tác vụ một lần (gọi API), dùng `Stream` cho dữ liệu liên tục (cảm biến, WebSocket).

## Detailed Answer (EN)
A `Future` represents a single asynchronous value that will be available in the future. A `Stream` represents multiple asynchronous events over time. Use `Future` for single operations like API calls, `Stream` for continuous data like sensor readings or WebSocket messages.
