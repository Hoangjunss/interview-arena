---
id: future-wait-la-gi-va-khi-nao-dung
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Future.wait()` là gì và khi nào dùng?

## Question (EN)
What is `Future.wait()` and when do you use it?

## Đáp án chi tiết (VI)
`Future.wait()` chờ nhiều Future hoàn thành, sau đó trả về list kết quả: `List results = await Future.wait([future1, future2, future3])`. Nếu bất kỳ Future nào throw, toàn bộ `wait()` sẽ throw. Dùng cho các tác vụ song song: fetch nhiều API endpoint cùng lúc, load nhiều asset. Hiệu quả hơn việc gọi `await` tuần tự vì các tác vụ chạy đồng thời. Với Dart 3, có thể dùng cú pháp record extension ngắn gọn hơn: `await (future1, future2).wait` cho fixed-count parallel futures.

## Detailed Answer (EN)
`Future.wait()` waits for multiple futures to complete then returns a list of results. If any future throws, the entire `wait()` throws. Use for parallel operations like fetching multiple API endpoints simultaneously — more efficient than sequential `await` calls.
