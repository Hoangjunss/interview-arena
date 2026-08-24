---
id: giai-thich-request-lifecycle-trong-nestjs-middleware-guards-interceptors-pipes-c
position: backend
technology: request-pipeline
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích Request Lifecycle trong NestJS: Middleware → Guards → Interceptors → Pipes → Controller → Exception Filters.

## Question (EN)
Explain the NestJS Request Lifecycle: Middleware → Guards → Interceptors → Pipes → Controller → Exception Filters.

## Đáp án chi tiết (VI)
NestJS xử lý request qua pipeline theo thứ tự cố định: Middleware chạy đầu tiên (logging, CORS, session — access raw req/res), tiếp theo Guards kiểm tra authorization (trả về `true`/`false`), rồi Interceptors pre-processing (transform request trước khi vào handler), sau đó Pipes validate và transform input data, tiếp theo Controller Handler thực thi business logic chính, rồi Interceptors post-processing (transform response), cuối cùng Exception Filters bắt và format errors thành response chuẩn.\
\
Middleware và Guards đều chạy trước handler nhưng Guards có access vào `ExecutionContext` nên biết handler nào sẽ được gọi. Exception Filters chỉ hoạt động khi có exception, nếu không có lỗi thì bỏ qua. Mỗi layer có thể áp dụng theo thứ tự: global → controller → route.

## Detailed Answer (EN)
NestJS processes requests through a fixed-order pipeline: Middleware runs first (logging, CORS, session — accesses raw req/res), then Guards check authorization (return `true`/`false`), then Interceptors pre-process (transform request before handler), then Pipes validate and transform input data, then the Controller Handler executes main business logic, then Interceptors post-process (transform response), and finally Exception Filters catch and format errors.\
\
Middleware and Guards both run before the handler, but Guards have access to `ExecutionContext` so they know which handler will be called. Exception Filters only activate when an exception is thrown. Each layer can be applied in order: global → controller → route.
