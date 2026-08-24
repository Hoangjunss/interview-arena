---
id: tai-sao-key-trong-v-for-quan-trong
position: backend
technology: directives
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao `:key` trong `v-for` quan trọng?

## Question (EN)
Why is `:key` in `v-for` important?

## Đáp án chi tiết (VI)
Vue dùng `:key` để identify mỗi vnode khi diff — giúp tái sử dụng và reorder DOM nodes đúng cách thay vì re-render toàn bộ. (1) Thiếu key: Vue dùng \\"in-place patch\\" — có thể gây lỗi với stateful components hoặc animation (2) Dùng index làm key: không nên khi list có thể bị sort/filter — index thay đổi gây re-render sai (3) Dùng unique stable ID (e.g., `item.id`) là best practice.

## Detailed Answer (EN)
Vue uses `:key` to identify each vnode during diffing — enabling proper DOM node reuse and reordering instead of full re-renders. (1) Missing key: Vue uses \\"in-place patch\\" — can cause bugs with stateful components or animations (2) Using index as key: avoid when list can be sorted/filtered — index changes cause incorrect re-renders (3) Use unique stable IDs (e.g., `item.id`) as best practice.
