---
id: accessiblity-a11y-trong-vue-best-practices
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
accessiblity (a11y) trong Vue — best practices?

## Question (EN)
Accessibility (a11y) in Vue — best practices?

## Đáp án chi tiết (VI)
Vue a11y best practices theo chuẩn ARIA và semantic HTML, kết hợp Vue-specific tooling như `vue-axe` và `eslint-plugin-vuejs-accessibility` để phát hiện vấn đề sớm. (1) Dùng semantic HTML trong templates (`\u003cbutton\u003e` không phải `\u003cdiv @click\u003e`) (2) `:aria-label`, `:aria-expanded`, `:aria-live` với dynamic content (3) Focus management với `nextTick` và `el.focus()` sau modal open/close (4) `v-bind=\\"$attrs\\"` để inherit aria attrs (5) `axe-core` hoặc `vue-axe` plugin để audit a11y trong dev (6) Keyboard navigation — test với Tab, Enter, Esc (7) Color contrast ratio ≥ 4.5:1 cho text. Dùng `eslint-plugin-vuejs-accessibility` để lint a11y issues.

## Detailed Answer (EN)
(1) Use semantic HTML in templates (`\u003cbutton\u003e` not `\u003cdiv @click\u003e`) (2) `:aria-label`, `:aria-expanded`, `:aria-live` for dynamic content (3) Focus management via `nextTick` and `el.focus()` after modal open/close (4) `v-bind=\\"$attrs\\"` to inherit aria attrs (5) `axe-core` or `vue-axe` plugin for dev a11y auditing (6) Keyboard navigation — test with Tab, Enter, Esc (7) Color contrast ratio ≥ 4.5:1 for text. Use `eslint-plugin-vuejs-accessibility` to lint a11y issues.
