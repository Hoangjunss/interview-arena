---
id: friend-function-va-friend-class-trong-c-la-gi-khi-nao-dung
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`friend` function và `friend` class trong C++ là gì? Khi nào dùng?

## Question (EN)
What are `friend` functions and `friend` classes in C++? When should you use them?

## Đáp án chi tiết (VI)
`friend` cho phép một hàm hoặc class **truy cập trực tiếp** các thành viên `private`/`protected` của class khác — phá encapsulation có kiểm soát.\
\
```cpp\
class Box {\
  double width_;\
public:\
  Box(double w) : width_(w) {}\
  friend double getWidth(const Box\u0026 b);  // hàm bạn\
};\
\
double getWidth(const Box\u0026 b) {\
  return b.width_;  // truy cập private trực tiếp\
}\
```\
\
**Khi dùng hợp lý:**\
- Operator overloading cần truy cập private của cả 2 bên (ví dụ `operator\u003c\u003c`).\
- Unit test class cần inspect nội bộ.\
- 2 class cộng tác chặt chẽ mà getter/setter sẽ quá lộn xộn.\
\
**Lưu ý:** `friend` không kế thừa — class con không tự động là friend. Dùng tiết kiệm; quá nhiều `friend` thường là dấu hiệu thiết kế cần refactor.

## Detailed Answer (EN)
`friend` lets a function or class **directly access** the `private`/`protected` members of another class — controlled encapsulation breakage.\
\
```cpp\
class Box {\
  double width_;\
public:\
  Box(double w) : width_(w) {}\
  friend double getWidth(const Box\u0026 b);  // friend function\
};\
\
double getWidth(const Box\u0026 b) {\
  return b.width_;  // direct private access\
}\
```\
\
**Legitimate uses:**\
- Operator overloading needing private access on both sides (e.g. `operator\u003c\u003c`).\
- Unit test classes that need to inspect internals.\
- Two tightly cooperating classes where getters/setters would be overly noisy.\
\
**Note:** `friend` is not inherited — subclasses are not automatically friends. Use sparingly; too many `friend` declarations usually signal a design issue.
