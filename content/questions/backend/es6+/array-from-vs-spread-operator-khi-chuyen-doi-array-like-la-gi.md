---
id: array-from-vs-spread-operator-khi-chuyen-doi-array-like-la-gi
position: backend
technology: es6+
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Array.from() vs spread operator khi chuyển đổi array-like là gì?

## Question (EN)
What is the difference between Array.from() and the spread operator when converting array-likes?

## Đáp án chi tiết (VI)
Array.from(arrayLike) và [...arrayLike] đều tạo array từ iterable. Array.from() mạnh hơn: nhận array-like không phải iterable (chỉ cần có `length` và indexed elements) và có tham số `mapFn` để transform ngay khi tạo. Spread yêu cầu đúng iterable protocol.\
\
```javascript\
// NodeList không phải true iterable trong mọi môi trường\
Array.from(document.querySelectorAll('div')); // OK\
// mapFn: tạo mảng 1-5 ngay lập tức\
Array.from({ length: 5 }, (_, i) =\u003e i + 1); // [1, 2, 3, 4, 5]\
```

## Detailed Answer (EN)
Array.from(arrayLike) and [...arrayLike] both create arrays from iterables. Array.from() is more powerful: it accepts array-like objects that are not iterable (requiring only `length` and indexed elements) and has a `mapFn` parameter to transform while creating. Spread requires the proper iterable protocol.\
\
```javascript\
// NodeList may not be a true iterable in all environments\
Array.from(document.querySelectorAll('div')); // OK\
// mapFn: create array 1-5 inline\
Array.from({ length: 5 }, (_, i) =\u003e i + 1); // [1, 2, 3, 4, 5]\
```
