---
id: vong-doi-cua-statefulwidget-la-gi-liet-ke-cac-method-quan-trong
position: backend
technology: widget-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vòng đời của `StatefulWidget` là gì? Liệt kê các method quan trọng.

## Question (EN)
What is the lifecycle of a `StatefulWidget`? List the key methods.

## Đáp án chi tiết (VI)
`initState()` — gọi một lần khi widget được thêm vào (khởi tạo controller, listener). `didChangeDependencies()` — gọi sau initState và khi dependency thay đổi. `build()` — gọi thường xuyên, trả về widget tree. `didUpdateWidget()` — gọi khi parent rebuild với thuộc tính khác. `dispose()` — gọi một lần khi xóa (dọn dẹp tài nguyên, đóng stream). Nắm rõ vòng đời này để tránh memory leak.

## Detailed Answer (EN)
`initState()` is called once on insert. `didChangeDependencies()` is called after initState and when dependencies change. `build()` is called frequently. `didUpdateWidget()` is called when parent rebuilds with different properties. `dispose()` is called on removal — clean up resources here.
