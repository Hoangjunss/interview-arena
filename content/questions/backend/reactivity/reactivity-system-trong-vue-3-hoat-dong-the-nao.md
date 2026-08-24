---
id: reactivity-system-trong-vue-3-hoat-dong-the-nao
position: backend
technology: reactivity
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reactivity system trong Vue 3 hoạt động thế nào?

## Question (EN)
How does the reactivity system work in Vue 3?

## Đáp án chi tiết (VI)
Vue 3 dùng ES6 `Proxy` để intercept get/set operations trên reactive objects. Khi đọc property trong effect (computed, watcher, render): dependency được track. Khi set property: trigger cập nhật tất cả dependents. Cải tiến so với Vue 2 (dùng `Object.defineProperty`): (1) Detect thêm/xóa property động (2) Detect array index changes và `.length` (3) Lazy — không cần walk toàn bộ object tree upfront.

## Detailed Answer (EN)
Vue 3 uses ES6 `Proxy` to intercept get/set operations on reactive objects. When a property is read inside an effect (computed, watcher, render): dependency is tracked. When a property is set: all dependents are triggered. Improvements over Vue 2 (which used `Object.defineProperty`): (1) Detects dynamic property additions/deletions (2) Detects array index changes and `.length` modifications (3) Lazy — no need to walk the full object tree upfront.
