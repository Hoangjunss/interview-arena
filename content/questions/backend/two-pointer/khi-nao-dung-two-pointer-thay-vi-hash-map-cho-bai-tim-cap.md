---
id: khi-nao-dung-two-pointer-thay-vi-hash-map-cho-bai-tim-cap
position: backend
technology: two-pointer
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng Two-Pointer thay vì Hash Map cho bài tìm cặp?

## Question (EN)
When to use Two-Pointer instead of Hash Map for pair-finding?

## Đáp án chi tiết (VI)
**Two-Pointer** ưu thế khi mảng **đã được sắp xếp** — không cần extra space, đạt O(n) time, O(1) space.\
\
Hash Map cần O(n) space để đổi lấy O(1) lookup. Trên mảng sorted, Two-Pointer đạt cùng O(n) time mà không cần buffer.\
\
**Phân biệt:**\
- Mảng sorted + tìm cặp tổng = target → **Two-Pointer**\
- Mảng KHÔNG sorted + cần O(n) → **Hash Map**\
- Cần O(1) space và mảng sorted → **Two-Pointer**\
- Cần đếm tần suất → **Hash Map** (Two-Pointer không phù hợp)\
\
**Code (Two Sum Sorted):**\
```ts\
function twoSumSorted(nums: number[], target: number) {\
  let left = 0, right = nums.length - 1\
  while (left \u003c right) {\
    const sum = nums[left] + nums[right]\
    if (sum === target) return [left, right]\
    if (sum \u003c target) left++\
    else right--\
  }\
  return null\
}\
```

## Detailed Answer (EN)
Two-Pointer wins when the array is sorted — achieves O(n) time + O(1) space. Hash Map needs O(n) space. If sorted, prefer Two-Pointer. If unsorted and need O(n) time, use Hash Map.
