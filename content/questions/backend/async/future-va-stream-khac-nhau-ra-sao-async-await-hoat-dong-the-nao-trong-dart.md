---
id: future-va-stream-khac-nhau-ra-sao-async-await-hoat-dong-the-nao-trong-dart
position: backend
technology: async
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Future và Stream khác nhau ra sao? async/await hoạt động thế nào trong Dart?

## Question (EN)
How do Future and Stream differ, and how do async/await work in Dart?

## Đáp án chi tiết (VI)
- **Future**: đại diện **một** giá trị sẽ có trong tương lai (thành công hoặc lỗi). Ví dụ: một request HTTP.\
- **Stream**: đại diện **chuỗi nhiều** giá trị theo thời gian (0..n sự kiện). Ví dụ: dữ liệu WebSocket, sự kiện chạm, thay đổi DB.\
\
`async/await`:\
- Hàm gắn `async` trả về một `Future`; `await` **tạm dừng** hàm cho tới khi Future hoàn tất rồi lấy giá trị, viết bất đồng bộ trông như đồng bộ.\
- Bắt lỗi bằng `try/catch`.\
- Với Stream, duyệt bằng `await for` hoặc `.listen()`.\
\
Trong UI, `FutureBuilder`/`StreamBuilder` dựng lại widget theo trạng thái của Future/Stream.

## Detailed Answer (EN)
- **Future**: represents **one** value arriving later (success or error). E.g. an HTTP request.\
- **Stream**: represents a **sequence of many** values over time (0..n events). E.g. WebSocket data, touch events, DB changes.\
\
`async/await`:\
- An `async` function returns a `Future`; `await` **pauses** the function until the Future completes and unwraps its value, making async code read like sync.\
- Handle errors with `try/catch`.\
- For Streams, iterate with `await for` or `.listen()`.\
\
In the UI, `FutureBuilder`/`StreamBuilder` rebuild a widget from the Future/Stream state.
