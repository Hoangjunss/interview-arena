---
id: setstate-la-gi-va-tai-sao-goi-no-lai-kich-hoat-rebuild
position: backend
technology: widget-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`setState()` là gì và tại sao gọi nó lại kích hoạt rebuild?

## Question (EN)
What is `setState()` and why does calling it trigger a rebuild?

## Đáp án chi tiết (VI)
`setState()` lên lịch rebuild subtree cho frame tiếp theo — chỉ dùng cho state UI cục bộ đơn giản, không dùng cho animation hay stream. Nó đánh dấu widget cần rebuild và thông báo cho Flutter framework; thay đổi state bên trong callback được phản ánh trong lần build tiếp theo. Không dùng `setState()` cho cập nhật liên tục (animation, stream); dùng `AnimatedBuilder` hoặc state management thay thế.

## Detailed Answer (EN)
`setState()` marks the widget as needing rebuild and notifies the Flutter framework. It schedules a rebuild during the next frame, not immediately. Never use `setState()` for frequent updates like animations; use `AnimatedBuilder` or state management solutions instead.
