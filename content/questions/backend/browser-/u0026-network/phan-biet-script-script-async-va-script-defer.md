---
id: phan-biet-script-script-async-va-script-defer
position: backend
technology: browser-\u0026-network
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `\u003cscript\u003e`, `\u003cscript async\u003e` và `\u003cscript defer\u003e`?

## Question (EN)
Difference between `\u003cscript\u003e`, `\u003cscript async\u003e`, and `\u003cscript defer\u003e`?

## Đáp án chi tiết (VI)
- **`\u003cscript\u003e` thường**: tải rồi chạy ngay, **chặn việc parse HTML**; nhiều script chạy đúng thứ tự.\
- **`async`**: tải song song trong khi parse HTML, **chạy ngay khi tải xong** (có thể chen giữa lúc render), **KHÔNG đảm bảo thứ tự** giữa các script. Hợp script độc lập: analytics, ads.\
- **`defer`**: tải song song trong khi parse, **chạy sau khi parse xong** (ngay trước `DOMContentLoaded`), **giữ đúng thứ tự** trong tài liệu. Hợp script phụ thuộc DOM hoặc phụ thuộc nhau.\
\
Cả `async` và `defer` chỉ áp dụng cho script **external** — vô nghĩa với inline script.

## Detailed Answer (EN)
- **Plain `\u003cscript\u003e`**: fetches then executes immediately, **blocking HTML parsing**; multiple scripts run in order.\
- **`async`**: downloads in parallel while HTML parses, **runs as soon as it finishes** (can interrupt rendering), with **NO order guarantee** between scripts. Good for independent scripts: analytics, ads.\
- **`defer`**: downloads in parallel while parsing, **runs after parsing completes** (just before `DOMContentLoaded`), **preserving document order**. Good for scripts that depend on the DOM or on each other.\
\
Both `async` and `defer` apply only to **external** scripts — they have no effect on inline scripts.
