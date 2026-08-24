---
id: open-closed-principle-ocp-la-gi-cho-vi-du-thuc-te
position: backend
technology: solid
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Open/Closed Principle (OCP) là gì? Cho ví dụ thực tế.

## Question (EN)
What is the Open/Closed Principle (OCP)? Give a real-world example.

## Đáp án chi tiết (VI)
OCP quy định một module phải mở để mở rộng nhưng đóng để sửa đổi — thêm tính năng mới mà không cần chỉnh sửa code hiện có.\
\
Ví dụ TypeScript:\
```typescript\
interface DiscountStrategy {\
  apply(price: number): number\
}\
class SeasonalDiscount implements DiscountStrategy {\
  apply(price: number) { return price * 0.8 }\
}\
class LoyaltyDiscount implements DiscountStrategy {\
  apply(price: number) { return price * 0.9 }\
}\
// Thêm loại discount mới: chỉ cần tạo class mới, không sửa calculatePrice()\
```\
\
OCP thường được triển khai qua Strategy pattern, Template Method hoặc polymorphism. Vi phạm OCP thường biểu hiện ở `switch/case` hay `if/else if` dài dần theo thời gian.

## Detailed Answer (EN)
OCP states that a module should be open for extension but closed for modification — add new features without changing existing code.\
\
TypeScript example:\
```typescript\
interface DiscountStrategy {\
  apply(price: number): number\
}\
class SeasonalDiscount implements DiscountStrategy {\
  apply(price: number) { return price * 0.8 }\
}\
class LoyaltyDiscount implements DiscountStrategy {\
  apply(price: number) { return price * 0.9 }\
}\
// New discount type: just add a class — no changes to calculatePrice()\
```\
\
OCP is typically implemented via Strategy pattern, Template Method, or polymorphism. Violations show up as `switch/case` or `if/else if` chains growing longer with every new feature.
