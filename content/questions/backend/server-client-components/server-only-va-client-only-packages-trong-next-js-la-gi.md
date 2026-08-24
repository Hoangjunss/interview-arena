---
id: server-only-va-client-only-packages-trong-next-js-la-gi
position: backend
technology: server-client-components
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server-only và client-only packages trong Next.js là gì?

## Question (EN)
What are the server-only and client-only packages in Next.js?

## Đáp án chi tiết (VI)
`server-only` package throw error tại build time nếu vô tình import server code vào client bundle. `client-only` throw nếu import client code trên server. Dùng: `import 'server-only'` đầu file chứa database connections, API keys. Giúp catch mistakes sớm thay vì runtime errors hay security issues.

## Detailed Answer (EN)
The `server-only` package throws a build-time error if server code is accidentally imported into the client bundle. `client-only` throws if client code is imported on the server. Usage: add `import 'server-only'` at the top of files containing database connections or API keys. This catches mistakes early rather than discovering them as runtime errors or security vulnerabilities.
