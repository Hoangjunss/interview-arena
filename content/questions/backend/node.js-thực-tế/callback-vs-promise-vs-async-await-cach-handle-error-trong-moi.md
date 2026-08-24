---
id: callback-vs-promise-vs-async-await-cach-handle-error-trong-moi
position: backend
technology: node.js-thực-tế
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Callback vs Promise vs async/await. Cách handle error trong mỗi?

## Question (EN)
Callback vs Promise vs async/await. How do you handle errors in each?

## Đáp án chi tiết (VI)
Callback là cách xử lý bất đồng bộ đầu tiên trong JavaScript, nhưng dễ dẫn đến callback hell khi lồng nhiều tầng và khó xử lý lỗi vì phải kiểm tra error ở mỗi callback. Promise cải thiện bằng cách dùng .then() để chain và .catch() để bắt lỗi tập trung, nhưng vẫn có thể dài dòng. Async/await là cú pháp mới nhất, dùng try/catch để bắt lỗi giống code đồng bộ, dễ đọc và debug nhất. Khuyến nghị: dùng async/await làm mặc định, Promise.all() khi cần chạy song song nhiều request, và Promise.allSettled() khi muốn biết kết quả của tất cả request dù có lỗi.

## Detailed Answer (EN)
Callbacks are the original async pattern but lead to callback hell when deeply nested, and error handling requires checking at every callback level. Promises improve this with `.then()` chaining and centralized `.catch()` for errors, though they can still be verbose. Async/await is the most readable: use try/catch to handle errors just like synchronous code. Recommendation: use async/await as the default; use `Promise.all()` to run multiple requests in parallel; use `Promise.allSettled()` when you need the results of all requests even if some fail.
