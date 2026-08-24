---
id: phan-biet-map-filter-reduce
position: backend
technology: javascript-cốt-lõi
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `map`, `filter`, `reduce`?

## Question (EN)
Difference between `map`, `filter`, and `reduce`?

## Đáp án chi tiết (VI)
Cả ba là method **thuần** (không sửa mảng gốc), trả về giá trị mới, hợp phong cách khai báo:\
\
- **`map`**: biến đổi **từng phần tử**, trả mảng **cùng độ dài**. `[1,2,3].map(x =\u003e x * 2)` → `[2,4,6]`.\
- **`filter`**: giữ phần tử thỏa điều kiện, trả mảng **ngắn hơn hoặc bằng**. `[1,2,3,4].filter(x =\u003e x % 2 === 0)` → `[2,4]`.\
- **`reduce`**: gộp cả mảng về **một giá trị** (số, object, thậm chí mảng) qua accumulator. `[1,2,3].reduce((acc, x) =\u003e acc + x, 0)` → `6`.\
\
Ghi nhớ:\
- `map`/`filter` thực chất viết được bằng `reduce` — `reduce` tổng quát nhất.\
- Luôn truyền **giá trị khởi tạo** cho `reduce` để tránh lỗi trên mảng rỗng.\
- `map` khác `forEach`: `map` trả mảng mới, `forEach` chỉ chạy side effect và trả `undefined`.

## Detailed Answer (EN)
All three are **pure** (they do not mutate the original), return a new value, and suit a declarative style:\
\
- **`map`**: transforms **each element**, returns a **same-length** array. `[1,2,3].map(x =\u003e x * 2)` → `[2,4,6]`.\
- **`filter`**: keeps elements matching a predicate, returns a **shorter-or-equal** array. `[1,2,3,4].filter(x =\u003e x % 2 === 0)` → `[2,4]`.\
- **`reduce`**: folds the whole array into **one value** (a number, object, even an array) via an accumulator. `[1,2,3].reduce((acc, x) =\u003e acc + x, 0)` → `6`.\
\
Remember:\
- `map`/`filter` can both be written with `reduce` — `reduce` is the most general.\
- Always pass an **initial value** to `reduce` to avoid errors on empty arrays.\
- `map` differs from `forEach`: `map` returns a new array, `forEach` only runs a side effect and returns `undefined`.
