---
id: wrapper-class-la-gi-autoboxing-unboxing-hoat-dong-ra-sao
position: backend
technology: wrapper-\u0026-autoboxing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Wrapper class là gì, autoboxing/unboxing hoạt động ra sao?

## Question (EN)
What is a wrapper class, and how do autoboxing/unboxing work?

## Đáp án chi tiết (VI)
**Wrapper class** là bản \\"đóng gói object\\" của primitive: `int→Integer`, `double→Double`, `boolean→Boolean`... Cần chúng vì Collections/Generics chỉ nhận object (`List\u003cInteger\u003e`, không có `List\u003cint\u003e`).\
\
- **Autoboxing:** compiler tự chèn `Integer.valueOf(x)` khi gán primitive vào chỗ cần object.\
- **Unboxing:** tự chèn `i.intValue()` ở chiều ngược lại.\
\
```java\
List\u003cInteger\u003e xs = new ArrayList\u003c\u003e();\
xs.add(5);              // autobox: 5 → Integer.valueOf(5)\
int first = xs.get(0);  // unbox: Integer → int\
```\
\
**Cạm bẫy:**\
- **NPE khi unbox null:** `Integer n = null; int x = n;` → `NullPointerException`.\
- **`==` trên Integer:** cache `-128..127`, nên `Integer a=100,b=100; a==b` là `true`, nhưng `128` thì `false`. Luôn dùng `.equals()`.\
- **Hiệu năng:** autobox trong vòng lặp nóng đẻ object rác — dùng primitive khi tính toán nặng.

## Detailed Answer (EN)
**Wrapper classes** are the object form of primitives: `int→Integer`, `double→Double`, `boolean→Boolean`... You need them because Collections/Generics only accept objects (`List\u003cInteger\u003e`, never `List\u003cint\u003e`).\
\
- **Autoboxing:** the compiler inserts `Integer.valueOf(x)` when a primitive is assigned where an object is expected.\
- **Unboxing:** it inserts `i.intValue()` the other way.\
\
```java\
List\u003cInteger\u003e xs = new ArrayList\u003c\u003e();\
xs.add(5);              // autobox: 5 → Integer.valueOf(5)\
int first = xs.get(0);  // unbox: Integer → int\
```\
\
**Notes:**\
- **NPE on null unbox:** `Integer n = null; int x = n;` → `NullPointerException`.\
- **`==` on Integer:** the `-128..127` cache makes `Integer a=100,b=100; a==b` be `true`, but `128` is `false`. Always use `.equals()`.\
- **Performance:** autoboxing in a hot loop spawns garbage objects — use primitives for heavy arithmetic.
