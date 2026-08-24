---
id: server-component-co-the-import-client-component-khong-va-nguoc-lai
position: backend
technology: server-client-components
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server Component có thể import Client Component không và ngược lại?

## Question (EN)
Can a Server Component import a Client Component and vice versa?

## Đáp án chi tiết (VI)
Server Component có thể import và render Client Component - đây là hướng dependency bình thường. Ngược lại: Client Component KHÔNG thể import Server Component vì server component sẽ bị client-ize. Nhưng Server Component có thể truyền Server Component làm children/props cho Client Component (pattern được phép).

## Detailed Answer (EN)
A Server Component can import and render a Client Component — this is the normal dependency direction. The reverse is not allowed: a Client Component CANNOT import a Server Component because the server component would be pulled into the client bundle. However, a Server Component can pass another Server Component as children or props to a Client Component — this pattern is permitted.
