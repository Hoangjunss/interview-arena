---
id: muc-dich-cua-repaintboundary-la-gi-va-khi-nao-nen-dung
position: backend
technology: widget-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mục đích của `RepaintBoundary` là gì và khi nào nên dùng?

## Question (EN)
What's the purpose of `RepaintBoundary` and when should you use it?

## Đáp án chi tiết (VI)
`RepaintBoundary` cô lập một subtree để nó vẽ lại độc lập mà không ảnh hưởng toàn bộ cây. Dùng nó xung quanh widget vẽ lại thường xuyên (animation, progress indicator). Khi con của `RepaintBoundary` thay đổi, chỉ subtree đó mới vẽ lại. Lạm dụng tạo quá nhiều boundary và giảm hiệu năng; chỉ dùng tiết kiệm cho các điểm hot đã được xác định.

## Detailed Answer (EN)
`RepaintBoundary` isolates a subtree so it repaints independently without affecting the entire tree. Use it around widgets that repaint frequently like animations or progress indicators. Misuse creates too many boundaries and reduces performance; use sparingly only around known hot spots.
