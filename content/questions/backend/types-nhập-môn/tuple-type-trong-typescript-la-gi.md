---
id: tuple-type-trong-typescript-la-gi
position: backend
technology: types-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tuple type trong TypeScript là gì?

## Question (EN)
What is a tuple type in TypeScript?

## Đáp án chi tiết (VI)
Tuple là array với số lượng và kiểu phần tử cố định. Phần tử có thể có tên. Hỗ trợ optional (?) và rest elements. Thường dùng cho function return nhiều giá trị, CSV rows, React useState.\
\
```typescript\
type Point = [number, number];\
type Entry = [key: string, value: number]; // named elements\
\
const [count, setCount]: [number, React.Dispatch\u003cReact.SetStateAction\u003cnumber\u003e\u003e]\
  = useState(0);\
\
// Hoặc đơn giản hơn:\
const pair: [string, number] = ['age', 25];\
```

## Detailed Answer (EN)
A tuple is an array with a fixed number and type of elements. Elements can have names. Supports optional (?) and rest elements. Commonly used for functions returning multiple values, CSV rows, and React useState.\
\
```typescript\
type Point = [number, number];\
type Entry = [key: string, value: number]; // named elements\
\
const [count, setCount]: [number, React.Dispatch\u003cReact.SetStateAction\u003cnumber\u003e\u003e]\
  = useState(0);\
\
// Simpler example:\
const pair: [string, number] = ['age', 25];\
```
