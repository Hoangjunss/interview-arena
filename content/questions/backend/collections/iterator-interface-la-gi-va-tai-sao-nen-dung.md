---
id: iterator-interface-la-gi-va-tai-sao-nen-dung
position: backend
technology: collections
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Iterator interface là gì và tại sao nên dùng?

## Question (EN)
What is the Iterator interface and why should you use it?

## Đáp án chi tiết (VI)
**`Iterator\u003cE\u003e`** là interface duyệt collection mà không cần biết cấu trúc bên trong (mảng, linked list, tree...).\
\
```java\
Iterator\u003cString\u003e it = list.iterator();\
while (it.hasNext()) {\
  String s = it.next();\
  if (s.isEmpty()) it.remove();   // xoá AN TOÀN trong khi duyệt\
}\
```\
\
**Lý do quan trọng nhất — xoá an toàn:** đoạn sau throw `ConcurrentModificationException`:\
\
```java\
for (String s : list) {\
  if (s.isEmpty()) list.remove(s);   // BAD: CME\
}\
```\
\
Phải dùng `iterator.remove()` hoặc `list.removeIf(String::isEmpty)`.\
\
**Lưu ý:**\
- **Enhanced for-loop** thực ra là syntactic sugar của Iterator.\
- **`ListIterator`:** chỉ cho `List`, duyệt 2 chiều + `set/add` tại chỗ.\
- **`forEach(Consumer)`** (Java 8+): internal iteration — không `remove()` trong lúc duyệt, dùng `removeIf`.\
\
Quy tắc: ưu tiên enhanced for hoặc Stream; dùng iterator tường minh chỉ khi cần `remove()`.

## Detailed Answer (EN)
**`Iterator\u003cE\u003e`** is the interface for traversing a collection without knowing its internal structure (array, linked list, tree...).\
\
```java\
Iterator\u003cString\u003e it = list.iterator();\
while (it.hasNext()) {\
  String s = it.next();\
  if (s.isEmpty()) it.remove();   // SAFE removal during iteration\
}\
```\
\
**Most important reason — safe removal:** this throws `ConcurrentModificationException`:\
\
```java\
for (String s : list) {\
  if (s.isEmpty()) list.remove(s);   // BAD: CME\
}\
```\
\
Use `iterator.remove()` or `list.removeIf(String::isEmpty)`.\
\
**Notes:**\
- **Enhanced for-loops** are syntactic sugar over Iterator.\
- **`ListIterator`:** `List`-only, bi-directional + `set/add` at position.\
- **`forEach(Consumer)`** (Java 8+): internal iteration — cannot `remove()` mid-iteration, use `removeIf`.\
\
Rule: prefer enhanced for-loops or Streams; reach for an explicit iterator only when you need `remove()`.
