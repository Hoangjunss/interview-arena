---
id: record-k-v-la-gi-khac-index-signature-nhu-the-nao
position: backend
technology: utility-types
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Record\u003cK, V\u003e` là gì? Khác index signature như thế nào?

## Question (EN)
What is `Record\u003cK, V\u003e`? How does it differ from an index signature?

## Đáp án chi tiết (VI)
`Record\u003cKeys, Value\u003e` tạo object type với specific keys và value type. Khác index signature: Keys có thể là specific union (yêu cầu tất cả keys có mặt, không optional). Rõ ràng hơn và type-safe hơn index signature.\
\
```typescript\
const routes: Record\u003c'home' | 'about' | 'contact', string\u003e = {\
  home: '/',\
  about: '/about',\
  contact: '/contact', // thiếu key này → Error\
};\
\
// Dùng với string key rộng hơn:\
const cache: Record\u003cstring, unknown\u003e = {};\
```

## Detailed Answer (EN)
`Record\u003cKeys, Value\u003e` creates an object type with specific keys and a value type. Unlike index signatures: Keys can be a specific union (all keys must be present, none optional). Clearer and more type-safe than an index signature.\
\
```typescript\
const routes: Record\u003c'home' | 'about' | 'contact', string\u003e = {\
  home: '/',\
  about: '/about',\
  contact: '/contact', // missing this key → Error\
};\
\
// Wider string key:\
const cache: Record\u003cstring, unknown\u003e = {};\
```
