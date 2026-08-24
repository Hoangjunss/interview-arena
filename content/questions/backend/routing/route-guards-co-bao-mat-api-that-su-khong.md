---
id: route-guards-co-bao-mat-api-that-su-khong
position: backend
technology: routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Route guards có bảo mật API thật sự không?

## Question (EN)
Do route guards truly secure APIs?

## Đáp án chi tiết (VI)
Không.\
\
Route guard chỉ kiểm soát navigation phía client để cải thiện UX, ví dụ redirect user chưa login hoặc chặn rời form chưa lưu. Bảo mật thật phải nằm ở backend/API authorization vì user có thể gọi API trực tiếp hoặc sửa code client. Guard nên được xem là lớp UX, không phải security boundary.

## Detailed Answer (EN)
No.\
\
A route guard only controls client-side navigation to improve UX, such as redirecting unauthenticated users or preventing navigation away from an unsaved form. Real security must live in backend/API authorization because users can call APIs directly or modify client code. Treat guards as a UX layer, not a security boundary.
