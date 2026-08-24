---
id: usememo-hook-dung-de-lam-gi-khi-nao-nen-dung
position: backend
technology: advanced-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useMemo hook dùng để làm gì? Khi nào nên dùng?

## Question (EN)
What is the useMemo hook for and when should you use it?

## Đáp án chi tiết (VI)
useMemo memoize kết quả tính toán tốn kém, chỉ tính lại khi dependencies thay đổi. Dùng khi có tính toán expensive mà không muốn chạy lại mỗi render, hoặc cần stable object reference. Không nên dùng quá mức vì có overhead riêng.\
```tsx\
const ProductList = ({ products, filter }: Props) =\u003e {\
  // tính toán chỉ chạy lại khi products hoặc filter thay đổi\
  const filtered = useMemo(\
    () =\u003e products.filter(p =\u003e p.category === filter),\
    [products, filter]\
  )\
\
  return \u003cul\u003e{filtered.map(p =\u003e \u003cli key={p.id}\u003e{p.name}\u003c/li\u003e)}\u003c/ul\u003e\
}\
```

## Detailed Answer (EN)
useMemo memoizes the result of an expensive computation, recalculating only when dependencies change. Use it when a calculation is costly and you want to skip it on every render, or you need a stable object reference for an effect or React.memo prop. Do not overuse it — memoization has its own overhead.\
```tsx\
const ProductList = ({ products, filter }: Props) =\u003e {\
  // recalculates only when products or filter changes\
  const filtered = useMemo(\
    () =\u003e products.filter(p =\u003e p.category === filter),\
    [products, filter]\
  )\
\
  return \u003cul\u003e{filtered.map(p =\u003e \u003cli key={p.id}\u003e{p.name}\u003c/li\u003e)}\u003c/ul\u003e\
}\
```
