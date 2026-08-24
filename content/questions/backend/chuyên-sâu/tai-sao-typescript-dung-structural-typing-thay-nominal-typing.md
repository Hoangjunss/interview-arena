---
id: tai-sao-typescript-dung-structural-typing-thay-nominal-typing
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao TypeScript dùng structural typing thay nominal typing?

## Question (EN)
Why does TypeScript use structural typing instead of nominal typing?

## Đáp án chi tiết (VI)
Structural typing (duck typing) kiểm tra shape/structure thay tên type. Hai types tương thích nếu có cùng properties. Phù hợp hơn với JavaScript (dynamic, object literal heavy). TypeScript kết hợp: structural làm mặc định + branded types cho nominal khi cần.\
\
Lưu ý: hai class khác tên nhưng cùng shape hoàn toàn có thể assign cho nhau — bất ngờ với devs từ Java/C#.\
\
```typescript\
class Dog { name: string; breed: string; constructor(n: string, b: string) { this.name = n; this.breed = b; } }\
class Cat { name: string; breed: string; constructor(n: string, b: string) { this.name = n; this.breed = b; } }\
\
const dog: Dog = new Cat('Luna', 'Siamese'); // OK — same shape!\
```

## Detailed Answer (EN)
Structural typing (duck typing) checks shape/structure rather than type names. Two types are compatible if they have the same properties. This fits JavaScript better (dynamic, object-literal heavy). TypeScript combines both: structural by default + branded types for nominal typing when needed.\
\
Surprising gotcha: two classes with different names but the same shape are freely assignable — unexpected for Java/C# developers.\
\
```typescript\
class Dog { name: string; breed: string; constructor(n: string, b: string) { this.name = n; this.breed = b; } }\
class Cat { name: string; breed: string; constructor(n: string, b: string) { this.name = n; this.breed = b; } }\
\
const dog: Dog = new Cat('Luna', 'Siamese'); // OK — same shape!\
```
