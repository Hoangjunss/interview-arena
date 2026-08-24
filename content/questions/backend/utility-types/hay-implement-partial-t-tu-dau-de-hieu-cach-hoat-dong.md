---
id: hay-implement-partial-t-tu-dau-de-hieu-cach-hoat-dong
position: backend
technology: utility-types
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hãy implement `Partial\u003cT\u003e` từ đầu để hiểu cách hoạt động.

## Question (EN)
Implement `Partial\u003cT\u003e` from scratch to understand how it works.

## Đáp án chi tiết (VI)
Dùng mapped type iterate qua tất cả keys của T, thêm `?` để optional.\
```typescript\
// Partial\u003cT\u003e: tất cả optional\
type MyPartial\u003cT\u003e = {\
  [K in keyof T]?: T[K];\
};\
\
// Required\u003cT\u003e: dấu - xóa optional modifier\
type MyRequired\u003cT\u003e = {\
  [K in keyof T]-?: T[K];\
};\
\
// Readonly\u003cT\u003e\
type MyReadonly\u003cT\u003e = {\
  readonly [K in keyof T]: T[K];\
};\
\
// Pick\u003cT, K\u003e\
type MyPick\u003cT, K extends keyof T\u003e = {\
  [P in K]: T[P];\
};\
\
// Record\u003cK, V\u003e\
type MyRecord\u003cK extends keyof any, V\u003e = {\
  [P in K]: V;\
};\
\
// Kiểm tra\
type User = { id: number; name: string; email?: string };\
type PartialUser = MyPartial\u003cUser\u003e;\
// { id?: number; name?: string; email?: string }\
```\
Hiểu cách này giúp tạo custom utility types bất kỳ.

## Detailed Answer (EN)
Uses a mapped type to iterate over all keys of T and adds `?` to make them optional.\
```typescript\
// Partial\u003cT\u003e: all optional\
type MyPartial\u003cT\u003e = {\
  [K in keyof T]?: T[K];\
};\
\
// Required\u003cT\u003e: minus removes the optional modifier\
type MyRequired\u003cT\u003e = {\
  [K in keyof T]-?: T[K];\
};\
\
// Readonly\u003cT\u003e\
type MyReadonly\u003cT\u003e = {\
  readonly [K in keyof T]: T[K];\
};\
\
// Pick\u003cT, K\u003e\
type MyPick\u003cT, K extends keyof T\u003e = {\
  [P in K]: T[P];\
};\
\
// Record\u003cK, V\u003e\
type MyRecord\u003cK extends keyof any, V\u003e = {\
  [P in K]: V;\
};\
\
// Verify\
type User = { id: number; name: string; email?: string };\
type PartialUser = MyPartial\u003cUser\u003e;\
// { id?: number; name?: string; email?: string }\
```\
Understanding this helps you create any custom utility type.
