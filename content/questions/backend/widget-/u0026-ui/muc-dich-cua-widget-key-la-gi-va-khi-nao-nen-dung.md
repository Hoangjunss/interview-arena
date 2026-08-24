---
id: muc-dich-cua-widget-key-la-gi-va-khi-nao-nen-dung
position: backend
technology: widget-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mục đích của widget `Key` là gì và khi nào nên dùng?

## Question (EN)
What is the purpose of widget `Key`s and when should you use them?

## Đáp án chi tiết (VI)
Key giúp bảo tồn state của widget khi thứ tự danh sách con thay đổi. Không có key, Flutter khớp widget theo kiểu và vị trí, dẫn đến lẫn lộn state. Dùng `ValueKey` cho giá trị đơn giản, `ObjectKey` cho đối tượng phức tạp. Cần thiết cho `ListView.builder`, animated lists hoặc drag-drop. Không có key khi reorder danh sách `StatefulWidget` sẽ hoán đổi state của chúng.

## Detailed Answer (EN)
Keys preserve widget state when the list of children changes order. Without keys, Flutter matches widgets by type and position, causing state corruption. Use `ValueKey` for simple values, `ObjectKey` for complex objects. Essential for `ListView.builder`, animated lists, or drag-drop.
