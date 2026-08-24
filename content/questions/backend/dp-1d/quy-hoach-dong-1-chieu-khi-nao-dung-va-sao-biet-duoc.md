---
id: quy-hoach-dong-1-chieu-khi-nao-dung-va-sao-biet-duoc
position: backend
technology: dp-1d
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quy hoạch động 1 chiều — Khi nào dùng và sao biết được?

## Question (EN)
When to use 1D DP and how to recognize it?

## Đáp án chi tiết (VI)
**Quy hoạch động (DP)** áp dụng khi bài có:\
1. **Bài toán con (sub-problem) chồng lặp** — cùng sub-problem giải nhiều lần\
2. **Cấu trúc tối ưu (optimal substructure)** — lời giải tối ưu của bài lớn = tổ hợp lời giải tối ưu của bài con\
\
Nếu chỉ có (1) → cần memoization. Nếu có cả (2) → DP đúng.\
\
**DP-1D** = state chỉ cần 1 index (i). Mảng `dp[]` lưu kết quả tại từng vị trí.\
\
**Pattern chung:**\
```ts\
const dp = new Array(n).fill(0)\
dp[0] = base case\
for (let i = 1; i \u003c n; i++) {\
  dp[i] = f(dp[i-1], dp[i-2], ...)  // transition\
}\
return dp[n-1]\
```\
\
**Ví dụ kinh điển:**\
- Fibonacci: dp[i] = dp[i-1] + dp[i-2]\
- Climbing Stairs: dp[i] = dp[i-1] + dp[i-2]\
- House Robber: dp[i] = max(dp[i-1], dp[i-2] + nums[i])\
- Maximum Subarray (Kadane): dp[i] = max(nums[i], dp[i-1] + nums[i])\
\
**Mẹo:** đa số DP-1D chỉ cần 2 biến cuối (`prev`, `curr`) → tối ưu space về O(1).

## Detailed Answer (EN)
DP applies when there are overlapping subproblems + optimal substructure. 1D DP = state needs only 1 index. Classic: Fibonacci, Climbing Stairs, House Robber, Kadane Max Subarray. Often optimizable to O(1) space with just two variables.
