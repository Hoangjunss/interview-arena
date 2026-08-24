---
id: is-vs-khac-nhau-gi
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`is` vs `==` — khác nhau gì?

## Question (EN)
`is` vs `==` — what's the difference?

## Đáp án chi tiết (VI)
`==` so sánh giá trị (gọi `__eq__`). `is` so sánh identity — hai biến có trỏ đến cùng object trong memory không. Lưu ý: CPython cache integers nhỏ (-5 đến 256) và string interning — `x = 256; y = 256; x is y` có thể là `True` nhưng `x = 257; y = 257; x is y` có thể là `False`. Chỉ dùng `is` để so sánh với `None`, `True`, `False`.

## Detailed Answer (EN)
`==` compares value (calls `__eq__`). `is` compares identity — whether both variables point to the same object in memory. Pitfall: CPython caches small integers (-5 to 256) and interns strings — this makes `is` behave unexpectedly. Only use `is` to compare with `None`, `True`, `False`.
