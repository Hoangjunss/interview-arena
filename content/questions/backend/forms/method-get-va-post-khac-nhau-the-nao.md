---
id: method-get-va-post-khac-nhau-the-nao
position: backend
technology: forms
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Method GET và POST khác nhau thế nào?

## Question (EN)
How do GET and POST methods differ?

## Đáp án chi tiết (VI)
GET gắn dữ liệu vào **URL**, POST gửi trong **body**.\
\
```html\
\u003cform method=\\"get\\" action=\\"/search\\"\u003e\
  \u003cinput name=\\"q\\" value=\\"react\\"\u003e      \u003c!-- → /search?q=react --\u003e\
\u003c/form\u003e\
\
\u003cform method=\\"post\\" action=\\"/orders\\"\u003e\
  \u003cinput name=\\"card\\" value=\\"...\\"\u003e     \u003c!-- nằm trong body, không hiện trên URL --\u003e\
\u003c/form\u003e\
```\
\
| | GET | POST |\
|---|---|---|\
| Vị trí dữ liệu | query string | request body |\
| Bookmark / share link | được | không |\
| Nằm trong lịch sử \u0026 log server | có | không |\
| Browser cache | có | không |\
| F5 sau khi gửi | an toàn | hỏi gửi lại |\
| Idempotent (gửi lại không đổi kết quả) | có | không |\
\
**Điểm hay bị nói sai:** POST **không an toàn hơn** GET. Cả hai đều đi qua mạng dạng thô nếu không có HTTPS. Khác biệt thật là dữ liệu GET bị **ghi lại** ở lịch sử trình duyệt, access log, Referer header — nên đừng đưa token hay mật khẩu vào query string.\
\
**Chọn thế nào:** đọc/lọc/tìm kiếm → GET (chia sẻ được link kết quả). Tạo/sửa/xoá → POST.

## Detailed Answer (EN)
GET puts data in the **URL**, POST puts it in the **body**.\
\
```html\
\u003cform method=\\"get\\" action=\\"/search\\"\u003e\
  \u003cinput name=\\"q\\" value=\\"react\\"\u003e      \u003c!-- → /search?q=react --\u003e\
\u003c/form\u003e\
\
\u003cform method=\\"post\\" action=\\"/orders\\"\u003e\
  \u003cinput name=\\"card\\" value=\\"...\\"\u003e     \u003c!-- in the body, never in the URL --\u003e\
\u003c/form\u003e\
```\
\
| | GET | POST |\
|---|---|---|\
| Where the data lives | query string | request body |\
| Bookmarkable / shareable | yes | no |\
| Recorded in history \u0026 server logs | yes | no |\
| Browser cache | yes | no |\
| Refresh after submit | safe | asks to resend |\
| Idempotent | yes | no |\
\
**The commonly wrong answer:** POST is **not more secure** than GET. Both travel in the clear without HTTPS. The real difference is that GET data gets **recorded** — browser history, access logs, the Referer header — so never put tokens or passwords in a query string.\
\
**How to choose:** reading, filtering, searching → GET (the result URL is shareable). Creating, updating, deleting → POST.
