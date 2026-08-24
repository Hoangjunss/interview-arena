---
id: cach-type-props-cua-component-voi-typescript-dung-generics-va-discriminated-unio
position: backend
technology: typescript
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách type props của component với TypeScript dùng generics và discriminated-union? Giải thích khi nào cần mỗi cái.

## Question (EN)
How do you type component props in TypeScript using generics and discriminated unions? When is each needed?

## Đáp án chi tiết (VI)
Type props chặt giúp bắt lỗi ngay lúc gọi component.\
\
**Generics** — khi component làm việc với một kiểu dữ liệu *bất kỳ* mà vẫn giữ liên hệ giữa các prop. Ví dụ list nhận `items: T[]` và `renderItem: (item: T) =\u003e ...` — TS phải suy ra `T` từ `items` để `renderItem` được type đúng.\
\
```tsx\
function List\u003cT\u003e({ items, renderItem }: {\
  items: T[]\
  renderItem: (item: T) =\u003e React.ReactNode\
}) {\
  return \u003cul\u003e{items.map(renderItem)}\u003c/ul\u003e\
}\
```\
\
**Discriminated union** — khi props *thay đổi theo \\"chế độ\\"*, tránh kiểu \\"tất cả optional\\" cho phép combo vô lý. Một field `kind` làm discriminant, TS thu hẹp (narrow) các field còn lại.\
\
```tsx\
type Props =\
  | { variant: 'link'; href: string }\
  | { variant: 'button'; onClick: () =\u003e void }\
// Truyền variant='link' mà thiếu href → TS báo lỗi; onClick không tồn tại ở nhánh này.\
```\
\
**Lưu ý**: union này khiến `\u003cbutton\u003e` không thể vừa có `href` vừa có `onClick` — chính là cái ta muốn. Ngược lại nếu để cả hai optional, caller dễ truyền sai và lỗi chỉ lộ lúc runtime.

## Detailed Answer (EN)
Tight prop types catch mistakes at the call site.\
\
**Generics** — when a component works with *any* data type while preserving the relation between props. E.g. a list taking `items: T[]` and `renderItem: (item: T) =\u003e ...` — TS must infer `T` from `items` so `renderItem` is typed correctly.\
\
```tsx\
function List\u003cT\u003e({ items, renderItem }: {\
  items: T[]\
  renderItem: (item: T) =\u003e React.ReactNode\
}) {\
  return \u003cul\u003e{items.map(renderItem)}\u003c/ul\u003e\
}\
```\
\
**Discriminated union** — when props *change by \\"mode\\"*, avoiding the \\"all optional\\" type that allows nonsense combos. A `kind` field is the discriminant; TS narrows the rest.\
\
```tsx\
type Props =\
  | { variant: 'link'; href: string }\
  | { variant: 'button'; onClick: () =\u003e void }\
// variant='link' without href → TS errors; onClick doesn't exist on this branch.\
```\
\
**Note**: this union prevents a `\u003cbutton\u003e` from having both `href` and `onClick` — exactly what we want. Leaving both optional lets the caller pass the wrong combo and the bug only surfaces at runtime.
