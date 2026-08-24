---
id: conditional-types-voi-distributive-behavior-la-gi-cach-disable
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Conditional types với distributive behavior là gì? Cách disable?

## Question (EN)
What is the distributive behavior of conditional types? How do you disable it?

## Đáp án chi tiết (VI)
Distributive conditional types xảy ra khi type parameter T đứng trơn (naked) trong điều kiện extends: TypeScript sẽ tự động tách union ra và áp dụng điều kiện cho từng thành phần, ví dụ (A | B) extends U ? X : Y sẽ thành (A extends U ? X : Y) | (B extends U ? X : Y). Hành vi này thường gây kết quả bất ngờ, ví dụ type `IsNever\u003cT\u003e` = T extends never ? true : false sẽ trả về never thay vì true khi T = never vì union rỗng không có phần tử nào để distribute. Để disable distributive behavior, ta wrap type parameter trong tuple: [T] extends [U] ? X : Y, lúc này TypeScript sẽ so sánh toàn bộ union như một khối thay vì phân tách từng thành phần.

## Detailed Answer (EN)
Distributive conditional types occur when a type parameter T appears naked (unwrapped) in the extends condition: TypeScript automatically splits unions and applies the condition to each member, so `(A | B) extends U ? X : Y` becomes `(A extends U ? X : Y) | (B extends U ? X : Y)`. This often produces unexpected results, for example `type IsNever\u003cT\u003e = T extends never ? true : false` returns never instead of true when T = never because the empty union has no members to distribute over. To disable distributive behavior, wrap the type parameter in a tuple: `[T] extends [U] ? X : Y`, which causes TypeScript to compare the entire union as a block rather than splitting it into parts.
