---
id: focus-visible-vs-focus-khac-nhau
position: backend
technology: selectors
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
:focus-visible vs :focus khác nhau?

## Question (EN)
How do :focus-visible and :focus differ?

## Đáp án chi tiết (VI)
`:focus` trigger mọi lúc element nhận focus (cả mouse click). `:focus-visible` chỉ khi focus cần visible indicator (keyboard navigation). Dùng `:focus-visible` cho focus rings: chỉ hiện khi dùng keyboard, không khi click.

## Detailed Answer (EN)
`:focus` triggers whenever an element receives focus (including via mouse click). `:focus-visible` triggers only when the focus indicator needs to be visible (keyboard navigation). Use `:focus-visible` for focus rings: show them for keyboard users, hide them for mouse clicks.
