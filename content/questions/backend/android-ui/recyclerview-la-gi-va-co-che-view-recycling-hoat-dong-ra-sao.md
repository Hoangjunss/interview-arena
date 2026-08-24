---
id: recyclerview-la-gi-va-co-che-view-recycling-hoat-dong-ra-sao
position: backend
technology: android-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`RecyclerView` là gì và cơ chế view recycling hoạt động ra sao?

## Question (EN)
What is `RecyclerView` and how does its view-recycling mechanism work?

## Đáp án chi tiết (VI)
`RecyclerView` là widget hiển thị danh sách/lưới lớn hiệu quả bằng cách **tái sử dụng** một số ít View thay vì tạo View cho mọi item. Hình dung một cửa sổ chỉ thấy vài dòng: khi cuộn, dòng trôi khỏi màn hình không bị hủy mà được đưa vào **RecycledViewPool** rồi bind lại dữ liệu mới cho dòng sắp hiện ra.\
\
Các mảnh chính:\
- **Adapter**: `onCreateViewHolder()` tạo View (ít khi được gọi), `onBindViewHolder()` gán dữ liệu (gọi liên tục khi cuộn).\
- **ViewHolder**: giữ tham chiếu tới các View con để khỏi `findViewById` lặp lại.\
- **LayoutManager**: quyết định cách sắp xếp (linear, grid, staggered).\
\
Nhờ recycling, số View giữ trong bộ nhớ xấp xỉ số item hiển thị được, không phụ thuộc tổng số item. Dùng `DiffUtil`/`ListAdapter` để cập nhật danh sách tối thiểu thay vì `notifyDataSetChanged()`.

## Detailed Answer (EN)
`RecyclerView` efficiently renders large lists/grids by **reusing** a small pool of Views instead of creating one per item. Picture a window showing only a few rows: as you scroll, a row leaving the screen isn't destroyed — it goes into the **RecycledViewPool** and is re-bound with new data for the row about to appear.\
\
Key parts:\
- **Adapter**: `onCreateViewHolder()` creates a View (called rarely), `onBindViewHolder()` binds data (called constantly while scrolling).\
- **ViewHolder**: holds references to child Views so you avoid repeated `findViewById`.\
- **LayoutManager**: decides arrangement (linear, grid, staggered).\
\
Thanks to recycling, the number of Views held in memory is roughly the number of visible items, independent of total item count. Use `DiffUtil`/`ListAdapter` for minimal updates instead of `notifyDataSetChanged()`.
