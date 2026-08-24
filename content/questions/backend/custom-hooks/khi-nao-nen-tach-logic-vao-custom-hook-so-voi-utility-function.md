---
id: khi-nao-nen-tach-logic-vao-custom-hook-so-voi-utility-function
position: backend
technology: custom-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên tách logic vào custom hook so với utility function?

## Question (EN)
When should you extract logic into a custom hook vs a utility function?

## Đáp án chi tiết (VI)
Dùng custom hook khi logic cần: React hooks (useState, useEffect, v.v.), React lifecycle, hay stateful behavior. Dùng utility function (pure function) khi: chỉ xử lý data transformation, validation, formatting - không cần React context. Custom hook gọi được từ components, utility function gọi từ bất cứ đâu.

## Detailed Answer (EN)
Use a custom hook when the logic requires React hooks (useState, useEffect, etc.), React lifecycle behavior, or stateful behavior. Use a plain utility function (pure function) when the logic only handles data transformation, validation, or formatting — no React context needed. Custom hooks can only be called from components; utility functions can be called from anywhere.
