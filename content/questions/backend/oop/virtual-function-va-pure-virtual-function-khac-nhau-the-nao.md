---
id: virtual-function-va-pure-virtual-function-khac-nhau-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Virtual function và pure virtual function khác nhau thế nào?

## Question (EN)
What is the difference between a virtual function and a pure virtual function?

## Đáp án chi tiết (VI)
**Virtual function:** có cài đặt mặc định ở base class, class con *có thể* override.\
**Pure virtual function (`= 0`):** không có cài đặt ở base class, class con *bắt buộc* override. Class chứa pure virtual → **abstract class**, không thể tạo instance trực tiếp.\
\
```cpp\
class Shape {\
public:\
  virtual void draw() { std::cout \u003c\u003c \\"Generic shape\\"; }  // virtual — có default\
  virtual double area() = 0;    // pure virtual — bắt buộc override\
  virtual ~Shape() {}           // virtual destructor — bắt buộc khi có virtual method\
};\
\
class Circle : public Shape {\
  double r;\
public:\
  Circle(double r) : r(r) {}\
  double area() override { return 3.14 * r * r; }\
  // draw() không override → dùng bản của Shape\
};\
\
Shape* c = new Circle(5);\
c-\u003earea();  // Circle::area qua vtable\
```

## Detailed Answer (EN)
**Virtual function:** has a default implementation in the base class; derived classes *may* override it.\
**Pure virtual function (`= 0`):** no base-class implementation; derived classes *must* override it. A class with any pure virtual becomes an **abstract class** — it cannot be instantiated.\
\
```cpp\
class Shape {\
public:\
  virtual void draw() { std::cout \u003c\u003c \\"Generic shape\\"; }  // has default\
  virtual double area() = 0;     // must override\
  virtual ~Shape() {}            // required when virtual methods present\
};\
\
class Circle : public Shape {\
  double r;\
public:\
  Circle(double r) : r(r) {}\
  double area() override { return 3.14 * r * r; }\
  // draw() uses Shape's version\
};\
\
Shape* c = new Circle(5);\
c-\u003earea();  // dispatched to Circle::area via vtable\
```
