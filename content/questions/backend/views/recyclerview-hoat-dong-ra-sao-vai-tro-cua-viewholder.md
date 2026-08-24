---
id: recyclerview-hoat-dong-ra-sao-vai-tro-cua-viewholder
position: backend
technology: views
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RecyclerView hoạt động ra sao? Vai trò của ViewHolder?

## Question (EN)
How does RecyclerView work and what is the ViewHolder's role?

## Đáp án chi tiết (VI)
RecyclerView hiển thị **danh sách lớn hiệu quả** bằng cách **tái sử dụng view** khi cuộn thay vì tạo mới cho mọi item.\
\
Các thành phần:\
- **Adapter**: gắn dữ liệu vào view; override `onCreateViewHolder()`, `onBindViewHolder()`, `getItemCount()`.\
- **ViewHolder**: **giữ tham chiếu tới các view con của một item** để khỏi phải `findViewById` lặp lại → giảm chi phí mỗi lần bind.\
- **LayoutManager**: sắp xếp item (Linear/Grid/Staggered).\
\
Cơ chế recycle: khi item cuộn ra khỏi màn, view của nó vào **pool** và được **bind lại** cho item mới. Dùng `DiffUtil`/`ListAdapter` để cập nhật danh sách mượt (chỉ đổi phần khác biệt).\
\
Đây là bản View-system; ở Compose tương đương là `LazyColumn`/`LazyRow`.

## Detailed Answer (EN)
RecyclerView displays **large lists efficiently** by **recycling views** while scrolling instead of creating new ones for every item.\
\
Parts:\
- **Adapter**: binds data to views; override `onCreateViewHolder()`, `onBindViewHolder()`, `getItemCount()`.\
- **ViewHolder**: **holds references to an item's child views** so you avoid repeated `findViewById` → less cost per bind.\
- **LayoutManager**: arranges items (Linear/Grid/Staggered).\
\
Recycling: when an item scrolls off-screen its view goes into a **pool** and is **re-bound** for a new item. Use `DiffUtil`/`ListAdapter` for smooth updates (only the changed parts).\
\
This is the View-system version; the Compose equivalent is `LazyColumn`/`LazyRow`.
