---
id: cu-phap-async-await-trong-dart-hoat-dong-nhu-the-nao
position: backend
technology: dart-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cú pháp `async`/`await` trong Dart hoạt động như thế nào?

## Question (EN)
What is the `async`/`await` syntax in Dart?

## Đáp án chi tiết (VI)
`async` đánh dấu hàm là bất đồng bộ; `await` tạm dừng thực thi cho đến khi `Future` hoàn thành. Điều này giúp code bất đồng bộ đọc dễ như code đồng bộ. `await` chỉ hoạt động trong hàm `async`.\
\
```dart\
Future\u003cString\u003e fetchData() async {\
  String data = await api.get();\
  return data;\
}\
```

## Detailed Answer (EN)
`async` marks a function as asynchronous; `await` pauses execution until a `Future` completes. This makes async code readable like synchronous code. Both must be used together — `await` only works inside `async` functions.
