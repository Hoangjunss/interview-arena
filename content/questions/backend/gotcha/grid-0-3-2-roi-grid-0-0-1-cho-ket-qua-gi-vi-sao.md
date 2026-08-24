---
id: grid-0-3-2-roi-grid-0-0-1-cho-ket-qua-gi-vi-sao
position: backend
technology: gotcha
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`grid = [[0] * 3] * 2` rồi `grid[0][0] = 1` cho kết quả gì? Vì sao?

## Question (EN)
What does `grid = [[0] * 3] * 2` followed by `grid[0][0] = 1` produce, and why?

## Đáp án chi tiết (VI)
Kết quả là `[[1, 0, 0], [1, 0, 0]]` — cả hai hàng cùng đổi. Toán tử `*` trên list **không sao chép phần tử**, nó chỉ nhân bản **tham chiếu**: hai \\"hàng\\" thực chất là **một object**.\
\
```python\
row = [0] * 3\
grid = [row] * 2\
grid[0] is grid[1]   # True — the same list object\
```\
\
Riêng `[0] * 3` vẫn đúng như mong đợi vì `0` là immutable: gán `row[0] = 1` là **thay ô** trong list chứ không sửa chính số 0.\
\
**Cách đúng** — tạo list mới cho từng hàng bằng comprehension:\
\
```python\
grid = [[0] * 3 for _ in range(2)]\
grid[0][0] = 1       # [[1, 0, 0], [0, 0, 0]]\
```\
\
Bản chất giống bẫy default argument: trong Python, gán và nhân bản container mặc định là **chia sẻ tham chiếu**, không phải copy.

## Detailed Answer (EN)
You get `[[1, 0, 0], [1, 0, 0]]` — both rows change. The `*` operator on a list **does not copy the elements**, it duplicates **references**: the two \\"rows\\" are literally **one object**.\
\
```python\
row = [0] * 3\
grid = [row] * 2\
grid[0] is grid[1]   # True — the same list object\
```\
\
`[0] * 3` alone behaves as expected because `0` is immutable: `row[0] = 1` **rebinds a slot** in the list rather than mutating the number.\
\
**The correct form** — build a fresh list per row with a comprehension:\
\
```python\
grid = [[0] * 3 for _ in range(2)]\
grid[0][0] = 1       # [[1, 0, 0], [0, 0, 0]]\
```\
\
Same root cause as the mutable-default trap: in Python, assignment and container replication **share references** by default, they do not copy.
