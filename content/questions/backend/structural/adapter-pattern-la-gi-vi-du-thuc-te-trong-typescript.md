---
id: adapter-pattern-la-gi-vi-du-thuc-te-trong-typescript
position: backend
technology: structural
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Adapter pattern là gì? Ví dụ thực tế trong TypeScript?

## Question (EN)
What is the Adapter pattern? Real-world example in TypeScript?

## Đáp án chi tiết (VI)
Adapter cho phép các interface incompatible làm việc cùng nhau bằng cách bọc một object trong wrapper cung cấp interface mà client kỳ vọng. Ví dụ thực tế: tích hợp third-party payment SDK:\
```typescript\
interface PaymentProvider {\
  charge(cents: number): Promise\u003cReceipt\u003e\
}\
\
class PayPalAdapter implements PaymentProvider {\
  constructor(private sdk: PayPalSDK) {}\
  charge(cents: number) {\
    return this.sdk.makePayment(cents / 100, 'USD')\
  }\
}\
```\
Hai loại Adapter: Object Adapter (composition, prefer này) và Class Adapter (multiple inheritance — không có trong TS/JS). Dùng khi: tích hợp legacy code hoặc third-party library có interface không phù hợp; khi không thể sửa source code của class cần adapt. Trong frontend, Adapter thường dùng để normalize API response format khác nhau về một schema thống nhất.

## Detailed Answer (EN)
Adapter allows incompatible interfaces to work together by wrapping an object in a wrapper that exposes the interface the client expects. Real-world example: integrating a third-party payment SDK:\
```typescript\
interface PaymentProvider {\
  charge(cents: number): Promise\u003cReceipt\u003e\
}\
\
class PayPalAdapter implements PaymentProvider {\
  constructor(private sdk: PayPalSDK) {}\
  charge(cents: number) {\
    return this.sdk.makePayment(cents / 100, 'USD')\
  }\
}\
```\
Two variants: Object Adapter (composition — preferred) and Class Adapter (multiple inheritance — not available in TS/JS). Use it when integrating legacy code or a third-party library whose interface doesn't match yours, or when you can't modify the source of the class being adapted. In frontend development, Adapter is often used to normalize different API response formats into a unified schema.
