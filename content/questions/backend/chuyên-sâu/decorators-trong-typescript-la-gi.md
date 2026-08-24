---
id: decorators-trong-typescript-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Decorators trong TypeScript là gì?

## Question (EN)
What are decorators in TypeScript?

## Đáp án chi tiết (VI)
Decorators là function đặc biệt apply lên class/method/property/accessor/parameter để modify behavior. Dùng @decorator syntax. TS 5.0+ hỗ trợ TC39 Stage 3 decorators natively (không cần flag). Legacy decorators (Angular, NestJS) vẫn dùng experimentalDecorators: true — hai loại không tương thích. Decorator factories: @Log() trả về decorator function.

## Detailed Answer (EN)
Decorators are special functions applied to classes/methods/properties/accessors/parameters to modify behavior. Use @decorator syntax. TS 5.0+ supports TC39 Stage 3 decorators natively (no flag needed). Legacy decorators (Angular, NestJS) still use experimentalDecorators: true — the two types are incompatible. Decorator factories: @Log() returns a decorator function.
