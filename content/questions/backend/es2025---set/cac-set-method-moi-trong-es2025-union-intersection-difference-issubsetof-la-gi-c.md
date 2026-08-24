---
id: cac-set-method-moi-trong-es2025-union-intersection-difference-issubsetof-la-gi-c
position: backend
technology: es2025---set
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các Set method mới trong ES2025 (union, intersection, difference, isSubsetOf...) là gì? Có bẫy gì với argument?

## Question (EN)
What are the new ES2025 Set methods (union, intersection, difference, isSubsetOf...) and what's the argument gotcha?

## Đáp án chi tiết (VI)
ES2025 thêm các phép toán tập hợp ngay trên `Set`, thay cho việc tự convert sang array.\
\
- **Trả về Set mới:** `union`, `intersection`, `difference`, `symmetricDifference`.\
- **Trả về boolean:** `isSubsetOf`, `isSupersetOf`, `isDisjointFrom`.\
\
```js\
const a = new Set([1, 2, 3]);\
const b = new Set([2, 3, 4]);\
\
a.union(b);              // Set {1, 2, 3, 4}\
a.intersection(b);       // Set {2, 3}\
a.difference(b);         // Set {1}  (có trong a, không trong b)\
a.symmetricDifference(b);// Set {1, 4}\
a.isSubsetOf(b);         // false\
```\
\
**Lưu ý:** argument không nhất thiết là `Set` thật — nó phải là một **Set-like** object (có `size`, `has`, `keys`). Một `Map` cũng dùng được vì có đủ ba thứ đó; nhưng một mảng thường **không** dùng được trực tiếp (thiếu `has`/`size` đúng dạng) → phải bọc `new Set(arr)`.\
\
**Lưu ý:** các method này không sửa Set gốc (immutable). Thứ tự phần tử trong kết quả theo thứ tự chèn của Set nhận lệnh.

## Detailed Answer (EN)
ES2025 adds set algebra directly on `Set`, replacing manual array conversions.\
\
- **Return a new Set:** `union`, `intersection`, `difference`, `symmetricDifference`.\
- **Return a boolean:** `isSubsetOf`, `isSupersetOf`, `isDisjointFrom`.\
\
```js\
const a = new Set([1, 2, 3]);\
const b = new Set([2, 3, 4]);\
\
a.union(b);              // Set {1, 2, 3, 4}\
a.intersection(b);       // Set {2, 3}\
a.difference(b);         // Set {1}\
a.symmetricDifference(b);// Set {1, 4}\
a.isSubsetOf(b);         // false\
```\
\
**Key gotcha:** the argument needn't be a real `Set` — it must be a **Set-like** object (with `size`, `has`, `keys`). A `Map` works because it has all three; a plain array does **not** work directly → wrap it in `new Set(arr)`.\
\
**Note:** these methods don't mutate the original (immutable). Result order follows the receiver Set's insertion order.
