---
id: new-va-malloc-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`new` và `malloc` khác nhau thế nào?

## Question (EN)
What is the difference between `new` and `malloc`?

## Đáp án chi tiết (VI)
| | `new` | `malloc` |\
|---|---|---|\
| Loại | toán tử C++ | hàm C |\
| Constructor | Có, gọi tự động | Không gọi |\
| Kiểu trả về | typed pointer | `void*` |\
| Khi thất bại | throw `std::bad_alloc` | trả `nullptr` |\
| Giải phóng | `delete` / `delete[]` | `free()` |\
\
**Không trộn lẫn**: `new` phải `delete`, `malloc` phải `free`. Trong C++ hiện đại nên ưu tiên smart pointer thay vì `new` thủ công.

## Detailed Answer (EN)
| | `new` | `malloc` |\
|---|---|---|\
| Type | C++ operator | C function |\
| Constructor | Called automatically | Not called |\
| Return type | typed pointer | `void*` |\
| On failure | throws `std::bad_alloc` | returns `nullptr` |\
| Deallocation | `delete` / `delete[]` | `free()` |\
\
**Do not mix**: `new`→`delete`, `malloc`→`free`. In modern C++, prefer smart pointers over manual `new`.
