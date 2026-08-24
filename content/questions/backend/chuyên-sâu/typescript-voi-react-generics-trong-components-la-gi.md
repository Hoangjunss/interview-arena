---
id: typescript-voi-react-generics-trong-components-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TypeScript với React: generics trong components là gì?

## Question (EN)
What are generics in React components in TypeScript?

## Đáp án chi tiết (VI)
Generic components cho phép reuse component với nhiều kiểu data. Trong .tsx cần disambiguate `\u003cT,\u003e` hoặc `\u003cT extends unknown\u003e` vì `\u003cT\u003e` bị hiểu là JSX tag. TS 5.4+ thêm `NoInfer\u003cT\u003e` utility để kiểm soát inference tốt hơn.\
\
```typescript\
function Select\u003cT\u003e({ options, value, onChange }: {\
  options: T[];\
  value: T;\
  onChange: (v: T) =\u003e void;\
}) {\
  return \u003cselect\u003e...\u003c/select\u003e;\
}\
// Dùng:\
\u003cSelect\u003cUser\u003e options={users} value={selected} onChange={setSelected} /\u003e\
```

## Detailed Answer (EN)
Generic components let you reuse a component with multiple data types. In .tsx files you must disambiguate `\u003cT,\u003e` or `\u003cT extends unknown\u003e` because `\u003cT\u003e` is parsed as a JSX tag. TS 5.4+ adds `NoInfer\u003cT\u003e` utility for more control over inference.\
\
```typescript\
function Select\u003cT\u003e({ options, value, onChange }: {\
  options: T[];\
  value: T;\
  onChange: (v: T) =\u003e void;\
}) {\
  return \u003cselect\u003e...\u003c/select\u003e;\
}\
// Usage:\
\u003cSelect\u003cUser\u003e options={users} value={selected} onChange={setSelected} /\u003e\
```
