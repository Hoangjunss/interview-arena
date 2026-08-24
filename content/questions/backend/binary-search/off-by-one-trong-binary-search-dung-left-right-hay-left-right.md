---
id: off-by-one-trong-binary-search-dung-left-right-hay-left-right
position: backend
technology: binary-search
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Off-by-one trong Binary Search: dùng `left \u003c right` hay `left \u003c= right`?

## Question (EN)
Off-by-one in Binary Search: `left \u003c right` or `left \u003c= right`?

## Đáp án chi tiết (VI)
Tuỳ vào **invariant** bạn muốn duy trì.\
\
**`left \u003c= right` (closed interval [left, right]):**\
- Vùng tìm kiếm bao gồm cả left và right\
- Khi không match: `left = mid + 1` hoặc `right = mid - 1`\
- Vòng dừng khi `left \u003e right` (vùng rỗng)\
- Phù hợp khi tìm **exact match**\
\
**`left \u003c right` (half-open [left, right)):**\
- right là exclusive — không nhìn `nums[right]`\
- Khi không match: `left = mid + 1` hoặc `right = mid` (không phải `mid-1`)\
- Vòng dừng khi `left === right`\
- Phù hợp khi tìm **insertion point** hoặc **lower bound**\
\
**Mẹo:** chọn 1 style và stick. Mix là nguyên nhân số 1 gây off-by-one. Đa số code samples dùng `\u003c=` cho exact match.

## Detailed Answer (EN)
Depends on the invariant. Use `\u003c=` with closed interval [left, right] and `mid±1` updates for exact match. Use `\u003c` with half-open [left, right) and `right = mid` for lower bound / insertion point. Pick one style and stick to it.
