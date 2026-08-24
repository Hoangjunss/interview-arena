---
id: vi-sao-from-size-bi-gioi-han-o-10-000-va-thay-bang-gi
position: backend
technology: search
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `from`/`size` bị giới hạn ở 10.000 và thay bằng gì?

## Question (EN)
Why is `from`/`size` capped at 10,000 and what replaces it?

## Đáp án chi tiết (VI)
Vì deep pagination bắt **mỗi shard phải trả về `from + size` hit rồi coordinating node sort lại toàn bộ**. `from=100000` nghĩa là mỗi shard gom 100.010 document — tốn heap tuyến tính theo độ sâu, dễ làm OOM cả cluster. Ngưỡng `index.max_result_window` mặc định 10.000 là để chặn việc đó.\
\
Thay bằng `search_after` cho phân trang sâu:\
\
```json\
{\
  \\"size\\": 20,\
  \\"sort\\": [{ \\"created_at\\": \\"desc\\" }, { \\"_id\\": \\"asc\\" }],\
  \\"search_after\\": [1737072000000, \\"prod-8891\\"]\
}\
```\
\
Tiêu chí sort phải **unique** (thêm `_id` để phá hoà) thì mới không lặp hoặc sót.\
\
Kèm `point_in_time` nếu cần kết quả ổn định trong lúc dữ liệu vẫn đang thay đổi.\
\
Đừng nâng `max_result_window` để \\"chữa\\" — đó là bỏ đi cái phanh chứ không phải sửa lỗi. Và với UI thật, gần như không ai bấm tới trang 500; giới hạn số trang rồi đẩy user sang lọc thêm là giải pháp sản phẩm tốt hơn.

## Detailed Answer (EN)
Because deep pagination forces **every shard to return `from + size` hits for the coordinating node to re-sort**. `from=100000` means each shard gathers 100,010 documents — heap cost grows linearly with depth and can OOM the cluster. The default `index.max_result_window` of 10,000 exists to stop that.\
\
Use `search_after` for deep pagination:\
\
```json\
{\
  \\"size\\": 20,\
  \\"sort\\": [{ \\"created_at\\": \\"desc\\" }, { \\"_id\\": \\"asc\\" }],\
  \\"search_after\\": [1737072000000, \\"prod-8891\\"]\
}\
```\
\
The sort key must be **unique** (add `_id` as a tiebreaker) to avoid duplicates or gaps.\
\
Pair it with `point_in_time` when results must stay stable while data keeps changing.\
\
Do not raise `max_result_window` as a \\"fix\\" — that removes the brake rather than solving anything. And in real UIs almost nobody reaches page 500; capping pages and pushing users toward filters is the better product answer.
