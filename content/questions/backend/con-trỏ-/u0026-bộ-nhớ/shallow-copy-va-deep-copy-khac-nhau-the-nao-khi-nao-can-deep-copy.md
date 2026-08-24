---
id: shallow-copy-va-deep-copy-khac-nhau-the-nao-khi-nao-can-deep-copy
position: backend
technology: con-trỏ-\u0026-bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Shallow copy và deep copy khác nhau thế nào? Khi nào cần deep copy?

## Question (EN)
What is the difference between shallow copy and deep copy in C++? When is deep copy needed?

## Đáp án chi tiết (VI)
**Shallow copy** (mặc định của compiler): copy từng byte — với member là pointer, cả hai object cùng trỏ về cùng vùng nhớ. Giải phóng một cái → cái kia thành dangling pointer.\
\
**Deep copy**: copy cả nội dung mà pointer trỏ tới — hai object hoàn toàn độc lập.\
\
```cpp\
struct Good {\
  int* data;\
  Good(int v) { data = new int(v); }\
  ~Good() { delete data; }\
  Good(const Good\u0026 o) { data = new int(*o.data); }  // deep copy\
  Good\u0026 operator=(const Good\u0026 o) {\
    if (this != \u0026o) { *data = *o.data; }\
    return *this;\
  }\
};\
```\
\
Quy tắc kinh nghiệm: nếu class tự quản lý tài nguyên (raw pointer, file handle...) → phải định nghĩa cả destructor + copy constructor + copy assignment (**Rule of Three**).

## Detailed Answer (EN)
**Shallow copy** (compiler default): copies each byte — for pointer members, both objects point to the same memory. Freeing one leaves the other with a dangling pointer.\
\
**Deep copy**: copies the content the pointer points to — both objects are fully independent.\
\
```cpp\
struct Good {\
  int* data;\
  Good(int v) { data = new int(v); }\
  ~Good() { delete data; }\
  Good(const Good\u0026 o) { data = new int(*o.data); }  // deep copy\
  Good\u0026 operator=(const Good\u0026 o) {\
    if (this != \u0026o) { *data = *o.data; }\
    return *this;\
  }\
};\
```\
\
Rule of thumb: if a class manages a resource (raw pointer, file handle...) → define destructor + copy constructor + copy assignment (**Rule of Three**).
