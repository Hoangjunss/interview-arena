---
id: const-va-define-nen-dung-cai-nao-vi-sao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`const` và `#define` — nên dùng cái nào, vì sao?

## Question (EN)
`const` vs `#define` — which should you use, and why?

## Đáp án chi tiết (VI)
Ưu tiên **`const`** (Effective C++, Item 2: \\"Prefer consts to #defines\\").\
\
`#define` chỉ là **thay thế văn bản** ở giai đoạn tiền xử lý:\
- **Không có kiểu**, không có scope — không tuân theo namespace hay class.\
- Tên biến mất trước khi compiler thấy → **debugger không hiển thị tên**, thông báo lỗi khó truy.\
\
`const` có kiểu, có scope, được compiler kiểm tra:\
```cpp\
#define PI 3.14159      // không kiểu, không scope\
const double kPi = 3.14159;   // có kiểu, debug được\
```\
\
Hằng compile-time hiện đại dùng `constexpr`. Chỉ giữ `#define` cho include guard và biên dịch có điều kiện.

## Detailed Answer (EN)
Prefer **`const`** (Effective C++, Item 2: \\"Prefer consts to #defines\\").\
\
`#define` is just **text substitution** by the preprocessor:\
- **No type**, no scope — it ignores namespaces and classes.\
- The name is gone before the compiler sees it → the **debugger cannot show it**, and error messages are hard to trace.\
\
`const` has a type, a scope, and is checked by the compiler:\
```cpp\
#define PI 3.14159      // untyped, no scope\
const double kPi = 3.14159;   // typed, debuggable\
```\
\
For compile-time constants, modern C++ uses `constexpr`. Keep `#define` only for include guards and conditional compilation.
