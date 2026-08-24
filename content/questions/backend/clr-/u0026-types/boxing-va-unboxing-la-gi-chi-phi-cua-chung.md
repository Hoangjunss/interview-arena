---
id: boxing-va-unboxing-la-gi-chi-phi-cua-chung
position: backend
technology: clr-\u0026-types
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Boxing và unboxing là gì? Chi phí của chúng?

## Question (EN)
What are boxing and unboxing? What do they cost?

## Đáp án chi tiết (VI)
**Boxing** là việc gói một **value type** (`int`, `struct`...) vào một object trên **heap** để coi nó như reference type. **Unboxing** là thao tác ngược lại: lấy value type ra khỏi box, cần **ép kiểu tường minh** và phải đúng kiểu gốc.\
\
```csharp\
int n = 42;\
object boxed = n;        // boxing: cấp phát trên heap, copy giá trị vào\
int back = (int)boxed;   // unboxing: kiểm tra kiểu + copy ra\
```\
\
**Chi phí:**\
- Boxing cấp phát bộ nhớ trên heap → tạo áp lực cho GC.\
- Unboxing tốn một lần kiểm tra kiểu; sai kiểu ném `InvalidCastException`.\
\
Boxing hay xảy ra âm thầm khi đưa value type vào API kiểu `object` (vd `ArrayList`, `string.Format`). Tránh nó bằng **generics** (`List\u003cint\u003e` thay `ArrayList`) để giữ dữ liệu ở dạng value type, không cấp phát heap.

## Detailed Answer (EN)
**Boxing** wraps a **value type** (`int`, `struct`...) into an object on the **heap** so it can be treated as a reference type. **Unboxing** is the reverse: it extracts the value type from the box, requiring an **explicit cast** to the exact original type.\
\
```csharp\
int n = 42;\
object boxed = n;        // boxing: heap allocation, value copied in\
int back = (int)boxed;   // unboxing: type check + copy out\
```\
\
**Cost:**\
- Boxing allocates on the heap → adds GC pressure.\
- Unboxing does a type check; a wrong type throws `InvalidCastException`.\
\
Boxing often happens silently when a value type is passed to an `object`-typed API (e.g. `ArrayList`, `string.Format`). Avoid it with **generics** (`List\u003cint\u003e` instead of `ArrayList`) so data stays as a value type with no heap allocation.
