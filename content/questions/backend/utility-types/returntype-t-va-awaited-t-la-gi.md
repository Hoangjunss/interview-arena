---
id: returntype-t-va-awaited-t-la-gi
position: backend
technology: utility-types
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ReturnType\u003cT\u003e` và `Awaited\u003cT\u003e` là gì?

## Question (EN)
What are `ReturnType\u003cT\u003e` and `Awaited\u003cT\u003e`?

## Đáp án chi tiết (VI)
`ReturnType\u003cT\u003e` lấy return type của function T mà không cần khai báo lại: `type Result = ReturnType\u003ctypeof fetchUser\u003e` tự động theo dõi khi hàm thay đổi. `Awaited\u003cT\u003e` unwrap Promise đệ quy: `Awaited\u003cPromise\u003cstring\u003e\u003e` cho ra `string`, `Awaited\u003cPromise\u003cPromise\u003cnumber\u003e\u003e\u003e` cho ra `number`. Kết hợp cả hai cho async functions: `type Data = Awaited\u003cReturnType\u003ctypeof fetchData\u003e\u003e`. Rất hữu ích trong large codebases để tránh type duplication và đảm bảo types luôn đồng bộ với implementation.

## Detailed Answer (EN)
`ReturnType\u003cT\u003e` extracts the return type of function T without re-declaring it: `type Result = ReturnType\u003ctypeof fetchUser\u003e` automatically stays up to date when the function changes. `Awaited\u003cT\u003e` recursively unwraps Promises: `Awaited\u003cPromise\u003cstring\u003e\u003e` gives `string`, `Awaited\u003cPromise\u003cPromise\u003cnumber\u003e\u003e\u003e` gives `number`. Combine both for async functions: `type Data = Awaited\u003cReturnType\u003ctypeof fetchData\u003e\u003e`. Very useful in large codebases to avoid type duplication and keep types in sync with implementations.
