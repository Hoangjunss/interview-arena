---
id: longest-increasing-subsequence-lis-vi-sao-co-the-giai-o-n-log-n-thay-vi-o-n
position: backend
technology: dynamic-programming
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Longest Increasing Subsequence (LIS) — vì sao có thể giải O(n log n) thay vì O(n²)?

## Question (EN)
Longest Increasing Subsequence (LIS) — why can it be solved in O(n log n) instead of O(n²)?

## Đáp án chi tiết (VI)
**Ý tưởng O(n²):** `dp[i]` = độ dài LIS kết thúc tại `i`; với mỗi `i` quét lại các `j \u003c i` có `nums[j] \u003c nums[i]`.\
\
**Tăng tốc O(n log n) — patience sorting:** giữ một mảng `tails`, `tails[k]` = phần tử **kết nhỏ nhất** của một dãy tăng độ dài `k+1`. Với mỗi số, dùng **binary search** tìm vị trí thay thế (hoặc nối thêm). Độ dài `tails` chính là độ dài LIS.\
\
**Hình dung:** xếp bài patience — đặt lá lên chồng đầu tiên có lá đỉnh ≥ lá mới; số chồng = LIS.\
\
```ts\
function lengthOfLIS(nums: number[]): number {\
  const tails: number[] = []\
  for (const x of nums) {\
    let lo = 0, hi = tails.length\
    while (lo \u003c hi) {\
      const mid = (lo + hi) \u003e\u003e 1\
      if (tails[mid] \u003c x) lo = mid + 1\
      else hi = mid\
    }\
    tails[lo] = x // thay thế hoặc nối thêm khi lo === length\
  }\
  return tails.length\
}\
```\
\
**Độ phức tạp:** O(n log n) thời gian, O(n) bộ nhớ.\
\
**Lưu ý:** `tails` **không phải** là LIS thực tế — nó chỉ giữ đúng *độ dài*. Muốn truy vết dãy thật phải lưu thêm con trỏ cha.

## Detailed Answer (EN)
$83
