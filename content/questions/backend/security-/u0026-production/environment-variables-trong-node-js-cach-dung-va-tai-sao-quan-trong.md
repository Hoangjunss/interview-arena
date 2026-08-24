---
id: environment-variables-trong-node-js-cach-dung-va-tai-sao-quan-trong
position: backend
technology: security-\u0026-production
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Environment variables trong Node.js: cách dùng và tại sao quan trọng?

## Question (EN)
Environment variables in Node.js: how do you use them and why are they important?

## Đáp án chi tiết (VI)
Environment variables tách config khỏi code — 12-factor app methodology: config là bất kỳ thứ gì thay đổi giữa environments (dev/staging/prod). Cấu trúc .env file: `DATABASE_URL=postgresql://...`, `JWT_SECRET=...`, `NODE_ENV=development`. dotenv: `require('dotenv').config()` load .env vào process.env, KHÔNG override existing env vars — production inject trực tiếp qua Docker/K8s/CI không cần .env file. dotenv-safe: kiểm tra required vars từ `.env.example` tại startup, throw error nếu thiếu thay vì silent undefined. Config validation với Zod: `const config = z.object({ DATABASE_URL: z.string().url(), PORT: z.coerce.number().default(3000), JWT_SECRET: z.string().min(32) }).parse(process.env)` — fail fast với error rõ ràng. Tạo `config.ts` module export typed config thay vì access `process.env` trực tiếp khắp nơi — dễ test và type-safe. Lưu ý: `process.env.PORT` luôn là string, cần coerce sang number; commit .env vào git — dùng `.gitignore` và `.env.example` làm template.

## Detailed Answer (EN)
$88
