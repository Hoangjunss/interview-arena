---
id: match-case-structural-pattern-matching-3-10-khac-switch-truyen-thong-the-nao
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`match`-case (structural pattern matching, 3.10) khác `switch` truyền thống thế nào?

## Question (EN)
How does `match`-case (structural pattern matching, 3.10) differ from a traditional `switch`?

## Đáp án chi tiết (VI)
Không phải `switch` so-sánh-giá-trị đơn thuần. `match` **so khớp cấu trúc**: nó có thể destructure sequence/mapping/object, bắt biến từ bên trong, và thêm điều kiện `if` (guard). Trúng nhánh nào thì gán luôn các phần con vào biến.\
\
```python\
match point:\
    case (0, 0):        return \\"origin\\"\
    case (x, 0):        return f\\"x-axis at {x}\\"\
    case Point(x=x, y=y) if x == y:\
        return \\"diagonal\\"\
    case _:             return \\"other\\"\
```\
\
Khác biệt cần nhớ:\
- **Không fall-through** như C — khớp một `case` là dừng.\
- `case name` (tên trần) là **capture** (gán), **không** so với biến cùng tên. Muốn so với hằng phải dùng tên có dấu chấm (`Color.RED`) hoặc literal.

## Detailed Answer (EN)
It is not a plain value-comparing `switch`. `match` does **structural matching**: it can destructure sequences/mappings/objects, capture variables from inside them, and add an `if` guard. When a branch matches, its sub-parts are bound to variables.\
\
```python\
match point:\
    case (0, 0):        return \\"origin\\"\
    case (x, 0):        return f\\"x-axis at {x}\\"\
    case Point(x=x, y=y) if x == y:\
        return \\"diagonal\\"\
    case _:             return \\"other\\"\
```\
\
Key differences:\
- **No fall-through** like C — the first matching `case` wins and stops.\
- A bare `case name` is a **capture** (assignment), **not** a comparison against a variable of that name. To match a constant use a dotted name (`Color.RED`) or a literal.
