---
id: namespace-trong-c-la-gi-tai-sao-khong-nen-using-namespace-std-trong-header
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Namespace trong C++ là gì? Tại sao không nên `using namespace std;` trong header?

## Question (EN)
What are namespaces in C++? Why should you avoid `using namespace std;` in headers?

## Đáp án chi tiết (VI)
Namespace là **vùng tên** để nhóm các identifier — tránh xung đột tên khi dùng nhiều library.\
\
```cpp\
namespace math {\
  double sqrt(double x) { /* ... */ }\
}\
namespace game {\
  double sqrt(double x) { /* ... */ }\
}\
\
math::sqrt(4.0);  // gọi rõ ràng\
game::sqrt(4.0);\
```\
\
**`using namespace std;`** đưa toàn bộ tên trong `std` vào scope hiện tại — tiện cho ví dụ nhỏ nhưng nguy hiểm trong code thực.\
\
**Vấn đề khi dùng trong header:**\
- Header được `#include` vào nhiều file → áp `using namespace std` lên toàn bộ codebase.\
- Có thể gây xung đột tên ngầm (ví dụ: `std::move` vs function local `move`) và lỗi khó debug.\
\
**Thực hành tốt:** trong header, luôn viết đầy đủ `std::vector`, `std::string`. Trong `.cpp` có thể dùng `using std::cout;` cụ thể thay vì `using namespace std;`.

## Detailed Answer (EN)
A namespace is a **named scope** for grouping identifiers — preventing name collisions when using multiple libraries.\
\
```cpp\
namespace math {\
  double sqrt(double x) { /* ... */ }\
}\
namespace game {\
  double sqrt(double x) { /* ... */ }\
}\
\
math::sqrt(4.0);  // unambiguous call\
game::sqrt(4.0);\
```\
\
**`using namespace std;`** pulls everything from `std` into the current scope — convenient for small examples but hazardous in real code.\
\
**Problem in headers:**\
- Headers are `#include`d by many files → imposes `using namespace std` on the whole codebase.\
- Can silently introduce name collisions (e.g. `std::move` vs a local `move` function) causing hard-to-debug errors.\
\
**Best practice:** in headers, always write the full qualified name `std::vector`, `std::string`. In `.cpp` files, prefer specific `using std::cout;` over `using namespace std;`.
