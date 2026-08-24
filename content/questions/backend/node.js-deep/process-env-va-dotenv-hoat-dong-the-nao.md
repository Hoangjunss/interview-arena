---
id: process-env-va-dotenv-hoat-dong-the-nao
position: backend
technology: node.js-deep
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Process.env và dotenv hoạt động thế nào?

## Question (EN)
How do process.env and dotenv work?

## Đáp án chi tiết (VI)
`process.env` là object chứa tất cả environment variables của hệ điều hành mà Node.js process có thể truy cập, ví dụ `process.env.DATABASE_URL` để lấy connection string. Thư viện dotenv đọc file `.env` ở root project và inject các biến vào `process.env` lúc khởi động app, giúp developer không cần set biến môi trường thủ công.\
\
Nguyên tắc quan trọng: file `.env` phải nằm trong `.gitignore` để không commit secrets lên repository, và tạo file `.env.example` chứa danh sách biến cần thiết (không có giá trị thật) làm template cho team.\
\
Nên validate tất cả env vars lúc app startup bằng thư viện như Zod hoặc envalid để crash sớm nếu thiếu biến, thay vì gặp lỗi runtime khó debug khi app đang chạy.

## Detailed Answer (EN)
`process.env` is an object containing all operating system environment variables accessible to the Node.js process — e.g., `process.env.DATABASE_URL` for a connection string. The dotenv library reads the `.env` file at the project root and injects its variables into `process.env` at startup, so developers don't need to set them manually. Key rules: `.env` must be in `.gitignore` to never commit secrets, and create a `.env.example` with variable names (no real values) as a template for the team. Validate all env vars at startup using Zod or envalid to fail fast if any are missing, rather than encountering cryptic runtime errors later.
