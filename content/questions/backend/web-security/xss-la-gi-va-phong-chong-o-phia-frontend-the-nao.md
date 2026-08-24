---
id: xss-la-gi-va-phong-chong-o-phia-frontend-the-nao
position: backend
technology: web-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
XSS là gì và phòng chống ở phía frontend thế nào?

## Question (EN)
What is XSS and how do you prevent it on the frontend?

## Đáp án chi tiết (VI)
XSS (Cross-Site Scripting) = chèn mã JS độc vào trang, chạy trong phiên của nạn nhân → đánh cắp token/cookie, mạo danh, đọc dữ liệu. Ba loại: **stored**, **reflected**, **DOM-based**.\
\
Phòng chống:\
- **Output encoding theo ngữ cảnh** (HTML, attribute, JS, URL).\
- **Framework tự escape**: React escape mặc định khi render `{value}` — **tránh `dangerouslySetInnerHTML` / `innerHTML`** với dữ liệu chưa lọc.\
- Nếu buộc phải render HTML người dùng nhập → **sanitize bằng DOMPurify**.\
- Ưu tiên `textContent` thay `innerHTML`.\
- **CSP** làm lớp phòng thủ chiều sâu (chặn inline/eval).

## Detailed Answer (EN)
XSS (Cross-Site Scripting) is injecting malicious JS into a page so it runs in the victim’s session — stealing tokens/cookies, impersonating, reading data. Three types: **stored**, **reflected**, **DOM-based**.\
\
Prevention:\
- **Context-aware output encoding** (HTML, attribute, JS, URL).\
- **Framework auto-escaping**: React escapes `{value}` by default — **avoid `dangerouslySetInnerHTML` / `innerHTML`** with unsanitized data.\
- If you must render user-authored HTML, **sanitize with DOMPurify**.\
- Prefer `textContent` over `innerHTML`.\
- **CSP** as defense-in-depth (blocks inline scripts / eval).
