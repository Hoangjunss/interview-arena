---
id: component-dung-zustand-bi-re-render-lien-tuc-tham-chi-lap-vo-han-khi-select-nhie
position: backend
technology: selector
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Component dùng Zustand bị re-render liên tục (thậm chí lặp vô hạn) khi select nhiều field. Nguyên nhân và cách sửa?

## Question (EN)
A component using Zustand re-renders constantly (or loops) when selecting several fields. Why, and how do you fix it?

## Đáp án chi tiết (VI)
Nguyên nhân: selector **trả về object/array mới mỗi lần chạy**. Zustand so sánh kết quả selector bằng `Object.is`, object mới luôn khác object cũ nên component re-render, selector lại chạy, tạo vòng lặp.\
\
```ts\
// sai: object literal mới mỗi lần → re-render không dừng\
const { name, age } = useUserStore(s =\u003e ({ name: s.name, age: s.age }))\
```\
\
Ba cách sửa:\
\
```ts\
// 1. tách từng field — mỗi selector trả về giá trị nguyên thuỷ\
const name = useUserStore(s =\u003e s.name)\
const age = useUserStore(s =\u003e s.age)\
\
// 2. useShallow khi cần gom nhiều field\
import { useShallow } from 'zustand/react/shallow'\
const { name, age } = useUserStore(useShallow(s =\u003e ({ name: s.name, age: s.age })))\
```\
\
Cách 3 là chỉ lấy đúng thứ cần: nếu chỉ gọi action, hãy select riêng action đó — action là hàm ổn định, không bao giờ gây re-render.\
\
Sai lầm thường thấy: `const state = useUserStore()` (không selector) — component subscribe **toàn bộ store**, mọi thay đổi ở bất kỳ field nào cũng làm nó render lại.

## Detailed Answer (EN)
$84
