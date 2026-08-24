---
id: constructor-overloading-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Constructor overloading là gì?

## Question (EN)
What is constructor overloading?

## Đáp án chi tiết (VI)
Một class có **nhiều constructor** trùng tên class nhưng **khác tham số** (kiểu, số lượng, hoặc thứ tự). Compiler chọn đúng version dựa trên argument lúc gọi.\
\
```java\
public class Box {\
  public Box() { this(1, 1, 1); }                  // default\
  public Box(int size) { this(size, size, size); } // cube\
  public Box(int l, int w, int h) { /* ... */ }\
}\
\
new Box();           // 1×1×1\
new Box(5);          // 5×5×5\
new Box(2, 3, 4);    // 2×3×4\
```\
\
Gọi constructor khác trong cùng class qua `this(...)`, gọi constructor parent qua `super(...)` — cả hai **bắt buộc đứng đầu**.\
\
Khi tham số nhiều/nhiều combo optional, ưu tiên **Builder pattern** hoặc **`record`** (Java 16+) thay vì sinh ra hàng tá constructor.

## Detailed Answer (EN)
A class can have **multiple constructors** sharing the class name but with **different parameters** (type, count, or order). The compiler picks the right one from the call-site arguments.\
\
```java\
public class Box {\
  public Box() { this(1, 1, 1); }                  // default\
  public Box(int size) { this(size, size, size); } // cube\
  public Box(int l, int w, int h) { /* ... */ }\
}\
\
new Box();           // 1×1×1\
new Box(5);          // 5×5×5\
new Box(2, 3, 4);    // 2×3×4\
```\
\
Call another constructor in the same class via `this(...)`, call the parent's via `super(...)` — both **must be the first statement**.\
\
When there are many parameters or many optional combos, prefer the **Builder pattern** or a **`record`** (Java 16+) over stacking up many constructors.
