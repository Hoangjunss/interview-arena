---
id: web-storage-api-localstorage-va-sessionstorage-khac-nhau-o-dau
position: backend
technology: web-storage
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Web Storage API: `localStorage` và `sessionStorage` khác nhau ở đâu?

## Question (EN)
Web Storage API: how do `localStorage` and `sessionStorage` differ?

## Đáp án chi tiết (VI)
Cả hai là kho **key-value** cùng API (`setItem`, `getItem`, `removeItem`, `clear`), chỉ lưu **chuỗi**, dung lượng ~5–10MB, đồng bộ, gắn theo **origin**. Khác nhau ở **vòng đời và phạm vi**:\
\
- **`localStorage`**: tồn tại **vô thời hạn** đến khi xóa thủ công. **Chia sẻ** giữa mọi tab/cửa sổ cùng origin.\
- **`sessionStorage`**: sống theo **từng tab**, mất khi đóng tab. **Không chia sẻ** sang tab khác (kể cả cùng origin).\
\
Vì chỉ lưu string nên object phải `JSON.stringify` khi ghi và `JSON.parse` khi đọc.\
\
```js\
localStorage.setItem(\\"user\\

## Detailed Answer (EN)
Both are **key-value** stores sharing one API (`setItem`, `getItem`, `removeItem`, `clear`), hold **strings only**, ~5–10MB, synchronous, scoped per **origin**. They differ in **lifetime and scope**:\
\
- **`localStorage`**: persists **indefinitely** until cleared manually. **Shared** across all tabs/windows of the same origin.\
- **`sessionStorage`**: lives **per tab**, wiped when the tab closes. **Not shared** with other tabs (even same origin).\
\
Since only strings are stored, objects must be `JSON.stringify`-ed on write and `JSON.parse`-ed on read.\
\
```js\
localStorage.setItem(\\"user\\
