---
id: const-member-function-trong-c-la-gi-tai-sao-can
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Const member function trong C++ là gì? Tại sao cần?

## Question (EN)
What is a const member function in C++? Why is it important?

## Đáp án chi tiết (VI)
Const member function được khai báo với `const` sau danh sách tham số — cam kết **không thay đổi trạng thái object** (không sửa any non-`mutable` member).\
\
```cpp\
class Counter {\
  int count_ = 0;\
public:\
  void increment()      { count_++; }   // non-const — sửa state\
  int  value()    const { return count_; }  // const — chỉ đọc\
};\
\
const Counter c;\
// c.increment();  // lỗi — không gọi non-const method trên const object\
c.value();         // OK\
```\
\
**Tại sao quan trọng (const-correctness):**\
- Cho phép truyền object bằng `const\u0026` và vẫn gọi được các getter.\
- Compiler phát hiện tại compile-time khi code vi phạm — không tốn chi phí runtime.\
- Phân biệt rõ \\"hàm đọc\\" và \\"hàm sửa\\" ngay trên signature.\
\
Lưu ý: member khai báo `mutable` có thể bị sửa ngay cả trong const method (dùng cho cache/lazy init).

## Detailed Answer (EN)
A const member function is declared with `const` after the parameter list — it commits to **not modifying the object's state** (cannot modify any non-`mutable` member).\
\
```cpp\
class Counter {\
  int count_ = 0;\
public:\
  void increment()      { count_++; }      // non-const — mutates state\
  int  value()    const { return count_; } // const — read-only\
};\
\
const Counter c;\
// c.increment();  // error — cannot call non-const method on const object\
c.value();         // OK\
```\
\
**Why it matters (const-correctness):**\
- Allows passing objects by `const\u0026` and still calling getters.\
- Compiler catches violations at compile-time — no runtime cost.\
- Clearly separates \\"read\\" functions from \\"mutate\\" functions on the signature.\
\
Note: `mutable` members can be modified even inside a const method (used for caches/lazy init).
