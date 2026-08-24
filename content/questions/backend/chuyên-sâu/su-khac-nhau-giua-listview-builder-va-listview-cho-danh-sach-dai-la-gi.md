---
id: su-khac-nhau-giua-listview-builder-va-listview-cho-danh-sach-dai-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa `ListView.builder` và `ListView` cho danh sách dài là gì?

## Question (EN)
What is the difference between `ListView.builder` and `ListView` for long lists?

## Đáp án chi tiết (VI)
`ListView` build tất cả con trước — cuộn qua danh sách 1000 item rất chậm và tốn bộ nhớ. `ListView.builder` lazily build item hiện trên màn hình: chỉ ~10 item tồn tại trong bộ nhớ mọi lúc. Luôn dùng `ListView.builder` cho danh sách động. `SliverList` là giải pháp nâng cao cho scrolling phức tạp (kết hợp list và grid). Nhầm lẫn dùng `ListView` thay `ListView.builder` là bug hiệu năng phổ biến.

## Detailed Answer (EN)
`ListView` builds all children upfront — slow and memory-intensive for large lists. `ListView.builder` lazily builds only visible items, keeping only ~10 items in memory at once. Always use `ListView.builder` for dynamic lists. Using `ListView` instead is a common performance bug.
