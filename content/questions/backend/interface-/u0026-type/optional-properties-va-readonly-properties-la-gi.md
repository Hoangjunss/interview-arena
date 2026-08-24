---
id: optional-properties-va-readonly-properties-la-gi
position: backend
technology: interface-\u0026-type
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Optional properties (?) và readonly properties là gì?

## Question (EN)
What are optional properties (?) and readonly properties?

## Đáp án chi tiết (VI)
Optional property (prop?: Type) có thể có hoặc không, type là Type | undefined khi access. Khác với `prop: Type | undefined` — cái sau vẫn yêu cầu key có mặt khi tạo object. readonly property không thể reassign sau khởi tạo (chỉ compile time). `Readonly\u003cT\u003e` làm tất cả properties readonly.\
\
```typescript\
interface User {\
  id: number;\
  nickname?: string;          // caller có thể bỏ qua\
  bio: string | undefined;    // caller phải cung cấp key, nhưng value có thể undefined\
  readonly createdAt: Date;   // không thể reassign\
}\
```

## Detailed Answer (EN)
Optional property (prop?: Type) may or may not be present; the type is `Type | undefined` when accessed. Unlike `prop: Type | undefined` — the latter still requires the key to be present when constructing the object. readonly property cannot be reassigned after initialization (compile time only). `Readonly\u003cT\u003e` makes all properties readonly.\
\
```typescript\
interface User {\
  id: number;\
  nickname?: string;          // caller can omit it\
  bio: string | undefined;    // caller must provide key, but value can be undefined\
  readonly createdAt: Date;   // cannot be reassigned\
}\
```
