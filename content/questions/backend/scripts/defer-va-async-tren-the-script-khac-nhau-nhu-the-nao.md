---
id: defer-va-async-tren-the-script-khac-nhau-nhu-the-nao
position: backend
technology: scripts
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`defer` và `async` trên thẻ `\u003cscript\u003e` khác nhau như thế nào?

## Question (EN)
How do `defer` and `async` differ on a `\u003cscript\u003e` tag?

## Đáp án chi tiết (VI)
Cả hai đều tải script **song song** với việc parse HTML nên không chặn render. Khác nhau ở **thời điểm thực thi**:\
\
- **`async`**: chạy **ngay khi tải xong**, có thể chen ngang lúc HTML còn đang parse. Thứ tự thực thi **không đảm bảo** (script nào tải xong trước chạy trước). Hợp cho script độc lập: analytics, ads.\
- **`defer`**: chờ HTML parse xong mới chạy, **trước** sự kiện `DOMContentLoaded`. **Giữ đúng thứ tự** các thẻ trong tài liệu. Hợp cho script phụ thuộc DOM hoặc phụ thuộc nhau.\
\
Cả hai chỉ có tác dụng với script **external** (`src`); script inline bỏ qua chúng.\
\
```html\
\u003cscript src=\\"a.js\\" async\u003e\u003c/script\u003e\
\u003cscript src=\\"b.js\\" defer\u003e\u003c/script\u003e\
```

## Detailed Answer (EN)
Both download the script **in parallel** with HTML parsing, so neither blocks rendering. The difference is **when they execute**:\
\
- **`async`**: runs **as soon as it finishes downloading**, possibly interrupting HTML parsing. Execution order is **not guaranteed** (first-downloaded runs first). Good for independent scripts: analytics, ads.\
- **`defer`**: waits until HTML parsing is done, running **before** `DOMContentLoaded`. **Preserves document order**. Good for scripts that depend on the DOM or on each other.\
\
Both only apply to **external** scripts (`src`); inline scripts ignore them.\
\
```html\
\u003cscript src=\\"a.js\\" async\u003e\u003c/script\u003e\
\u003cscript src=\\"b.js\\" defer\u003e\u003c/script\u003e\
```
