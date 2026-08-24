---
id: react-navigation-v7-stack-tab-drawer-khi-nao-dung
position: backend
technology: navigation
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`react-navigation` v7 — Stack / Tab / Drawer khi nào dùng?

## Question (EN)
react-navigation v7 — when to use Stack vs Tab vs Drawer?

## Đáp án chi tiết (VI)
**Stack Navigator** (`@react-navigation/native-stack` hoặc `stack`): điều hướng kiểu push/pop — màn hình mới đè lên màn cũ, có animation slide từ phải. Dùng cho: detail flow, wizard, checkout. Mỗi `navigate('X')` push thêm screen vào stack, `goBack()` pop ra.\
\
**Tab Navigator** (`bottom-tabs` / `material-top-tabs`): chuyển ngang giữa các \\"section\\" của app — Home / Search / Profile. State của mỗi tab được giữ độc lập (chuyển tab không reset scroll). Dùng cho: navigation chính của app, không phải sub-flow.\
\
**Drawer Navigator** (`drawer`): menu trượt từ cạnh — phổ biến trên Android, ít dùng iOS. Dùng cho: app có 5+ section chính không vừa tab bar. iOS HIG khuyến nghị tab bar hơn drawer.\
\
**Pattern lồng (nested):** thường có Tab navigator chứa các Stack navigator con — ví dụ Home tab có HomeStack với Home screen → Detail screen → Comments screen.

## Detailed Answer (EN)
**Stack Navigator** (`@react-navigation/native-stack` or `stack`): push/pop navigation — a new screen stacks over the previous one with a slide-from-right animation. Use for detail flows, wizards, checkout. Each `navigate('X')` pushes a screen, `goBack()` pops.\
\
**Tab Navigator** (`bottom-tabs` / `material-top-tabs`): switches between top-level sections — Home / Search / Profile. Each tab keeps its state independently (switching tabs does not reset scroll). Use for the main navigation of the app, not sub-flows.\
\
**Drawer Navigator** (`drawer`): slide-out side menu — common on Android, less common on iOS. Use when 5+ main sections do not fit a tab bar. The iOS HIG prefers tab bars to drawers.\
\
**Nested pattern:** typically a Tab navigator contains child Stack navigators — e.g. the Home tab owns HomeStack with Home → Detail → Comments.
