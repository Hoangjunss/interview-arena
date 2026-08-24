---
id: useid-sinh-ra-de-lam-gi-vi-sao-khong-tu-sinh-id-bang-math-random-hay-bien-dem-to
position: backend
technology: useid
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`useId` sinh ra để làm gì? Vì sao không tự sinh id bằng `Math.random()` hay biến đếm toàn cục?

## Question (EN)
What is `useId` for, and why not generate ids with `Math.random()` or a global counter?

## Đáp án chi tiết (VI)
`useId` tạo một **chuỗi id duy nhất và ổn định** để nối `\u003clabel htmlFor\u003e` với `\u003cinput id\u003e`, hoặc để gắn `aria-describedby`, `aria-labelledby`.\
\
```jsx\
function PasswordField() {\
  const id = useId()\
  return (\
    \u003c\u003e\
      \u003clabel htmlFor={id}\u003ePassword\u003c/label\u003e\
      \u003cinput id={id} type=\\"password\\" aria-describedby={id + '-hint'} /\u003e\
      \u003cp id={id + '-hint'}\u003eAt least 8 characters\u003c/p\u003e\
    \u003c/\u003e\
  )\
}\
```\
\
Vì sao không tự sinh:\
\
- `Math.random()` cho **giá trị khác nhau giữa server và client** → hydration mismatch, React cảnh báo và phải render lại phần đó.\
- Biến đếm toàn cục phụ thuộc **thứ tự component được render**, mà thứ tự này khác nhau giữa SSR và client (streaming, Suspense) nên cũng lệch.\
- `useId` được React sinh theo **vị trí trong cây component**, nên server và client ra cùng kết quả.\
\
Lưu ý: `useId` **không** dùng để làm `key` cho danh sách — key phải đến từ dữ liệu (id trong database).

## Detailed Answer (EN)
`useId` produces a **unique, stable id string** for wiring `\u003clabel htmlFor\u003e` to `\u003cinput id\u003e`, or for `aria-describedby` / `aria-labelledby`.\
\
```jsx\
function PasswordField() {\
  const id = useId()\
  return (\
    \u003c\u003e\
      \u003clabel htmlFor={id}\u003ePassword\u003c/label\u003e\
      \u003cinput id={id} type=\\"password\\" aria-describedby={id + '-hint'} /\u003e\
      \u003cp id={id + '-hint'}\u003eAt least 8 characters\u003c/p\u003e\
    \u003c/\u003e\
  )\
}\
```\
\
Why not roll your own:\
\
- `Math.random()` yields **different values on server and client** → hydration mismatch, React warns and re-renders that subtree.\
- A global counter depends on **the order components render**, and that order differs between SSR and client (streaming, Suspense), so it drifts too.\
- `useId` derives the id from the **component position in the tree**, so server and client agree.\
\
Note: `useId` is **not** for list `key`s — keys must come from your data (a database id).
