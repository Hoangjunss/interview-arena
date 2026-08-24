---
id: vtable-virtual-table-hoat-dong-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vtable (virtual table) hoạt động thế nào?

## Question (EN)
How does the vtable (virtual table) work in C++?

## Đáp án chi tiết (VI)
Khi class có ít nhất 1 virtual function, compiler tạo một **vtable** — mảng các con trỏ hàm cho class đó. Mỗi object có thêm một hidden pointer (**vptr**) trỏ tới vtable của class thực sự.\
\
```\
Shape vtable: [ draw → Shape::draw, area → 0 (pure) ]\
Circle vtable: [ draw → Shape::draw, area → Circle::area ]\
```\
\
Khi gọi `s-\u003earea()` (s là `Shape*` trỏ `Circle`): đọc vptr → tra vtable → gọi `Circle::area`. Toàn bộ quá trình trong 1 indirect call.\
\
**Chi phí:** thêm 1 pointer (~8 bytes) mỗi object + 1 indirect function call. Trong phần lớn ứng dụng, chi phí này không đáng kể.\
\
Lý do phải khai báo **virtual destructor**: nếu không, khi `delete shape_ptr` compiler chỉ gọi `Shape::~Shape` bỏ qua `Circle::~Circle` → undefined behavior (biểu hiện thường là memory leak hoặc resource không được giải phóng).

## Detailed Answer (EN)
When a class has at least one virtual function, the compiler creates a **vtable** — an array of function pointers for that class. Each object gets a hidden **vptr** pointing to its actual class's vtable.\
\
```\
Shape vtable:  [ draw → Shape::draw, area → 0 (pure) ]\
Circle vtable: [ draw → Shape::draw, area → Circle::area ]\
```\
\
Calling `s-\u003earea()` (s is `Shape*` pointing to `Circle`): read vptr → look up vtable → call `Circle::area`. One indirect call total.\
\
**Cost:** one extra pointer (~8 bytes) per object + one indirect function call instead of a direct call. Negligible in most applications.\
\
Why declare a **virtual destructor**: without it, `delete shape_ptr` only calls `Shape::~Shape` and skips `Circle::~Circle` → undefined behavior (commonly manifests as memory leak or unreleased resources).
