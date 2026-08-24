---
id: const-constructor-giup-gi-cho-hieu-nang-flutter
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
const constructor giúp gì cho hiệu năng Flutter?

## Question (EN)
How do const constructors help Flutter performance?

## Đáp án chi tiết (VI)
Widget khai báo `const` được **tạo tại compile-time và cache lại**: mọi lần dùng cùng `const` cho ra **cùng một instance**.\
\
Lợi ích:\
- Khi cha dựng lại, Flutter thấy widget con là `const` **giống hệt** instance cũ → **bỏ qua việc dựng lại và vẽ lại** subtree đó → giảm công việc mỗi frame.\
- Giảm cấp phát bộ nhớ và áp lực GC.\
\
Thực hành: đánh `const` cho widget tĩnh bất cứ khi nào có thể (linter `prefer_const_constructors` nhắc). Đây là một trong các mẹo chính để giữ **frame budget 16ms** (~60fps) và tránh jank cùng với việc dùng list builder lười và tránh `Opacity`/clip thừa.

## Detailed Answer (EN)
A widget declared `const` is **created at compile time and cached**: every use of the same `const` yields the **same instance**.\
\
Benefits:\
- When the parent rebuilds, Flutter sees the `const` child is **identical** to the old instance → it **skips rebuilding and repainting** that subtree → less work per frame.\
- Fewer allocations and less GC pressure.\
\
Practice: mark static widgets `const` whenever possible (the `prefer_const_constructors` lint reminds you). This is a key tip for staying within the **16ms frame budget** (~60fps) and avoiding jank, alongside lazy list builders and avoiding needless `Opacity`/clipping.
