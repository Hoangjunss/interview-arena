---
id: vi-sao-nen-select-sang-dto-thay-vi-tra-thang-entity-tu-web-api
position: backend
technology: querying
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên `Select` sang DTO thay vì trả thẳng entity từ Web API?

## Question (EN)
Why should you `Select` into a DTO instead of returning entities straight from a Web API?

## Đáp án chi tiết (VI)
Hai lý do, một về hiệu năng và một về hợp đồng API.\
\
**Hiệu năng:** trả entity buộc EF `SELECT` toàn bộ cột, kể cả `Description` dài hay cột `byte[]` không ai dùng. Projection sinh SQL chỉ lấy cột cần và **không đưa entity vào change tracker**, nên nhẹ hơn hẳn.\
\
```csharp\
var items = await db.Orders\
    .Where(o =\u003e o.CustomerId == id)\
    .Select(o =\u003e new OrderSummaryDto(o.Id, o.Total, o.Customer.Name))\
    .ToListAsync();\
```\
\
**Hợp đồng API:** entity là mô hình của DB, DTO là mô hình của API. Trả entity làm rò rỉ cột nội bộ (`PasswordHash`, `IsDeleted`, khoá ngoại) và biến mọi thay đổi schema thành breaking change cho client. Ngoài ra navigation property hai chiều dễ gây vòng lặp khi serialize JSON.\
\
Lưu ý: projection cho ra object **không được track**, nên chỉ hợp cho luồng đọc. Khi cần cập nhật thì query entity bình thường.

## Detailed Answer (EN)
Two reasons: performance and API contract.\
\
**Performance:** returning entities forces EF to `SELECT` every column, including a long `Description` or a `byte[]` nobody uses. A projection emits SQL that reads only the needed columns and **does not put anything in the change tracker**, so it is far cheaper.\
\
```csharp\
var items = await db.Orders\
    .Where(o =\u003e o.CustomerId == id)\
    .Select(o =\u003e new OrderSummaryDto(o.Id, o.Total, o.Customer.Name))\
    .ToListAsync();\
```\
\
**API contract:** the entity models the database; the DTO models the API. Returning entities leaks internal columns (`PasswordHash`, `IsDeleted`, foreign keys) and turns every schema change into a breaking change for clients. Two-way navigation properties also tend to produce cycles during JSON serialization.\
\
Note: projected objects are **not tracked**, so this fits read paths only. When you need to update, query the entity normally.
