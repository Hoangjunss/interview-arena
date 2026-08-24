---
id: big-o-la-gi-tai-sao-o-2n-lai-viet-la-o-n
position: backend
technology: big-o
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Big-O là gì? Tại sao O(2n) lại viết là O(n)?

## Question (EN)
What is Big-O? Why is O(2n) written as O(n)?

## Đáp án chi tiết (VI)
**Big-O** là ký hiệu mô tả **growth rate** của thuật toán khi `n → ∞`. Quan tâm hành vi asymptotic, không phải constant.\
\
**Quy tắc:**\
1. **Bỏ hằng số:** O(2n) = O(n) vì hằng 2 không đổi với n lớn\
2. **Bỏ low-order terms:** O(n² + n) = O(n²)\
3. **Worst case** là quy ước ngầm\
\
**Trực giác:**\
- O(1): \\"không phụ thuộc n\\" — hash lookup, array access\
- O(log n): chia đôi mỗi bước — binary search\
- O(n): duyệt 1 lần — linear scan\
- O(n log n): sort efficient — merge sort, quick sort average\
- O(n²): nested loop — bubble sort, brute force pair\
- O(2^n): exponential — subsets, brute force backtrack\
- O(n!): permutations — TSP brute force\
\
**Lý do bỏ constant:** với n = 1 triệu, hằng số 2 vs 200 không quan trọng bằng việc đó có phải O(n) hay O(n²) — số phép tính lệch nhau cả triệu lần.

## Detailed Answer (EN)
Big-O describes asymptotic growth as n → ∞. Drop constants because they vanish at scale (1 million × 2 vs ×200 matters far less than O(n) vs O(n²) which differs by a factor of n).
