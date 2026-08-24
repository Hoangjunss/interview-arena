---
id: single-file-component-sfc-la-gi
position: backend
technology: core-concepts
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Single File Component (SFC) là gì?

## Question (EN)
What is a Single File Component (SFC)?

## Đáp án chi tiết (VI)
SFC (`.vue` file) gom template, script, style vào một file duy nhất — tiện lợi cho development. Cấu trúc: `\u003ctemplate\u003e` (HTML), `\u003cscript setup\u003e` (logic), `\u003cstyle scoped\u003e` (CSS). (1) `scoped` attribute: CSS chỉ áp dụng cho component đó, tránh conflict (2) Compiler (Vite/webpack) parse và compile SFC thành JavaScript (3) Hỗ trợ lang attribute: `\u003cscript lang=\\"ts\\"\u003e`, `\u003cstyle lang=\\"scss\\"\u003e`. Lưu ý: `scoped` CSS không ảnh hưởng lên child components — dùng `:deep()` nếu cần.

## Detailed Answer (EN)
SFC (`.vue` file) combines template, script, and style in one file — convenient for development. Structure: `\u003ctemplate\u003e` (HTML), `\u003cscript setup\u003e` (logic), `\u003cstyle scoped\u003e` (CSS). (1) `scoped` attribute: CSS only applies to that component, avoids conflicts (2) Compiler (Vite/webpack) parses and compiles SFC to JavaScript (3) Supports lang attribute: `\u003cscript lang=\\"ts\\"\u003e`, `\u003cstyle lang=\\"scss\\"\u003e`. Pitfall: `scoped` CSS does not affect child components — use `:deep()` if needed.
