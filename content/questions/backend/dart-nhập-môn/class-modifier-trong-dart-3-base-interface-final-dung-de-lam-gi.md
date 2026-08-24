---
id: class-modifier-trong-dart-3-base-interface-final-dung-de-lam-gi
position: backend
technology: dart-nhập-môn
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Class modifier trong Dart 3 (`base`, `interface`, `final`) dùng để làm gì?

## Question (EN)
What do class modifiers (`base`, `interface`, `final`) do in Dart 3?

## Đáp án chi tiết (VI)
`base`: chỉ cho phép extend, không cho implement—dùng khi muốn chia sẻ logic implementation nhưng kiểm soát interface. `interface`: chỉ cho phép implement, không cho extend—dùng khi muốn định nghĩa contract API. `final`: cấm cả extend lẫn implement—dùng để \\"đóng\\" class hoàn toàn. Các modifier này enforce ý định kiến trúc ngay ở compile-time, ngăn việc dùng sai inheritance. \
\
**Ví dụ:** `base class Animal {}` — class khác chỉ có thể extend, không thể implement trực tiếp.

## Detailed Answer (EN)
`base` allows extending but not implementing; `interface` allows implementing but not extending; `final` forbids both. They enforce architectural intent at compile-time, preventing inheritance misuse. \
\
**Example:** `base class Animal {}` — other classes can only extend it, not implement it directly.
