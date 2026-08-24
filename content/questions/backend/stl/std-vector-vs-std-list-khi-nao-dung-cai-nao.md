---
id: std-vector-vs-std-list-khi-nao-dung-cai-nao
position: backend
technology: stl
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::vector` vs `std::list` — khi nào dùng cái nào?

## Question (EN)
When should you use `std::vector` vs `std::list`?

## Đáp án chi tiết (VI)
| | `vector` | `list` |\
|---|---|---|\
| Bộ nhớ | contiguous (cache-friendly) | linked nodes (non-contiguous) |\
| Random access | O(1) | O(n) |\
| Insert/delete cuối | O(1) amortized | O(1) |\
| Insert/delete giữa | O(n) (shift) | O(1) tại vị trí iterator |\
| Memory overhead | thấp | cao (2 pointer/node) |\
\
Trong thực tế, `vector` **gần như luôn thắng** nhờ cache locality — ngay cả khi insert/delete nhiều ở giữa, cache miss của `list` thường đắt hơn O(n) shift của `vector` trên dữ liệu nhỏ/trung bình.\
\
**Dùng `list` khi:** cần giữ iterator hợp lệ sau khi insert/delete, splice nhiều đoạn lớn (`std::list::splice` là O(1)).\
**Dùng `vector` cho mặc định** — chỉ chuyển sang `list` sau khi đo đạc thực tế.

## Detailed Answer (EN)
| | `vector` | `list` |\
|---|---|---|\
| Memory | contiguous (cache-friendly) | linked nodes (non-contiguous) |\
| Random access | O(1) | O(n) |\
| Push/pop back | O(1) amortized | O(1) |\
| Insert/delete in middle | O(n) (shift) | O(1) at iterator |\
| Memory overhead | low | high (2 pointers/node) |\
\
In practice, `vector` **almost always wins** due to cache locality — even for mid-sequence insertions, cache misses in `list` are often costlier than the O(n) shift in `vector` for small/medium data sets.\
\
**Use `list` when:** iterator stability after insert/delete is required, or you frequently splice large segments (`std::list::splice` is O(1)).\
**Default to `vector`** — only switch after profiling.
