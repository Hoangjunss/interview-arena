---
id: tham-chieu-trong-c-la-gi-khac-con-tro-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tham chiếu (`\u0026`) trong C++ là gì? Khác con trỏ thế nào?

## Question (EN)
What is a reference in C++, and how does it differ from a pointer?

## Đáp án chi tiết (VI)
Tham chiếu là **alias** của một biến đã tồn tại — cùng địa chỉ, cùng giá trị, khác tên gọi.\
\
```cpp\
int x = 10;\
int\u0026 ref = x;  // ref là bí danh của x\
ref = 20;      // x cũng thành 20\
```\
\
**Khác con trỏ:**\
| | Tham chiếu | Con trỏ |\
|---|---|---|\
| Null | Không được null | Có thể null |\
| Reassign | Không đổi được target | Có thể |\
| Cú pháp | dùng `.` | dùng `-\u003e` hoặc `*` |\
| Phép toán | không có arithmetic | có pointer arithmetic |\
\
Hình dung: tham chiếu là \\"tên khác\\" của cùng một căn nhà; con trỏ là \\"địa chỉ\\" trên bản đồ.

## Detailed Answer (EN)
A reference is an **alias** for an existing variable — same address, same value, different name.\
\
```cpp\
int x = 10;\
int\u0026 ref = x;  // ref is an alias of x\
ref = 20;      // x becomes 20 too\
```\
\
**Differences from pointers:**\
| | Reference | Pointer |\
|---|---|---|\
| Null | Cannot be null | Can be null |\
| Reassign | Always binds to same target | Can be retargeted |\
| Syntax | uses `.` | uses `-\u003e` or `*` |\
| Arithmetic | none | supports pointer arithmetic |\
\
Mental model: a reference is another name for the same house; a pointer is the street address on a map.
