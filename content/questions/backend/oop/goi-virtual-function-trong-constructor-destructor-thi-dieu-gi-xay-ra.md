---
id: goi-virtual-function-trong-constructor-destructor-thi-dieu-gi-xay-ra
position: backend
technology: oop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gọi virtual function trong constructor/destructor thì điều gì xảy ra?

## Question (EN)
What happens if you call a virtual function inside a constructor/destructor?

## Đáp án chi tiết (VI)
Trong lúc dựng hoặc hủy, **kiểu động** của object chính là lớp đang chạy constructor/destructor — chưa/không còn là lớp dẫn xuất.\
\
- Trong constructor của `Base`: object \\"chưa phải\\" `Derived` → lời gọi virtual phân giải về phiên bản của `Base`, **không** phải override của `Derived`.\
- Trong destructor: phần `Derived` đã bị hủy trước → cũng gọi về `Base`.\
\
Hệ quả: **đừng trông đợi dynamic dispatch trong ctor/dtor** (Effective C++, Item 9). Nếu đó là pure virtual không có định nghĩa → undefined behavior.\
\
Muốn hành vi phụ thuộc dẫn xuất, dùng \\"khởi tạo hai pha\\": gọi một hàm `init()` riêng sau khi object đã dựng xong.

## Detailed Answer (EN)
During construction or destruction, the object dynamic type is the class whose constructor/destructor is currently running — not yet (or no longer) the derived class.\
\
- Inside `Base` constructor: the object is \\"not yet\\" a `Derived` → the virtual call resolves to `Base` version, **not** the `Derived` override.\
- Inside a destructor: the `Derived` part is already gone → it also resolves to `Base`.\
\
Consequence: **do not expect dynamic dispatch in a ctor/dtor** (Effective C++, Item 9). If it is a pure virtual with no definition → undefined behavior.\
\
For derived-dependent behavior, use two-phase init: call a separate `init()` after the object is fully constructed.
