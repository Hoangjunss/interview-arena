---
id: vi-sao-khong-nen-dat-v-if-va-v-for-tren-cung-mot-the-viet-lai-the-nao-cho-dung
position: backend
technology: template
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không nên đặt `v-if` và `v-for` trên cùng một thẻ? Viết lại thế nào cho đúng?

## Question (EN)
Why should you avoid putting `v-if` and `v-for` on the same element? How do you rewrite it?

## Đáp án chi tiết (VI)
Vì trong Vue 3, **`v-if` có độ ưu tiên cao hơn `v-for`** — điều kiện được đánh giá **trước**, nên nó **không nhìn thấy biến của vòng lặp**. Đoạn dưới ném lỗi vì `user` chưa tồn tại ở thời điểm `v-if` chạy:\
\
```vue\
\u003c!-- wrong: `user` is not defined yet --\u003e\
\u003cli v-for=\\"user in users\\" v-if=\\"user.isActive\\" :key=\\"user.id\\"\u003e\
  {{ user.name }}\
\u003c/li\u003e\
```\
\
Hai cách sửa:\
\
```vue\
\u003c!-- 1. filter in a computed (preferred) --\u003e\
\u003cli v-for=\\"user in activeUsers\\" :key=\\"user.id\\"\u003e{{ user.name }}\u003c/li\u003e\
\
\u003c!-- 2. wrap with \u003ctemplate v-for\u003e and put v-if inside --\u003e\
\u003ctemplate v-for=\\"user in users\\" :key=\\"user.id\\"\u003e\
  \u003cli v-if=\\"user.isActive\\"\u003e{{ user.name }}\u003c/li\u003e\
\u003c/template\u003e\
```\
\
Cách 1 tốt hơn về hiệu năng: `computed` được cache, danh sách lọc chỉ tính lại khi `users` đổi, còn đặt `v-if` trong vòng lặp thì mỗi lần re-render đều duyệt toàn bộ phần tử. Lưu ý `:key` phải gắn vào phần tử thật sự lặp — với `\u003ctemplate v-for\u003e` thì `:key` nằm trên `\u003ctemplate\u003e`.

## Detailed Answer (EN)
Because in Vue 3 **`v-if` has higher priority than `v-for`** — the condition is evaluated **first**, so it **cannot see the loop variable**. The snippet below throws because `user` does not exist yet when `v-if` runs:\
\
```vue\
\u003c!-- wrong: `user` is not defined yet --\u003e\
\u003cli v-for=\\"user in users\\" v-if=\\"user.isActive\\" :key=\\"user.id\\"\u003e\
  {{ user.name }}\
\u003c/li\u003e\
```\
\
Two fixes:\
\
```vue\
\u003c!-- 1. filter in a computed (preferred) --\u003e\
\u003cli v-for=\\"user in activeUsers\\" :key=\\"user.id\\"\u003e{{ user.name }}\u003c/li\u003e\
\
\u003c!-- 2. wrap with \u003ctemplate v-for\u003e and move v-if inside --\u003e\
\u003ctemplate v-for=\\"user in users\\" :key=\\"user.id\\"\u003e\
  \u003cli v-if=\\"user.isActive\\"\u003e{{ user.name }}\u003c/li\u003e\
\u003c/template\u003e\
```\
\
Option 1 also performs better: the `computed` is cached and only recalculates when `users` changes, whereas a `v-if` inside the loop re-evaluates every item on each render. Note `:key` must sit on the element actually being repeated — with `\u003ctemplate v-for\u003e` the key goes on the `\u003ctemplate\u003e`.
