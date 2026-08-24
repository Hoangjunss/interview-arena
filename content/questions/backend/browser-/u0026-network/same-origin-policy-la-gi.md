---
id: same-origin-policy-la-gi
position: backend
technology: browser-\u0026-network
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Same-Origin Policy là gì?

## Question (EN)
What is the Same-Origin Policy?

## Đáp án chi tiết (VI)
Origin = **scheme + host + port**; hai URL cùng origin khi cả ba khớp (khác scheme `http`/`https`, khác port, hay khác subdomain đều là cross-origin).\
\
SOP hạn chế tương tác cross-origin:\
- **Đọc** cross-origin (fetch/XHR đọc nội dung response) → **chặn** mặc định, muốn đọc phải qua CORS.\
- **Nhúng** cross-origin (`\u003cimg\u003e`, `\u003cscript\u003e`, `\u003clink rel=stylesheet\u003e`, `\u003ciframe\u003e`, font) → **cho phép**, nhưng chỉ lộ metadata chứ không cho JS đọc nội dung.\
- **Ghi/điều hướng** cross-origin (click link, submit form) → thường cho phép.\
\
Giao tiếp giữa hai window khác origin dùng `window.postMessage`.

## Detailed Answer (EN)
An origin = **scheme + host + port**; two URLs share an origin only when all three match (different `http`/`https` scheme, different port, or different subdomain are all cross-origin).\
\
The SOP restricts cross-origin interactions:\
- **Reads** (fetch/XHR reading a response body) → **blocked** by default; reading requires CORS.\
- **Embedding** (`\u003cimg\u003e`, `\u003cscript\u003e`, `\u003clink rel=stylesheet\u003e`, `\u003ciframe\u003e`, fonts) → **allowed**, but only leaks metadata, not readable content.\
- **Writes/navigation** (clicking a link, submitting a form) → generally allowed.\
\
Use `window.postMessage` to communicate between two windows of different origins.
