---
id: pick-t-k-va-omit-t-k-la-gi
position: backend
technology: utility-types
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Pick\u003cT, K\u003e` và `Omit\u003cT, K\u003e` là gì?

## Question (EN)
What are `Pick\u003cT, K\u003e` and `Omit\u003cT, K\u003e`?

## Đáp án chi tiết (VI)
`Pick\u003cT, K\u003e` tạo type chỉ với subset of properties K từ T: `Pick\u003cUser, 'id' | 'name'\u003e` chỉ giữ lại id và name. `Omit\u003cT, K\u003e` là ngược lại: tạo type với tất cả properties trừ K, ví dụ `Omit\u003cUser, 'password'\u003e` để không lộ mật khẩu trong response. Hữu ích cho DTOs, API response shaping, và form state management khi chỉ cần một phần của type. Mẹo: dùng Omit khi cần loại ít field, Pick khi cần giữ ít field — chọn cái nào viết ngắn hơn.

## Detailed Answer (EN)
`Pick\u003cT, K\u003e` creates a type with only a subset of properties K from T: `Pick\u003cUser, 'id' | 'name'\u003e` keeps only id and name. `Omit\u003cT, K\u003e` is the opposite: creates a type with all properties except K, e.g., `Omit\u003cUser, 'password'\u003e` to avoid exposing the password in a response. Useful for DTOs, API response shaping, and form state management when only part of a type is needed. Tip: use Omit when excluding few fields, Pick when keeping few fields — choose whichever is shorter to write.
