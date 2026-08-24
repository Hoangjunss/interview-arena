---
id: pimpl-idiom-pointer-to-implementation-trong-c-la-gi-loi-ich
position: backend
technology: oop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pimpl idiom (Pointer to Implementation) trong C++ là gì? Lợi ích?

## Question (EN)
What is the Pimpl idiom (Pointer to Implementation) in C++? What are its benefits?

## Đáp án chi tiết (VI)
Pimpl ẩn chi tiết cài đặt của class vào một **private struct** — trỏ bằng `unique_ptr` — chỉ khai báo forward declaration trong header.\
\
```cpp\
// Widget.h — header thuần \\"interface\\"\
class Widget {\
public:\
  Widget();\
  ~Widget();\
  void doWork();\
private:\
  struct Impl;              // forward declaration\
  std::unique_ptr\u003cImpl\u003e p_;\
};\
\
// Widget.cpp — chi tiết ẩn trong .cpp\
struct Widget::Impl {\
  HeavyResource res;  // type này không cần expose trong header\
};\
\
Widget::Widget() : p_(std::make_unique\u003cImpl\u003e()) {}\
void Widget::doWork() { p_-\u003eres.process(); }\
```\
\
**Lợi ích:**\
- **ABI stability:** thay đổi `Impl` không cần recompile code dùng `Widget.h`.\
- **Compilation firewall:** header nhẹ, không kéo vào các `#include` nặng.\
- **Encapsulation thực sự:** `private` members trong header vẫn lộ tên kiểu — pimpl ẩn hoàn toàn.\
\
**Lưu ý:** destructor phải được định nghĩa trong `.cpp` (nơi `Impl` complete) — không để compiler gen mặc định ở header.

## Detailed Answer (EN)
Pimpl hides implementation details of a class inside a **private struct** — pointed to by `unique_ptr` — with only a forward declaration in the header.\
\
```cpp\
// Widget.h — pure interface header\
class Widget {\
public:\
  Widget();\
  ~Widget();\
  void doWork();\
private:\
  struct Impl;             // forward declaration\
  std::unique_ptr\u003cImpl\u003e p_;\
};\
\
// Widget.cpp — details hidden in .cpp\
struct Widget::Impl {\
  HeavyResource res;  // this type doesn't leak into the header\
};\
\
Widget::Widget() : p_(std::make_unique\u003cImpl\u003e()) {}\
void Widget::doWork() { p_-\u003eres.process(); }\
```\
\
**Benefits:**\
- **ABI stability:** changing `Impl` doesn't require recompiling code that includes `Widget.h`.\
- **Compilation firewall:** lightweight header, no heavy `#include` transitive pull-in.\
- **True encapsulation:** `private` members in headers still expose type names — pimpl hides everything.\
\
**Note:** destructor must be defined in the `.cpp` (where `Impl` is complete) — do not let the compiler generate it in the header.
