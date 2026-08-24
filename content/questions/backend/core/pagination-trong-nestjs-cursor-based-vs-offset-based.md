---
id: pagination-trong-nestjs-cursor-based-vs-offset-based
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pagination trong NestJS — Cursor-based vs Offset-based?

## Question (EN)
Pagination in NestJS — Cursor-based vs Offset-based?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
**Offset-based**: simple, supports random page access:\
```typescript\
const [data, total] = await this.repo.findAndCount({ take: limit, skip: (page-1)*limit });\
```\
Downside: unstable when data changes, slow with large skip.\
\
**Cursor-based**: stable for real-time feeds, scales better:\
```typescript\
const data = await this.repo.find({\
  where: { createdAt: LessThan(new Date(decodedCursor)) },\
  take: limit + 1,\
});\
```\
\
Use offset for: admin dashboards, search. Use cursor for: social feeds, infinite scroll.
