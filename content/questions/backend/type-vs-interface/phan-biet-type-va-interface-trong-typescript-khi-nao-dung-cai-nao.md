---
id: phan-biet-type-va-interface-trong-typescript-khi-nao-dung-cai-nao
position: backend
technology: type-vs-interface
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `type` và `interface` trong TypeScript? Khi nào dùng cái nào?

## Question (EN)
What is the difference between `type` and `interface` in TypeScript? When do you use each?

## Đáp án chi tiết (VI)
Cả hai đều mô tả shape của object và phần lớn thay thế được cho nhau. Khác biệt cốt lõi:\
\
- **`interface`**: mở rộng bằng `extends`, và có **declaration merging** — khai báo trùng tên sẽ **gộp** lại. Hợp public API của thư viện, mô hình hướng đối tượng.\
- **`type`** (type alias): đặt tên cho **bất kỳ** kiểu — union, intersection, tuple, primitive, mapped/conditional types. **Không** merge, **không** re-open sau khi khai báo.\
\
Quy tắc kinh nghiệm (TS team): ưu tiên `interface` cho object thuần / kế thừa; chuyển sang `type` khi cần feature chỉ `type` có (union, tuple, utility phức tạp). Khác biệt hiệu năng nhỏ, không phải yếu tố quyết định.

## Detailed Answer (EN)
Both describe the shape of an object and are mostly interchangeable. The core differences:\
\
- **`interface`**: extended with `extends`, and supports **declaration merging** — same-name declarations **merge** together. Good for library public APIs and object-oriented modeling.\
- **`type`** (type alias): names **any** type — unions, intersections, tuples, primitives, mapped/conditional types. It does **not** merge and cannot be re-opened after declaration.\
\
Rule of thumb (TS team): prefer `interface` for plain objects / inheritance; reach for `type` when you need something only `type` can express (unions, tuples, complex utilities). The performance gap is minor and not the deciding factor.
