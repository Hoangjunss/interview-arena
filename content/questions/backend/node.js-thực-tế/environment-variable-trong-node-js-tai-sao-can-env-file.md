---
id: environment-variable-trong-node-js-tai-sao-can-env-file
position: backend
technology: node.js-thực-tế
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Environment variable trong Node.js. Tại sao cần? .env file?

## Question (EN)
What are environment variables in Node.js? Why are they needed? What about .env files?

## Đáp án chi tiết (VI)
Environment variable dùng để lưu trữ cấu hình thay đổi theo từng môi trường (development, staging, production) như database URL, API key, port number, mà không cần thay đổi code. File .env chứa các biến này cho môi trường phát triển local, và package dotenv sẽ tự động load chúng vào process.env.\
\
Tuyệt đối không được commit file .env lên git vì chứa thông tin nhạy cảm — thay vào đó tạo file .env.example chỉ chứa tên biến không có giá trị để người khác biết cần cấu hình gì. Trên production, environment variable được cấu hình trực tiếp trên hosting platform như Vercel, AWS, hoặc Docker.

## Detailed Answer (EN)
Environment variables store configuration that changes per environment (development, staging, production) — such as database URLs, API keys, and port numbers — without modifying code. The .env file holds these values for local development; the dotenv package automatically loads them into process.env. Never commit .env to git since it contains sensitive secrets — instead, create a .env.example with only the variable names (no real values) so teammates know what to configure. In production, set environment variables directly on the hosting platform (Vercel, AWS, Docker).
