---
id: promise-va-callback-khac-nhau-the-nao-async-await-giai-quyet-gi
position: backend
technology: javascript-cốt-lõi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Promise và callback khác nhau thế nào? `async/await` giải quyết gì?

## Question (EN)
How do Promises differ from callbacks? What does `async/await` solve?

## Đáp án chi tiết (VI)
**Callback**: truyền hàm để gọi khi xong. Lồng nhiều callback bất đồng bộ → \\"callback hell\\": khó đọc, khó xử lý lỗi, đảo ngược quyền kiểm soát (inversion of control).\
\
**Promise**: object đại diện cho kết quả tương lai, có 3 trạng thái `pending → fulfilled | rejected`. Ưu điểm:\
- **Chain phẳng** bằng `.then`, gộp lỗi bằng một `.catch`.\
- Tổ hợp: `Promise.all` (chờ tất cả), `allSettled`, `race`, `any`.\
\
**`async/await`**: cú pháp trên Promise, viết code bất đồng bộ **trông như đồng bộ**:\
- `await` tạm dừng hàm `async` tới khi Promise settle.\
- Bắt lỗi bằng `try/catch` quen thuộc.\
- Cẩn thận: các `await` tuần tự chạy nối tiếp — muốn song song thì `await Promise.all([...])`.\
\
Hàm `async` luôn trả về Promise.

## Detailed Answer (EN)
**Callbacks**: pass a function to call when done. Nesting several async callbacks → \\"callback hell\\": hard to read, hard to handle errors, and inversion of control.\
\
**Promises**: an object representing a future result, with 3 states `pending → fulfilled | rejected`. Benefits:\
- **Flat chaining** with `.then`, unified errors with one `.catch`.\
- Combinators: `Promise.all` (wait for all), `allSettled`, `race`, `any`.\
\
**`async/await`**: syntax over Promises that makes async code **read like synchronous**:\
- `await` pauses the `async` function until the Promise settles.\
- Handle errors with familiar `try/catch`.\
- Watch out: sequential `await`s run one after another — for parallelism use `await Promise.all([...])`.\
\
An `async` function always returns a Promise.
