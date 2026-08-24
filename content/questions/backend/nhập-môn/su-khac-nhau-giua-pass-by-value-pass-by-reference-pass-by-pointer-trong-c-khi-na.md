---
id: su-khac-nhau-giua-pass-by-value-pass-by-reference-pass-by-pointer-trong-c-khi-na
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa pass-by-value, pass-by-reference, pass-by-pointer trong C++ — khi nào dùng cái nào?

## Question (EN)
What is the difference between pass-by-value, pass-by-reference, and pass-by-pointer in C++? When should you use each?

## Đáp án chi tiết (VI)
| | Pass-by-value | Pass-by-reference (`\u0026`) | Pass-by-pointer (`*`) |\
|---|---|---|---|\
| Copy | Luôn copy | Không copy | Không copy (copy địa chỉ) |\
| Null | Không thể null | Không thể null | Có thể null |\
| Reassign | Không ảnh hưởng caller | Không reassign target | Có thể trỏ chỗ khác |\
| Dùng | Kiểu nhỏ (int, bool) | Object lớn đọc/sửa | Optional arg, array |\
\
```cpp\
void byValue(int x) { x = 100; }    // không ảnh hưởng caller\
void byRef(int\u0026 x)  { x = 100; }    // sửa biến gốc\
void byPtr(int* x)  { *x = 100; }   // sửa qua dereferencing\
\
int n = 5;\
byValue(n);  // n = 5\
byRef(n);    // n = 100\
byPtr(\u0026n);   // n = 100\
```\
\
**Quy tắc thực tế:**\
- Kiểu nhỏ (`int`, `char`, `bool`, raw pointer): pass-by-value.\
- Object lớn, chỉ đọc: `const T\u0026`.\
- Cần sửa: `T\u0026`.\
- Optional hoặc array: pointer.

## Detailed Answer (EN)
| | Pass-by-value | Pass-by-reference (`\u0026`) | Pass-by-pointer (`*`) |\
|---|---|---|---|\
| Copy | Always copies | No copy | No copy (copies address) |\
| Null | Cannot be null | Cannot be null | Can be null |\
| Reassign | No effect on caller | Cannot retarget | Can point elsewhere |\
| Use case | Small types (int, bool) | Large objects read/modify | Optional arg, array |\
\
```cpp\
void byValue(int x) { x = 100; }    // no effect on caller\
void byRef(int\u0026 x)  { x = 100; }    // modifies original\
void byPtr(int* x)  { *x = 100; }   // modifies via dereferencing\
\
int n = 5;\
byValue(n);  // n = 5\
byRef(n);    // n = 100\
byPtr(\u0026n);   // n = 100\
```\
\
**Practical rules:**\
- Small types (`int`, `char`, `bool`, raw pointer): pass-by-value.\
- Large objects, read-only: `const T\u0026`.\
- Need to modify: `T\u0026`.\
- Optional argument or array: pointer.
