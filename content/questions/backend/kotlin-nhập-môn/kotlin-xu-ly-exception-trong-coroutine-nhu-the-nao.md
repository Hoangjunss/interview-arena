---
id: kotlin-xu-ly-exception-trong-coroutine-nhu-the-nao
position: backend
technology: kotlin-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kotlin xử lý exception trong coroutine như thế nào?

## Question (EN)
How does Kotlin handle exception handling in coroutines?

## Đáp án chi tiết (VI)
Bạn có thể dùng try-catch thông thường bên trong coroutine để xử lý exception cục bộ. Với exception không được bắt, dùng `CoroutineExceptionHandler` để bắt ở cấp coroutine scope. `viewModelScope` dùng SupervisorJob nên coroutine con thất bại không hủy coroutine anh em, nhưng exception không được bắt sẽ KHÔNG tự động được log — chúng sẽ crash coroutine đó trong im lặng trừ khi bạn thêm `CoroutineExceptionHandler` hoặc try-catch. Structured concurrency đảm bảo exception trong coroutine con được truyền lên đúng cách cho scope cha.

## Detailed Answer (EN)
You can use standard try-catch blocks within coroutines to handle exceptions locally. For uncaught exceptions, use `CoroutineExceptionHandler` at the coroutine scope level. `viewModelScope` uses SupervisorJob so child coroutine failures do not cancel siblings, but uncaught exceptions are NOT automatically logged — they crash the coroutine silently unless you add a `CoroutineExceptionHandler` or try-catch. Structured concurrency ensures exceptions in child coroutines are properly propagated to the parent scope.
