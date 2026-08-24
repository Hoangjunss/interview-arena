---
id: viet-test-cho-mot-rest-endpoint-thi-nen-goi-thang-ham-handler-goi-http-in-proces
position: backend
technology: api-testing
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết test cho một REST endpoint thì nên gọi thẳng hàm handler, gọi HTTP in-process, hay dựng server thật?

## Question (EN)
When testing a REST endpoint, should you call the handler directly, send HTTP in-process, or spin up a real server?

## Đáp án chi tiết (VI)
Mặc định nên chọn **HTTP in-process**: khởi tạo app trong bộ nhớ rồi bắn request qua thư viện của framework (`supertest` với Express/Nest, `WebApplicationFactory` với ASP.NET, `MockMvc` với Spring). Không mở cổng, không cần server chạy nền, nhưng vẫn đi qua **routing, middleware, validation, serialize JSON, error handler** — đúng phần hay hỏng nhất.\
\
```js\
const res = await request(app)\
  .post('/api/orders')\
  .send({ productId: 10, quantity: 0 })\
\
expect(res.status).toBe(400)\
expect(res.body.error).toBe('quantity_must_be_positive')\
```\
\
So sánh:\
- **Gọi thẳng handler**: nhanh nhất nhưng bỏ qua middleware (auth, rate limit) và mapping status code. Chỉ hợp khi handler mỏng và logic đã nằm ở service.\
- **Server thật + HTTP client**: chậm, cần quản lý port và vòng đời process. Để dành cho vài kịch bản smoke/e2e cuối cùng.\
\
Quy tắc thực dụng: **logic nghiệp vụ test ở tầng service** (nhanh, nhiều case), **hợp đồng HTTP test ở tầng endpoint** (ít case nhưng bao được status code, shape response, lỗi 401/403/422).

## Detailed Answer (EN)
$89
