---
id: cach-dinh-nghia-actions-trong-zustand-store
position: backend
technology: zustand
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách định nghĩa actions trong Zustand store?

## Question (EN)
How do you define actions in a Zustand store?

## Đáp án chi tiết (VI)
Actions trong Zustand là plain functions sống cùng state trong store object — không có action types, không dispatch, không reducers. Có 3 pattern chính: (1) Partial update với set: `increment: () =\u003e set(s =\u003e ({ count: s.count + 1 }))`. (2) Computed values dùng get() để đọc state hiện tại bên trong action: `addItem: (item) =\u003e { const existing = get().items.find(i =\u003e i.id === item.id); set(s =\u003e ({ items: existing ? s.items.map(i =\u003e i.id === item.id ? {...i, qty: i.qty+1} : i) : [...s.items, item] })) }`. (3) Async actions — không cần thunk middleware, viết async/await trực tiếp: `fetchUser: async (id) =\u003e { set({ loading: true }); const user = await api.getUser(id); set({ user, loading: false }) }`. Multiple state updates trong một set call tự động batched. Lưu ý: `set` merge shallow — nested object phải tự spread: `set(s =\u003e ({ config: { ...s.config, theme: 'dark' } }))`.

## Detailed Answer (EN)
Actions in Zustand are plain functions that live alongside state in the store object — no action types, no dispatch, no reducers. Three main patterns: (1) Partial update with set: `increment: () =\u003e set(s =\u003e ({ count: s.count + 1 }))`. (2) Reading current state with get() inside an action: `addItem: (item) =\u003e { const existing = get().items.find(i =\u003e i.id === item.id); set(s =\u003e ({ items: existing ? s.items.map(i =\u003e i.id === item.id ? {...i, qty: i.qty+1} : i) : [...s.items, item] })) }`. (3) Async actions — no thunk middleware needed, write async/await directly: `fetchUser: async (id) =\u003e { set({ loading: true }); const user = await api.getUser(id); set({ user, loading: false }) }`. Multiple state updates in a single set call are automatically batched. Pitfall: `set` does a shallow merge — nested objects must be manually spread: `set(s =\u003e ({ config: { ...s.config, theme: 'dark' } }))`.
