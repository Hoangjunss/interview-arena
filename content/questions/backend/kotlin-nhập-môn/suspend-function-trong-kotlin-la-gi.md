---
id: suspend-function-trong-kotlin-la-gi
position: backend
technology: kotlin-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Suspend function trong Kotlin là gì?

## Question (EN)
What are suspend functions in Kotlin?

## Đáp án chi tiết (VI)
Suspend function là hàm được đánh dấu bằng từ khóa `suspend`, có thể bị tạm dừng và tiếp tục bởi coroutine. Chúng chỉ có thể được gọi từ suspend function khác hoặc trong một coroutine scope. Suspend function là nền tảng của Kotlin coroutines, cho phép viết code bất đồng bộ theo kiểu tuần tự. Ví dụ điển hình là bất kỳ hàm nào được đánh dấu `suspend` bên trong `viewModelScope.launch {}`.

## Detailed Answer (EN)
Suspend functions are functions marked with the `suspend` keyword that can be paused and resumed by coroutines. They can only be called from other suspend functions or within a coroutine scope. Suspend functions are the building blocks of Kotlin coroutines, allowing you to write asynchronous code sequentially.
