---
id: cors-error-khi-goi-api-cach-xu-ly
position: backend
technology: debug-\u0026-scenario
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CORS error khi gọi API, cách xử lý?

## Question (EN)
You get a CORS error when calling an API. How do you handle it?

## Đáp án chi tiết (VI)
CORS (Cross-Origin Resource Sharing) là cơ chế bảo mật của browser ngăn chặn frontend gọi API từ domain khác nếu server không cho phép — ví dụ app chạy ở localhost:3000 gọi API ở localhost:8080 sẽ bị chặn. Cách fix đúng là backend thêm header `Access-Control-Allow-Origin` chỉ định domain được phép, hoặc dùng thư viện cors trong Express với whitelist origins cụ thể.\
\
Trong môi trường development, cấu hình proxy trong Vite (`server.proxy`) hoặc Next.js (`rewrites`) để requests đi qua cùng origin, tránh CORS hoàn toàn. Ở production, dùng API gateway hoặc reverse proxy như nginx để route requests.\
\
Tuyệt đối không dùng CORS disable browser extension vì nó chỉ tắt bảo mật phía client mà không giải quyết gốc vấn đề.

## Detailed Answer (EN)
CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks frontend requests to a different domain unless the server explicitly allows it — e.g., an app on localhost:3000 calling an API on localhost:8080 will be blocked. The correct fix is for the backend to add the `Access-Control-Allow-Origin` header with allowed origins, or use the cors middleware in Express with a specific origin whitelist. In development, configure a proxy in Vite (`server.proxy`) or Next.js (`rewrites`) to route requests through the same origin, avoiding CORS entirely. In production, use an API gateway or reverse proxy (nginx) for routing. Never use a CORS-disabling browser extension — it only disables client-side security without solving the root cause.
