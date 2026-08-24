---
id: lam-the-nao-de-xu-ly-loi-va-exception-trong-code-dart-bat-dong-bo
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để xử lý lỗi và exception trong code Dart bất đồng bộ?

## Question (EN)
How do you handle errors and exceptions in async Dart code?

## Đáp án chi tiết (VI)
Dùng try-catch trong hàm async: `try { await api.get(); } catch (e, st) { logger.error(e, st); }`. Bọc `Future` chain bằng `.catchError()`: `future.catchError((e) =\u003e defaultValue)`. Với stream, truyền `onError` vào listen: `stream.listen(onData, onError: (e) =\u003e handle(e))`. Lan truyền lỗi lên trên; không im lặng nuốt chúng. Trong production, dùng crash reporting (e.g. FirebaseCrashlytics) thay vì `print(e)` — print chỉ phù hợp khi debug local. Lỗi không được xử lý sẽ crash app.

## Detailed Answer (EN)
Use try-catch inside async functions. Wrap `Future` chains with `.catchError()`. For streams, pass `onError` to the listen call. Always propagate errors up; never swallow them silently. Unhandled errors crash the app or get logged to crash reporting services.
