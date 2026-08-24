---
id: pattern-matching-trong-dart-3-hoat-dong-nhu-the-nao-cho-vi-du-thuc-te
position: backend
technology: dart-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pattern matching trong Dart 3 hoạt động như thế nào? Cho ví dụ thực tế.

## Question (EN)
How does pattern matching work in Dart 3? Give a practical example.

## Đáp án chi tiết (VI)
Pattern matching cho phép khớp giá trị và destructure cùng lúc. Ví dụ với switch: `switch (shape) { case Circle(radius: var r) =\u003e print('Circle r=$r'); case Rectangle(width: var w, height: var h) =\u003e print('Rect ${w}x${h}'); }`. Bạn cũng có thể thêm guard clause: `case (int a, int b) when a \u003e b =\u003e print('$a lớn hơn $b');`. Patterns còn dùng được trong khai báo biến: `var (x, y) = getPoint();`. Giúp code declarative hơn hẳn so với chuỗi if/else.

## Detailed Answer (EN)
Patterns match values and destructure them simultaneously. \
\
**Example:** `switch (shape) { case Circle(radius: var r) =\u003e print(r); case Rectangle(width: var w, height: var h) =\u003e print('${w}x${h}'); }`. Guard clauses add conditions: `case (int a, int b) when a \u003e b`. Patterns also work in variable declarations: `var (x, y) = getPoint();`. Far more declarative than if/else chains.
