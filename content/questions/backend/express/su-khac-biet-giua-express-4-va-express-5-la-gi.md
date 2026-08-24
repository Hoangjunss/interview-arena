---
id: su-khac-biet-giua-express-4-va-express-5-la-gi
position: backend
technology: express
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa Express 4 và Express 5 là gì?

## Question (EN)
What are the differences between Express 4 and Express 5?

## Đáp án chi tiết (VI)
Express 5 tự động forward async errors đến error handler — không cần try/catch hay asyncHandler wrapper; path matching cải tiến và một số breaking routing syntax changes so với v4. Express 5 (stable 2024): async error handling tự động (throw trong async route tự chuyển đến error handler, không cần try/catch), path matching cải tiến, một số breaking changes về routing syntax.\
\
Breaking changes từ v4: `app.router` bị xóa (mount router trực tiếp), regex path không dùng thẳng mà qua `path-to-regexp`, `req.param()` bị xóa (dùng `req.params.name`). Express 4 yêu cầu wrap async routes với try/catch hoặc dùng `express-async-handler`. Thực tế migration: thay toàn bộ `asyncHandler(fn)` wrapper bằng async route thẳng, kiểm tra path patterns với regex, update `req.param()` calls.

## Detailed Answer (EN)
Express 5 automatically forwards async errors to the error handler — no try/catch or asyncHandler wrapper needed; improved path matching and some breaking routing syntax changes from v4. Express 5 (stable 2024): automatic async error handling (throwing inside an async route automatically forwards to the error handler without try/catch), improved path matching, and some breaking changes to routing syntax.\
\
Breaking changes from v4: `app.router` removed (mount router directly), regex paths no longer accepted inline (use path-to-regexp), `req.param()` removed (use `req.params.name`). Express 4 requires wrapping async routes with try/catch or using `express-async-handler`. Migration in practice: replace all `asyncHandler(fn)` wrappers with direct async routes, check regex path patterns, update `req.param()` calls.
