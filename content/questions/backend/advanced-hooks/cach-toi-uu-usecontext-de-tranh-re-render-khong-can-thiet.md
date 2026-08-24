---
id: cach-toi-uu-usecontext-de-tranh-re-render-khong-can-thiet
position: backend
technology: advanced-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tối ưu useContext để tránh re-render không cần thiết?

## Question (EN)
How do you optimize useContext to prevent unnecessary re-renders?

## Đáp án chi tiết (VI)
Khi context value thay đổi, mọi consumer re-render dù chỉ dùng một phần. Tối ưu: tách context thành nhiều context nhỏ hơn theo concern, memoize context value với useMemo, dùng context selector pattern hay thư viện như use-context-selector. Ngoài ra, split static và dynamic context riêng biệt.

## Detailed Answer (EN)
When a context value changes, every consumer re-renders even if it only uses a small part of the value. Optimizations: split context into smaller, focused contexts by concern, memoize the context value with useMemo, use the context selector pattern or a library like use-context-selector, and separate static from dynamic context into different providers.
