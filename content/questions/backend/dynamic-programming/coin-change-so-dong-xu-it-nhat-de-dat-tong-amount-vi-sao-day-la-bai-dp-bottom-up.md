---
id: coin-change-so-dong-xu-it-nhat-de-dat-tong-amount-vi-sao-day-la-bai-dp-bottom-up
position: backend
technology: dynamic-programming
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Coin Change — số đồng xu ít nhất để đạt tổng amount. Vì sao đây là bài DP bottom-up chứ không greedy?

## Question (EN)
Coin Change — fewest coins to make `amount`. Why is this bottom-up DP and not greedy?

## Đáp án chi tiết (VI)
**Ý tưởng:** `dp[x]` = số xu ít nhất để tạo tổng `x`. Với mỗi `x`, thử mọi mệnh giá `coin`: `dp[x] = min(dp[x], dp[x - coin] + 1)`. Đáp án là `dp[amount]`.\
\
**Vì sao không greedy:** tham lam (luôn chọn xu lớn nhất) sai với bộ mệnh giá không chuẩn — ví dụ coins `[1, 3, 4]`, amount `6`: greedy ra `4+1+1=3 xu`, nhưng tối ưu là `3+3=2 xu`. DP xét mọi tổ hợp con nên luôn đúng.\
\
```ts\
function coinChange(coins: number[], amount: number): number {\
  const dp = new Array(amount + 1).fill(Infinity)\
  dp[0] = 0\
  for (let x = 1; x \u003c= amount; x++)\
    for (const coin of coins)\
      if (coin \u003c= x) dp[x] = Math.min(dp[x], dp[x - coin] + 1)\
  return dp[amount] === Infinity ? -1 : dp[amount]\
}\
```\
\
**Độ phức tạp:** thời gian O(amount × số mệnh giá), bộ nhớ O(amount).\
\
**Lưu ý:** Khởi tạo `dp` bằng `Infinity` để biểu diễn \\"không tạo được\\"; quên gốc `dp[0] = 0` là lỗi phổ biến. Trả `-1` khi `dp[amount]` vẫn `Infinity`.

## Detailed Answer (EN)
**Idea:** `dp[x]` = fewest coins to form sum `x`. For each `x`, try every `coin`: `dp[x] = min(dp[x], dp[x - coin] + 1)`. Answer is `dp[amount]`.\
\
**Why not greedy:** picking the largest coin first fails for non-canonical denominations — e.g. coins `[1, 3, 4]`, amount `6`: greedy gives `4+1+1=3 coins`, but optimal is `3+3=2 coins`. DP considers all sub-combinations, so it's always correct.\
\
```ts\
function coinChange(coins: number[], amount: number): number {\
  const dp = new Array(amount + 1).fill(Infinity)\
  dp[0] = 0\
  for (let x = 1; x \u003c= amount; x++)\
    for (const coin of coins)\
      if (coin \u003c= x) dp[x] = Math.min(dp[x], dp[x - coin] + 1)\
  return dp[amount] === Infinity ? -1 : dp[amount]\
}\
```\
\
**Complexity:** time O(amount × #denominations), space O(amount).\
\
**Note:** Initialize `dp` with `Infinity` to represent \\"unreachable\\"; forgetting the base `dp[0] = 0` is a common bug. Return `-1` when `dp[amount]` stays `Infinity`.
