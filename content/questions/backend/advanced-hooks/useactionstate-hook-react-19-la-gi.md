---
id: useactionstate-hook-react-19-la-gi
position: backend
technology: advanced-hooks
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useActionState hook (React 19) là gì?

## Question (EN)
What is the useActionState hook in React 19?

## Đáp án chi tiết (VI)
useActionState (trước là useFormState trong React DOM) quản lý state của form action, trả về `[state, dispatch, isPending]`. Tích hợp với Server Actions trong Next.js. Thay thế pattern thủ công quản lý loading/error state khi submit form. Tự động handle pending state và error state từ action.

## Detailed Answer (EN)
useActionState (previously useFormState in React DOM) manages the state of a form action and returns `[state, dispatch, isPending]`. It integrates with Server Actions in Next.js. It replaces the manual pattern of managing loading and error state around form submissions, automatically handling the pending and error states returned from the action.
