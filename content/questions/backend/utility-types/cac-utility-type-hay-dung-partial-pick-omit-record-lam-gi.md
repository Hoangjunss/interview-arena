---
id: cac-utility-type-hay-dung-partial-pick-omit-record-lam-gi
position: backend
technology: utility-types
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các utility type hay dùng (`Partial`, `Pick`, `Omit`, `Record`) làm gì?

## Question (EN)
What do the common utility types (`Partial`, `Pick`, `Omit`, `Record`) do?

## Đáp án chi tiết (VI)
TypeScript có sẵn các type biến đổi một type gốc, giúp **dẫn xuất** thay vì khai báo lại (DRY):\
\
- **`Partial\u003cT\u003e`** — mọi field thành optional (hợp payload update/patch).\
- **`Required\u003cT\u003e`** — mọi field thành bắt buộc.\
- **`Pick\u003cT, K\u003e`** — lấy ra một tập field `K` từ `T`.\
- **`Omit\u003cT, K\u003e`** — loại bỏ tập field `K` khỏi `T`.\
- **`Record\u003cK, V\u003e`** — object với key kiểu `K`, value kiểu `V` (dictionary/map).\
- Khác: `Readonly\u003cT\u003e`, `ReturnType\u003cF\u003e`, `Parameters\u003cF\u003e`...\
\
Lợi ích chính: một nguồn sự thật — sửa type gốc thì mọi type phái sinh cập nhật theo, không lệch.

## Detailed Answer (EN)
TypeScript ships types that transform a base type, letting you **derive** rather than redeclare (DRY):\
\
- **`Partial\u003cT\u003e`** — makes every field optional (good for update/patch payloads).\
- **`Required\u003cT\u003e`** — makes every field required.\
- **`Pick\u003cT, K\u003e`** — selects a subset of fields `K` from `T`.\
- **`Omit\u003cT, K\u003e`** — removes a subset of fields `K` from `T`.\
- **`Record\u003cK, V\u003e`** — an object with keys of type `K` and values of type `V` (dictionary/map).\
- Others: `Readonly\u003cT\u003e`, `ReturnType\u003cF\u003e`, `Parameters\u003cF\u003e`...\
\
Key benefit: a single source of truth — change the base type and every derived type updates with it, so they never drift.
