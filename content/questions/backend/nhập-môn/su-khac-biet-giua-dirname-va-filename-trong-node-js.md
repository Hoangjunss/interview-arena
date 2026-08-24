---
id: su-khac-biet-giua-dirname-va-filename-trong-node-js
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa __dirname và __filename trong Node.js?

## Question (EN)
What is the difference between __dirname and __filename in Node.js?

## Đáp án chi tiết (VI)
`__dirname` resolve tuyệt đối từ file, không phải từ process.cwd() — trong ESM dùng `fileURLToPath(import.meta.url)` thay thế vì __dirname không tồn tại. `__dirname` cho đường dẫn tuyệt đối đến thư mục chứa file đang chạy, `__filename` cho đường dẫn đến chính file đó. Ví dụ thực tế: `path.join(__dirname, 'templates', 'email.html')` để đọc file template bất kể app được chạy từ thư mục nào — nếu dùng đường dẫn tương đối `'./templates/email.html'` sẽ resolve từ `process.cwd()` (thư mục làm việc hiện tại) và có thể sai khi chạy từ nơi khác. Lưu ý quan trọng với ES Modules: `__dirname` và `__filename` không tồn tại trong file `.mjs` hoặc khi `type: module` trong package.json. Thay thế: `import { fileURLToPath } from 'url'; import { dirname } from 'path'; const __filename = fileURLToPath(import.meta.url); const __dirname = dirname(__filename)`.

## Detailed Answer (EN)
`__dirname` resolves absolutely from the file, not from process.cwd() — in ESM use `fileURLToPath(import.meta.url)` as replacement since __dirname does not exist. `__dirname` provides the absolute path to the directory containing the currently executing file; `__filename` provides the path to the file itself. Practical example: `path.join(__dirname, 'templates', 'email.html')` reads a template file regardless of which directory the app is launched from — using a relative path `'./templates/email.html'` would resolve from `process.cwd()` (the current working directory) and could be wrong when the app is run from a different location. Important pitfall with ES Modules: `__dirname` and `__filename` do not exist in `.mjs` files or when `type: module` is set in package.json. Replacement: `import { fileURLToPath } from 'url'; import { dirname } from 'path'; const __filename = fileURLToPath(import.meta.url); const __dirname = dirname(__filename)`.
