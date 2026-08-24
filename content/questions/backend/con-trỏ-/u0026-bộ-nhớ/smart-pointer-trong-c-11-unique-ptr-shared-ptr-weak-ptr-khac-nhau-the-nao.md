---
id: smart-pointer-trong-c-11-unique-ptr-shared-ptr-weak-ptr-khac-nhau-the-nao
position: backend
technology: con-trỏ-\u0026-bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Smart pointer trong C++11: `unique_ptr`, `shared_ptr`, `weak_ptr` khác nhau thế nào?

## Question (EN)
How do `unique_ptr`, `shared_ptr`, and `weak_ptr` differ in C++11?

## Đáp án chi tiết (VI)
**`unique_ptr`**: sở hữu độc quyền — chỉ có 1 owner, không copy được, chỉ move. Khi ra scope, tự `delete`.\
\
**`shared_ptr`**: sở hữu chia sẻ — nhiều pointer cùng quản lý 1 object qua reference count. Khi count về 0 thì object bị xóa.\
\
**`weak_ptr`**: quan sát, không tăng ref count — dùng để phá vòng tròn tham chiếu (circular reference).\
\
```cpp\
auto u = std::make_unique\u003cint\u003e(10);\
auto u2 = std::move(u);  // ownership chuyển sang u2; u = null\
\
auto s1 = std::make_shared\u003cint\u003e(20);\
auto s2 = s1;            // ref count = 2\
\
std::weak_ptr\u003cint\u003e w = s1;     // ref count vẫn = 2\
if (auto sp = w.lock()) {       // kiểm tra còn tồn tại\
  std::cout \u003c\u003c *sp;\
}\
```\
\
Hình dung: `unique_ptr` = chìa khoá nhà duy nhất; `shared_ptr` = nhiều bản sao chìa; `weak_ptr` = biết nhà ở đó nhưng không giữ chìa.

## Detailed Answer (EN)
**`unique_ptr`**: exclusive ownership — only one owner, not copyable, only movable. Automatically deletes on scope exit.\
\
**`shared_ptr`**: shared ownership — multiple pointers co-own an object via a reference count. Deletes when count reaches zero.\
\
**`weak_ptr`**: observer, does not increase ref count — used to break circular reference cycles.\
\
```cpp\
auto u = std::make_unique\u003cint\u003e(10);\
auto u2 = std::move(u);  // ownership transferred; u = null\
\
auto s1 = std::make_shared\u003cint\u003e(20);\
auto s2 = s1;            // ref count = 2\
\
std::weak_ptr\u003cint\u003e w = s1;     // ref count still = 2\
if (auto sp = w.lock()) {       // verify object still alive\
  std::cout \u003c\u003c *sp;\
}\
```\
\
Mental model: `unique_ptr` = single house key; `shared_ptr` = multiple copies of the key; `weak_ptr` = you know the address but hold no key.
