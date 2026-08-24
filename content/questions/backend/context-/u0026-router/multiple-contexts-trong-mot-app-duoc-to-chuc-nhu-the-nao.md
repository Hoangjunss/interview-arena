---
id: multiple-contexts-trong-mot-app-duoc-to-chuc-nhu-the-nao
position: backend
technology: context-\u0026-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Multiple contexts trong một app được tổ chức như thế nào?

## Question (EN)
How do you organize multiple contexts in an app?

## Đáp án chi tiết (VI)
Tổ chức nhiều context bằng cách: tạo nhiều Provider riêng biệt, nest chúng lại (thứ tự từ ngoài vào trong), hoặc tạo AppProviders component bọc tất cả providers. Mỗi context chịu trách nhiệm một concern (AuthContext, ThemeContext, CartContext). Tránh god context chứa tất cả global state.

## Detailed Answer (EN)
Organize multiple contexts by: creating separate, focused Providers, nesting them (outermost to innermost), or creating a single AppProviders component that wraps all providers together. Each context should own one concern (AuthContext, ThemeContext, CartContext). Avoid a single god context that holds all global state.
