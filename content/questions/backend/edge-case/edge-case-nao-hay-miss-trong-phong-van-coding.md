---
id: edge-case-nao-hay-miss-trong-phong-van-coding
position: backend
technology: edge-case
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Edge case nào hay miss trong phỏng vấn coding?

## Question (EN)
Common edge cases missed in coding interviews?

## Đáp án chi tiết (VI)
**Top edge case dễ miss:**\
\
1. **Input rỗng:** `[]` hoặc `\\"\\"` — return null/empty hay throw?\
2. **Single element:** `[1]` — nhiều thuật toán giả định ≥ 2\
3. **Toàn bộ trùng:** `[5, 5, 5, 5]` — duplicate handling\
4. **Đã sorted vs reverse sorted:** worst case của quick sort\
5. **Negative numbers:** quên handle khi đề chỉ ví dụ dương\
6. **Max int / overflow:** sum của large numbers\
7. **Pointer null/undefined:** trong linked list / tree\
8. **Off-by-one:** `\u003c` vs `\u003c=`, length vs length-1\
9. **Cycle trong graph:** infinite loop nếu không có visited set\
10. **Concurrent modification:** thay đổi mảng đang duyệt\
\
**Cách hỏi clarify trong phỏng vấn:**\
- \\"Mảng có thể rỗng không?\\"\
- \\"Có duplicate không?\\"\
- \\"Có negative không?\\"\
- \\"Range của giá trị?\\" (để check overflow)\
- \\"Cần return [] hay null khi không có?\\"\
\
**Mẹo:** trình bày edge case xong **viết test ngay** — chứng minh handle đúng.

## Detailed Answer (EN)
Top missed: empty input, single element, all duplicates, sorted/reverse-sorted, negatives, overflow, null pointers, off-by-one, cycles in graphs. Always clarify constraints upfront and write tests proving the handling.
