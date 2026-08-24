---
id: federation-giai-quyet-van-de-gi-va-khi-nao-dang-dung
position: backend
technology: kiến-trúc
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Federation giải quyết vấn đề gì và khi nào đáng dùng?

## Question (EN)
What problem does federation solve and when is it worth it?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
Federation **composes schemas from several services into one graph** for clients. Each team owns its part and deploys independently while a routing layer plans and merges results.\
\
```graphql\
# users service — owns the entity\
type User @key(fields: \\"id\\") { id: ID!, name: String! }\
\
# orders service — extends the same entity by key\
type User @key(fields: \\"id\\") { id: ID!, orders: [Order!]! }\
```\
\
The key mechanism is extending a type across services: a user service defines the user type with a key, and an order service adds an orders field to that same type.\
\
Operational cost: one query can produce several downstream calls, so latency and error handling grow more complex, and monitoring needs traces spanning the router and every subgraph.\
\
When it is worth it: several teams owning different data domains where one GraphQL service would become an organisational bottleneck. For a small team it adds substantial complexity without solving a real problem.
