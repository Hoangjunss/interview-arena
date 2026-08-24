---
id: const-voi-con-tro-const-int-int-const-const-int-const-khac-nhau-the-nao
position: backend
technology: con-trỏ-\u0026-bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`const` với con trỏ: `const int*`, `int* const`, `const int* const` khác nhau thế nào?

## Question (EN)
What is the difference between `const int*`, `int* const`, and `const int* const`?

## Đáp án chi tiết (VI)
Đọc từ phải sang trái: \\"const\\" gần nhất áp dụng cho phần tử đứng trước nó.\
\
```cpp\
const int* p;       // pointer to const int  — địa chỉ có thể đổi, *p không đổi được\
int* const p;       // const pointer to int  — địa chỉ không đổi, *p đổi được\
const int* const p; // const pointer to const int — cả hai đều không đổi\
```\
\
Ví dụ thực tế:\
```cpp\
int x = 1, y = 2;\
\
const int* p1 = \u0026x;\
// *p1 = 10;  // lỗi — giá trị không sửa được\
p1 = \u0026y;    // OK — pointer có thể trỏ chỗ khác\
\
int* const p2 = \u0026x;\
*p2 = 10;   // OK — giá trị sửa được\
// p2 = \u0026y; // lỗi — pointer không trỏ lại được\
```\
\
Hình dung: `const` trước `*` = bảo vệ dữ liệu; `const` sau `*` = bảo vệ địa chỉ.

## Detailed Answer (EN)
Read right-to-left: the nearest `const` applies to the element immediately before it.\
\
```cpp\
const int* p;       // pointer to const int  — address changeable, *p immutable\
int* const p;       // const pointer to int  — address immutable, *p changeable\
const int* const p; // const pointer to const int — both immutable\
```\
\
Practical example:\
```cpp\
int x = 1, y = 2;\
\
const int* p1 = \u0026x;\
// *p1 = 10;  // error — value is read-only\
p1 = \u0026y;    // OK — pointer can be retargeted\
\
int* const p2 = \u0026x;\
*p2 = 10;   // OK — value is writable\
// p2 = \u0026y; // error — pointer cannot be retargeted\
```\
\
Mental model: `const` before `*` = protect the data; `const` after `*` = protect the address.
