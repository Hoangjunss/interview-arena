---
id: su-khac-nhau-giua-valuekey-objectkey-va-uniquekey-la-gi
position: backend
technology: widget-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa `ValueKey`, `ObjectKey` và `UniqueKey` là gì?

## Question (EN)
What is the difference between `ValueKey`, `ObjectKey`, and `UniqueKey`?

## Đáp án chi tiết (VI)
`ValueKey` xác định widget bằng một giá trị cụ thể; hai widget cùng giá trị được coi là giống nhau. `ObjectKey` dùng tham chiếu danh tính của đối tượng; mỗi đối tượng duy nhất có key riêng. `UniqueKey` luôn tạo danh tính duy nhất, hữu ích khi muốn mỗi instance khác biệt. Tránh tạo `UniqueKey` trong `build()` — điều đó phá vỡ mục đích bảo tồn state.

## Detailed Answer (EN)
`ValueKey` identifies widgets by a specific value. `ObjectKey` uses an object's reference identity. `UniqueKey` always creates a unique identity. Avoid creating `UniqueKey` in `build()` — it defeats state preservation.
