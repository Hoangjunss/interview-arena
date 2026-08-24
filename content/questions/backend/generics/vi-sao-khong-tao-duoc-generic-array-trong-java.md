---
id: vi-sao-khong-tao-duoc-generic-array-trong-java
position: backend
technology: generics
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không tạo được generic array trong Java?

## Question (EN)
Why can you not create a generic array in Java?

## Đáp án chi tiết (VI)
Không viết được `new T[10]` hay `new List\u003cString\u003e[10]` vì **generics bị xoá kiểu (type erasure)** còn **array thì reified** (mang thông tin kiểu phần tử lúc runtime). Hai cơ chế xung khắc.\
\
Array kiểm tra kiểu **lúc runtime**: gán sai kiểu → `ArrayStoreException`. Nhưng sau erasure, `T` biến thành `Object` — runtime không còn biết `T` là gì để kiểm, nên mảng generic sẽ phá vỡ đảm bảo an toàn kiểu của array.\
\
```java\
List\u003cString\u003e[] arr = new List\u003cString\u003e[2]; // compile error\
// giả sử được phép:\
Object[] oa = arr;\
oa[0] = List.of(1, 2);   // đáng lẽ ArrayStoreException nhưng lọt\
String s = arr[0].get(0); // ClassCastException ngầm sau này\
```\
\
**Giải pháp:** dùng `List\u003cT\u003e` thay array (`List\u003cList\u003cString\u003e\u003e`); hoặc khi buộc phải có array, tạo `Object[]` rồi ép `(T[])` và cô lập cảnh báo bằng `@SuppressWarnings(\\"unchecked\\")` — chính cách `ArrayList` làm bên trong.

## Detailed Answer (EN)
You cannot write `new T[10]` or `new List\u003cString\u003e[10]` because **generics use type erasure** while **arrays are reified** (they carry element-type info at runtime). The two mechanisms conflict.\
\
Arrays check types **at runtime**: storing the wrong type throws `ArrayStoreException`. But after erasure `T` becomes `Object` — the runtime no longer knows what `T` is to check, so a generic array would break the array's type-safety guarantee.\
\
```java\
List\u003cString\u003e[] arr = new List\u003cString\u003e[2]; // compile error\
// suppose it were allowed:\
Object[] oa = arr;\
oa[0] = List.of(1, 2);   // should be ArrayStoreException but slips through\
String s = arr[0].get(0); // hidden ClassCastException later\
```\
\
**Fix:** use `List\u003cT\u003e` instead of an array (`List\u003cList\u003cString\u003e\u003e`); or, when an array is unavoidable, create an `Object[]`, cast to `(T[])`, and isolate the warning with `@SuppressWarnings(\\"unchecked\\")` — exactly what `ArrayList` does internally.
