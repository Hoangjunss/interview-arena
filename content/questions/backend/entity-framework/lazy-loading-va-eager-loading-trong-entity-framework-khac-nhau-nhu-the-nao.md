---
id: lazy-loading-va-eager-loading-trong-entity-framework-khac-nhau-nhu-the-nao
position: backend
technology: entity-framework
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lazy loading và eager loading trong Entity Framework khác nhau như thế nào?

## Question (EN)
What is the difference between lazy loading and eager loading in Entity Framework?

## Đáp án chi tiết (VI)
Lazy loading tự động tải related data khi được truy cập — `customer.Orders` kích hoạt một query khi truy cập. Cần bật qua `UseLazyLoadingProxies()`. Eager loading tải dữ liệu trước bằng `.Include(c =\u003e c.Orders)`, giảm số query. Explicit loading tải thủ công qua `.Load()`. Lazy loading tiện nhưng dễ gây N+1; eager loading có thể tải dữ liệu không cần thiết.

## Detailed Answer (EN)
Lazy loading automatically fetches related data when accessed — `customer.Orders` triggers a query on access, requiring `UseLazyLoadingProxies()`. Eager loading fetches upfront with `.Include(c =\u003e c.Orders)`, reducing query count. Explicit loading manually loads via `.Load()`. Lazy loading risks N+1 problems; eager loading may pull unneeded data.
