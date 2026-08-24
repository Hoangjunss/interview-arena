---
id: phan-biet-cookie-localstorage-va-sessionstorage
position: backend
technology: trình-duyệt-\u0026-nền-tảng
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt cookie, localStorage và sessionStorage?

## Question (EN)
Difference between cookies, localStorage, and sessionStorage?

## Đáp án chi tiết (VI)
Cả ba lưu dữ liệu ở client nhưng khác nhau rõ:\
\
| | Cookie | localStorage | sessionStorage |\
|---|---|---|---|\
| Dung lượng | ~4KB | ~5–10MB | ~5–10MB |\
| Gửi kèm request | **Có** (mỗi HTTP request) | Không | Không |\
| Vòng đời | theo `Expires`/`Max-Age` | tới khi bị xóa | hết khi đóng **tab** |\
| Phạm vi | theo domain/path | theo origin | theo origin **+ tab** |\
| API JS đọc được | trừ khi `HttpOnly` | có | có |\
\
Chọn:\
- **Cookie** cho dữ liệu server cần mỗi request (phiên đăng nhập) — đặt `HttpOnly`, `Secure`, `SameSite`.\
- **localStorage** cho dữ liệu client bền, không nhạy cảm (theme, cấu hình UI).\
- **sessionStorage** cho state tạm theo tab (bước wizard, form nháp).\
\
Cả hai Web Storage đều **đồng bộ + chỉ chuỗi** (phải `JSON.stringify`), và **không nên** lưu token nhạy cảm vì JS/XSS đọc được.

## Detailed Answer (EN)
All three store data on the client but differ clearly:\
\
| | Cookie | localStorage | sessionStorage |\
|---|---|---|---|\
| Size | ~4KB | ~5–10MB | ~5–10MB |\
| Sent with requests | **Yes** (every HTTP request) | No | No |\
| Lifetime | per `Expires`/`Max-Age` | until cleared | ends when the **tab** closes |\
| Scope | per domain/path | per origin | per origin **+ tab** |\
| Readable by JS | unless `HttpOnly` | yes | yes |\
\
Choose:\
- **Cookies** for data the server needs each request (login session) — set `HttpOnly`, `Secure`, `SameSite`.\
- **localStorage** for durable, non-sensitive client data (theme, UI settings).\
- **sessionStorage** for temporary per-tab state (wizard steps, draft forms).\
\
Both Web Storage APIs are **synchronous + string-only** (need `JSON.stringify`), and you **should not** store sensitive tokens there since JS/XSS can read them.
