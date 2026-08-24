---
id: options-api-vs-composition-api-khac-nhau-gi
position: backend
technology: core-concepts
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Options API vs Composition API — khác nhau gì?

## Question (EN)
Options API vs Composition API — what is the difference?

## Đáp án chi tiết (VI)
Options API (Vue 2 style): tổ chức code theo loại (data, methods, computed, watch). Composition API (Vue 3): tổ chức code theo logic concern, dùng `setup()` hoặc `\u003cscript setup\u003e`. (1) Composition API dễ tái sử dụng logic hơn qua composables (2) TypeScript support tốt hơn trong Composition API (3) Options API vẫn được hỗ trợ đầy đủ trong Vue 3. Khuyến nghị dùng Composition API với `\u003cscript setup\u003e` cho project mới.

## Detailed Answer (EN)
Options API (Vue 2 style): organizes code by type (data, methods, computed, watch). Composition API (Vue 3): organizes by logic concern using `setup()` or `\u003cscript setup\u003e`. (1) Composition API enables better logic reuse via composables (2) Better TypeScript support in Composition API (3) Options API is still fully supported in Vue 3. Recommended: Composition API with `\u003cscript setup\u003e` for new projects.
