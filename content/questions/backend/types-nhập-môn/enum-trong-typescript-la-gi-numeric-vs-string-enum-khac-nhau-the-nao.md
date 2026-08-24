---
id: enum-trong-typescript-la-gi-numeric-vs-string-enum-khac-nhau-the-nao
position: backend
technology: types-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Enum trong TypeScript là gì? Numeric vs string enum khác nhau thế nào?

## Question (EN)
What are enums in TypeScript? How do numeric and string enums differ?

## Đáp án chi tiết (VI)
Enum khai báo tập hợp named constants. Numeric enum tự động assign 0,1,2... có reverse lookup nhưng gây footgun (Direction[0] = 'Up'). String enum cần gán tường minh, dễ debug hơn, không có reverse lookup.\
\
```typescript\
enum Direction { Up, Down } // numeric: Up=0, Down=1\
Direction[0] // \\"Up\\" — reverse lookup\
\
enum Status { Active = 'ACTIVE', Inactive = 'INACTIVE' } // string\
\
// Lưu ý 2024+: TS community khuyến nghị dùng const object thay enum\
// vì tree-shaking tốt hơn và không sinh runtime code thừa\
const Direction = { Up: 'up', Down: 'down' } as const;\
type Direction = typeof Direction[keyof typeof Direction];\
```

## Detailed Answer (EN)
Enums declare a set of named constants. Numeric enums auto-assign 0, 1, 2... and support reverse lookup, but reverse lookup is a common footgun. String enums require explicit string values, are easier to debug, and have no reverse lookup.\
\
```typescript\
enum Direction { Up, Down } // numeric: Up=0, Down=1\
Direction[0] // \\"Up\\" — reverse lookup\
\
enum Status { Active = 'ACTIVE', Inactive = 'INACTIVE' } // string\
\
// Note 2024+: TS community recommends const objects over enums\
// for better tree-shaking and no runtime overhead\
const Direction = { Up: 'up', Down: 'down' } as const;\
type Direction = typeof Direction[keyof typeof Direction];\
```
