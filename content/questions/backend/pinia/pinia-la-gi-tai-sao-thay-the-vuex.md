---
id: pinia-la-gi-tai-sao-thay-the-vuex
position: backend
technology: pinia
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pinia là gì? Tại sao thay thế Vuex?

## Question (EN)
What is Pinia? Why replace Vuex?

## Đáp án chi tiết (VI)
Pinia là official state management library cho Vue 3 — thay thế Vuex. \
\
**Ưu điểm:** (1) Composition API-friendly, không cần mutations (2) TypeScript support tốt hơn nhiều (3) Không có nested modules, mỗi store là một module độc lập (4) Bundle nhỏ hơn (~1KB) (5) Devtools support, hot-reload (6) Server-side rendering support. Vuex 4 (dành cho Vue 3) hiện ở maintenance-only mode; Vuex 5 đã bị hủy — Pinia là official successor.

## Detailed Answer (EN)
Pinia is the official state management library for Vue 3 — replacing Vuex. \
\
**Advantages:** (1) Composition API-friendly, no mutations needed (2) Significantly better TypeScript support (3) No nested modules — each store is an independent module (4) Smaller bundle (~1KB) (5) Devtools support, hot-reload (6) SSR support. Vuex 4 (for Vue 3) is in maintenance-only mode; Vuex 5 was cancelled — Pinia is the official successor.
