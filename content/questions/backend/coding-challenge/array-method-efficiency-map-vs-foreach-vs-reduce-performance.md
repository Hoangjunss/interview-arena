---
id: array-method-efficiency-map-vs-foreach-vs-reduce-performance
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Array method efficiency. map vs forEach vs reduce performance?

## Question (EN)
Array method efficiency. How do map, forEach, and reduce compare in performance?

## Đáp án chi tiết (VI)
forEach dùng để duyệt mảng và thực hiện side effect — không trả về mảng mới nên không tốn thêm bộ nhớ cấp phát.\
\
map tạo và trả về mảng mới cùng độ dài, tốn thêm bộ nhớ do phải cấp phát mảng — dùng khi cần biến đổi dữ liệu. reduce tích lũy các phần tử thành một giá trị duy nhất (số, object, hoặc mảng khác) — linh hoạt nhất nhưng khó đọc nếu logic phức tạp. Về hiệu năng: forEach nhanh nhất do không cấp phát mảng mới; map chậm hơn một chút. Quy tắc chọn: chỉ duyệt thì dùng forEach; biến đổi dữ liệu thì dùng map; tích lũy giá trị thì dùng reduce.

## Detailed Answer (EN)
forEach iterates an array and performs side effects — it returns nothing, so no additional memory is allocated for a new array.\
\
map creates and returns a new array of the same length — slightly slower due to array allocation; use it when transforming data. reduce accumulates elements into a single value (number, object, or another array) — the most flexible but can be hard to read with complex logic. Performance-wise: forEach is fastest since it skips array allocation; map is marginally slower. Rule of thumb: use forEach for side effects, map for data transformation, reduce for accumulation.
