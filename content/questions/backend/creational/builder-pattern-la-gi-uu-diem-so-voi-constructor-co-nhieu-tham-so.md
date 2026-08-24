---
id: builder-pattern-la-gi-uu-diem-so-voi-constructor-co-nhieu-tham-so
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Builder pattern là gì? Ưu điểm so với constructor có nhiều tham số?

## Question (EN)
What is the Builder pattern? What advantages does it have over constructors with many parameters?

## Đáp án chi tiết (VI)
Builder tách quá trình xây dựng object phức tạp thành các bước riêng biệt, cho phép tạo nhiều biểu diễn khác nhau của cùng một object. Ví dụ TypeScript với method chaining:\
```typescript\
const query = new QueryBuilder()\
  .select('*')\
  .from('users')\
  .where('age \u003e 18')\
  .orderBy('name')\
  .limit(10)\
  .build()\
// thay vì: new Query('*', 'users', 'age \u003e 18', 'name', 10, undefined, undefined)\
```\
Ưu điểm so với constructor nhiều tham số: không cần nhớ thứ tự tham số, tham số optional không cần truyền `undefined`, code readable hơn, có thể validate từng bước. Dùng khi: object có nhiều optional parameter (Telescoping Constructor anti-pattern); khi quá trình khởi tạo phức tạp có nhiều bước; khi cần tạo nhiều variant của cùng object. Trong Go, Builder thường implement bằng functional options pattern: `NewServer(WithPort(8080), WithTimeout(30*time.Second))`.

## Detailed Answer (EN)
Builder separates the construction of a complex object into discrete steps, enabling different representations of the same object. TypeScript example with method chaining:\
```typescript\
const query = new QueryBuilder()\
  .select('*')\
  .from('users')\
  .where('age \u003e 18')\
  .orderBy('name')\
  .limit(10)\
  .build()\
// instead of: new Query('*', 'users', 'age \u003e 18', 'name', 10, undefined, undefined)\
```\
Advantages over many-parameter constructors: no need to remember parameter order, optional parameters don't require passing `undefined`, code is more readable, and each step can be validated individually. Use it when an object has many optional parameters (Telescoping Constructor anti-pattern), when initialization involves multiple complex steps, or when you need to produce different variants of the same object. In Go, Builder is commonly implemented via the functional options pattern: `NewServer(WithPort(8080), WithTimeout(30*time.Second))`.
