---
id: coroutine-la-gi-va-tai-sao-tot-hon-callback
position: backend
technology: kotlin-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Coroutine là gì và tại sao tốt hơn callback?

## Question (EN)
What are coroutines and why are they better than callbacks?

## Đáp án chi tiết (VI)
Coroutine là các hàm nhẹ có thể tạm dừng và tiếp tục, cho phép lập trình bất đồng bộ hiệu quả mà không block thread. Khác với callback dễ dẫn đến \\"callback hell\\

## Detailed Answer (EN)
Coroutines are lightweight functions that can be suspended and resumed, allowing efficient asynchronous programming without blocking threads. Unlike callbacks which lead to \\"callback hell,\\" coroutines let you write asynchronous code that looks sequential. A single thread can run thousands of coroutines due to suspension, saving memory and improving performance.
