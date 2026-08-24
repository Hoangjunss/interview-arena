---
id: giai-thich-su-khac-nhau-giua-list-set-va-map-trong-dart
position: backend
technology: dart-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích sự khác nhau giữa `List`, `Set` và `Map` trong Dart.

## Question (EN)
Explain the difference between a `List`, `Set`, and `Map` in Dart.

## Đáp án chi tiết (VI)
`List` là collection có thứ tự và cho phép trùng lặp: `[1, 2, 2, 3]`. `Set` là collection không có thứ tự với các phần tử duy nhất: `{1, 2, 3}`. `Map` lưu trữ cặp key-value: `{\\"name\\": \\"John\\

## Detailed Answer (EN)
`List` is an ordered collection allowing duplicates. `Set` is an unordered collection with unique elements only. `Map` stores key-value pairs. Choose `List` when order matters, `Set` for unique values and O(1) lookups, `Map` for key-based data retrieval.
