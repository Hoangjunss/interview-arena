---
id: cach-extend-interface-va-type-trong-typescript
position: backend
technology: interface-\u0026-type
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách extend interface và type trong TypeScript?

## Question (EN)
How do you extend interfaces and types in TypeScript?

## Đáp án chi tiết (VI)
Interface: interface Child extends Parent { ... } và extends nhiều: extends A, B. Type: type Combined = A \u0026 B (intersection). Interface có thể extend type và ngược lại.\
\
```typescript\
interface Animal { name: string }\
interface Pet extends Animal { owner: string }\
interface Named { label: string }\
\
interface RegisteredPet extends Pet, Named { id: number } // đa extends\
\
// Type intersection tương đương:\
type Combined = Pet \u0026 Named \u0026 { id: number };\
```\
\
extends kiểm tra compatibility (không thể re-declare incompatible property), còn \u0026 intersection merge tất cả.

## Detailed Answer (EN)
Interface: `interface Child extends Parent { ... }` and multiple extends: `extends A, B`. Type: `type Combined = A \u0026 B` (intersection). An interface can extend a type and vice versa.\
\
```typescript\
interface Animal { name: string }\
interface Pet extends Animal { owner: string }\
interface Named { label: string }\
\
interface RegisteredPet extends Pet, Named { id: number } // multi-extends\
\
// Type intersection equivalent:\
type Combined = Pet \u0026 Named \u0026 { id: number };\
```\
\
extends checks compatibility (you cannot re-declare an incompatible property), while \u0026 intersection merges everything.
