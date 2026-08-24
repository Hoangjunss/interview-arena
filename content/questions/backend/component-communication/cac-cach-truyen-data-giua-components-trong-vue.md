---
id: cac-cach-truyen-data-giua-components-trong-vue
position: backend
technology: component-communication
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các cách truyền data giữa components trong Vue?

## Question (EN)
Ways to communicate between components in Vue?

## Đáp án chi tiết (VI)
Vue components giao tiếp qua nhiều cơ chế tùy quan hệ và chiều dữ liệu. (1) Props (parent → child): dữ liệu đi xuống, one-way (2) Emits (child → parent): event đi lên, gọi `emit()` (3) v-model: two-way binding, kết hợp props + emits (4) provide/inject: ancestor → descendant, bỏ qua intermediaries (5) Pinia (recommended) hoặc Vuex (legacy): global state store cho app-wide state (6) Event bus (ít dùng trong Vue 3): `mitt` library. Lưu ý: tránh emit từ child để trực tiếp modify prop của parent — luôn emit event để parent tự update.

## Detailed Answer (EN)
Vue components communicate through multiple mechanisms depending on the relationship and direction of data flow. (1) Props (parent → child): data flows down, one-way (2) Emits (child → parent): events flow up, call `emit()` (3) v-model: two-way binding via props + emits (4) provide/inject: ancestor → descendant, skipping intermediaries (5) Pinia (recommended) or Vuex (legacy): global state store for app-wide state (6) Event bus (less common in Vue 3): `mitt` library. Pitfall: never mutate a prop directly from a child — always emit an event and let the parent update.
