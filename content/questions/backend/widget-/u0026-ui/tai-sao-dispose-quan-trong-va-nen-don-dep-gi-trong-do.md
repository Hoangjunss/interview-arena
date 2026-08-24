---
id: tai-sao-dispose-quan-trong-va-nen-don-dep-gi-trong-do
position: backend
technology: widget-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao `dispose()` quan trọng và nên dọn dẹp gì trong đó?

## Question (EN)
Why is `dispose()` important and what should you clean up there?

## Đáp án chi tiết (VI)
`dispose()` được gọi khi widget bị xóa vĩnh viễn khỏi cây. Cần dọn dẹp tài nguyên để tránh memory leak: đóng stream, dispose animation controller, hủy đăng ký change notifier, hủy timer. Không dispose đúng cách khiến app giữ tham chiếu đến object đã chết, dần dần tiêu tốn bộ nhớ cho đến khi app crash.

## Detailed Answer (EN)
`dispose()` is called when a widget is permanently removed from the tree. Clean up resources here to prevent memory leaks: close streams, dispose animation controllers, unsubscribe from change notifiers, cancel timers. Failure to dispose causes gradual memory consumption.
