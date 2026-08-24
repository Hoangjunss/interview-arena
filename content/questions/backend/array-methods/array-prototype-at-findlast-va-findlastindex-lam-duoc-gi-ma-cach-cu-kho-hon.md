---
id: array-prototype-at-findlast-va-findlastindex-lam-duoc-gi-ma-cach-cu-kho-hon
position: backend
technology: array-methods
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Array.prototype.at(), findLast() và findLastIndex() làm được gì mà cách cũ khó hơn?

## Question (EN)
What do Array.prototype.at(), findLast(), and findLastIndex() do that the old way struggled with?

## Đáp án chi tiết (VI)
Ba method giúp truy cập **từ cuối mảng** sạch hơn.\
\
- **at(index)** hỗ trợ **chỉ số âm**: `at(-1)` là phần tử cuối. Cách cũ `arr[arr.length - 1]` dài dòng, và không gọn khi `arr` là biểu thức.\
- **findLast(fn)** / **findLastIndex(fn)** duyệt **từ phải sang trái**, trả về phần tử/chỉ số khớp **cuối cùng**. Trước đây phải `[...arr].reverse().find(...)` (tốn bộ nhớ, index bị đảo) hoặc viết vòng lặp ngược thủ công.\
\
```js\
const arr = [5, 12, 8, 130, 44];\
arr.at(-1);                       // 44\
arr.at(-2);                       // 130\
\
arr.findLast((n) =\u003e n \u003c 100);     // 44  (khớp cuối cùng)\
arr.findLastIndex((n) =\u003e n \u003c 100);// 4\
```\
\
**Hình dung:** `at(-1)` giống `arr[-1]` của Python — đếm ngược từ đuôi.\
\
**Lưu ý:** `at` cũng có trên `String` và `TypedArray`. Với chỉ số ngoài phạm vi, `at` trả `undefined` (giống `[]`). `findLast` trả `undefined` nếu không có phần tử nào khớp.

## Detailed Answer (EN)
Three methods for cleaner access **from the end** of an array.\
\
- **at(index)** supports **negative indices**: `at(-1)` is the last element. The old `arr[arr.length - 1]` is verbose, and awkward when `arr` is an expression.\
- **findLast(fn)** / **findLastIndex(fn)** scan **right-to-left**, returning the **last** matching element/index. Previously you needed `[...arr].reverse().find(...)` (extra memory, flipped index) or a manual reverse loop.\
\
```js\
const arr = [5, 12, 8, 130, 44];\
arr.at(-1);                       // 44\
arr.findLast((n) =\u003e n \u003c 100);     // 44 (last match)\
arr.findLastIndex((n) =\u003e n \u003c 100);// 4\
```\
\
**Picture it:** `at(-1)` is like Python's `arr[-1]` — counting back from the tail.\
\
**Note:** `at` also exists on `String` and `TypedArray`. Out-of-range `at` returns `undefined` (like `[]`). `findLast` returns `undefined` when nothing matches.
