---
id: struct-va-class-trong-c-khac-nhau-the-nao
position: backend
technology: oop
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`struct` và `class` trong C++ khác nhau thế nào?

## Question (EN)
What is the difference between `struct` and `class` in C++?

## Đáp án chi tiết (VI)
Khác biệt kỹ thuật **duy nhất**: mức truy cập mặc định.\
- `struct`: thành viên và kế thừa mặc định **public**.\
- `class`: mặc định **private**.\
\
Ngoài ra hai từ khóa hoàn toàn tương đương — `struct` vẫn có method, constructor, kế thừa, template như `class`.\
\
```cpp\
struct A { int x; };        // x public\
class  B { int x; };        // x private\
```\
\
Quy ước: dùng `struct` cho kiểu chứa dữ liệu thuần (không invariant); dùng `class` khi có bất biến cần đóng gói bằng `private` + method.

## Detailed Answer (EN)
The **only** technical difference: the default access level.\
- `struct`: members and inheritance are **public** by default.\
- `class`: **private** by default.\
\
Otherwise the two keywords are fully equivalent — a `struct` can have methods, constructors, inheritance, and templates just like a `class`.\
\
```cpp\
struct A { int x; };        // x is public\
class  B { int x; };        // x is private\
```\
\
Convention: use `struct` for plain data holders (no invariant); use `class` when there is an invariant to encapsulate with `private` + methods.
