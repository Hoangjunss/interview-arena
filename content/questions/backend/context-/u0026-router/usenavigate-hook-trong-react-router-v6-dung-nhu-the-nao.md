---
id: usenavigate-hook-trong-react-router-v6-dung-nhu-the-nao
position: backend
technology: context-\u0026-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useNavigate hook trong React Router v6 dùng như thế nào?

## Question (EN)
How do you use the useNavigate hook in React Router v6?

## Đáp án chi tiết (VI)
useNavigate trả về navigate function để programmatically điều hướng: `navigate('/path')`, `navigate(-1)` (back), `navigate('/path', { replace: true })`. Thay thế cho useHistory trong v5. Dùng khi cần navigate sau form submit, sau auth login, hay trong event handlers không phải JSX.

## Detailed Answer (EN)
useNavigate returns a navigate function for programmatic navigation: `navigate('/path')`, `navigate(-1)` (go back), `navigate('/path', { replace: true })`. It replaces useHistory from v5. Use it when you need to navigate after a form submission, after a successful login, or inside event handlers rather than JSX.
