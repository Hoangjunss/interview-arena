---
id: chay-explain-xong-thi-nhin-vao-dau-de-biet-query-co-van-de
position: backend
technology: query-performance
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chạy `explain()` xong thì nhìn vào đâu để biết query có vấn đề?

## Question (EN)
After running `explain()`, what should you look at first to spot a problem?

## Đáp án chi tiết (VI)
Dùng `explain('executionStats')` và đọc **ba con số** trước, phần còn lại tính sau.\
\
```js\
db.orders.find({ userId: 12, status: 'paid' }).explain('executionStats')\
```\
\
- **`stage`**: `COLLSCAN` nghĩa là quét toàn bộ collection — thiếu index. `IXSCAN` là đang dùng index.\
- **`totalDocsExamined` so với `nReturned`**: đọc 500.000 document để trả về 20 là dấu hiệu index sai hoặc không đủ chọn lọc. Tỉ lệ lý tưởng gần 1:1.\
- **`executionTimeMillis`**: thời gian thực thi thật của kế hoạch đã chọn.\
\
Hai chi tiết hay bị bỏ qua:\
- **`SORT` stage** xuất hiện nghĩa là MongoDB sắp xếp trong bộ nhớ, không dùng index để sort.\
- **`rejectedPlans`** cho biết optimizer đã cân nhắc index nào rồi loại — hữu ích khi query dùng nhầm index.\
\
`explain()` mặc định (`queryPlanner`) chỉ cho biết kế hoạch, **không chạy thật** nên không có số liệu; muốn số liệu phải truyền `executionStats`.

## Detailed Answer (EN)
Run `explain('executionStats')` and read **three numbers** first; everything else comes later.\
\
```js\
db.orders.find({ userId: 12, status: 'paid' }).explain('executionStats')\
```\
\
- **`stage`**: `COLLSCAN` means a full collection scan — no usable index. `IXSCAN` means an index is being used.\
- **`totalDocsExamined` vs `nReturned`**: examining 500,000 documents to return 20 signals a wrong or non-selective index. The ideal ratio is close to 1:1.\
- **`executionTimeMillis`**: actual runtime of the chosen plan.\
\
Two details people miss:\
- A **`SORT` stage** means MongoDB sorted in memory instead of using an index for ordering.\
- **`rejectedPlans`** shows which indexes the optimizer considered and discarded — useful when a query picks the wrong index.\
\
Plain `explain()` (`queryPlanner` mode) only reports the plan and **does not execute** the query, so it has no statistics; pass `executionStats` to get them.
