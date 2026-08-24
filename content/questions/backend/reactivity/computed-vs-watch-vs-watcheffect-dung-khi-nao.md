---
id: computed-vs-watch-vs-watcheffect-dung-khi-nao
position: backend
technology: reactivity
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`computed` vs `watch` vs `watchEffect` — dùng khi nào?

## Question (EN)
`computed` vs `watch` vs `watchEffect` — when to use each?

## Đáp án chi tiết (VI)
`computed`: derive giá trị từ reactive state, kết quả được cache, chỉ recompute khi dependency thay đổi — dùng để transform/calculate data cho template.\
\
`watch`: observe cụ thể một hoặc vài sources, có access vào old/new value, lazy by default — dùng khi cần side effect (API call, DOM manipulation) khi data thay đổi.\
\
`watchEffect`: auto-track tất cả reactive dependencies dùng bên trong, chạy ngay khi mount — dùng khi không cần old value và muốn auto-dependency detection.

## Detailed Answer (EN)
`computed`: derives a value from reactive state, result is cached, recomputes only when dependencies change — use for transforming/calculating data for the template. `watch`: observes specific sources, accesses old/new values, lazy by default — use for side effects (API calls, DOM manipulation) when data changes. `watchEffect`: auto-tracks all reactive dependencies used inside, runs immediately on mount — use when old value is not needed and auto-dependency detection is desired.
