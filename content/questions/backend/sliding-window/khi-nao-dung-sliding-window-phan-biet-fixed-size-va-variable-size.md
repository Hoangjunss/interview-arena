---
id: khi-nao-dung-sliding-window-phan-biet-fixed-size-va-variable-size
position: backend
technology: sliding-window
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng Sliding Window? Phân biệt fixed-size và variable-size?

## Question (EN)
When to use Sliding Window? Difference between fixed-size and variable-size?

## Đáp án chi tiết (VI)
**Sliding Window** áp dụng khi cần duyệt mọi đoạn liên tiếp (subarray/substring) thoả điều kiện, tránh O(n·k) bằng cách trượt cửa sổ trong O(n).\
\
**Fixed-size:** độ dài cửa sổ K cố định. Ví dụ \\"tổng lớn nhất của K phần tử liên tiếp\\".\
\
**Variable-size:** độ dài cửa sổ thay đổi theo điều kiện. Ví dụ \\"đoạn dài nhất không có ký tự lặp\\". Thường có 2 con trỏ `left` và `right` — mở rộng `right` rồi co `left` khi vi phạm điều kiện.\
\
**Pattern chung:**\
```ts\
let left = 0\
for (let right = 0; right \u003c nums.length; right++) {\
  // mở rộng cửa sổ với nums[right]\
  while (/* vi phạm điều kiện */) {\
    // co cửa sổ: gỡ nums[left], left++\
  }\
  // cập nhật answer\
}\
```\
\
Mỗi phần tử visit tối đa 2 lần → O(n).

## Detailed Answer (EN)
Sliding Window applies to consecutive subarray/substring problems where O(n·k) brute force can drop to O(n) by sliding instead of recomputing.\
\
Fixed-size: window length K is constant. Variable-size: window length changes based on a condition — use two pointers, expand right, shrink left when invariant breaks.
