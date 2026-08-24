---
id: cach-tao-mot-store-voi-zustand-nhu-the-nao
position: backend
technology: zustand
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tạo một store với Zustand như thế nào?

## Question (EN)
How do you create a store with Zustand?

## Đáp án chi tiết (VI)
Dùng `create` từ 'zustand', truyền vào initializer function nhận `(set, get)` và trả về object chứa cả state lẫn actions trong cùng một chỗ. `set()` merge partial state (không cần spread toàn bộ như Redux). `get()` đọc state hiện tại từ bên trong action. Ví dụ đầy đủ: `const useCartStore = create((set, get) =\u003e ({ items: [], total: 0, addItem: (item) =\u003e set((s) =\u003e ({ items: [...s.items, item], total: s.total + item.price })), clearCart: () =\u003e set({ items: [], total: 0 }), getItemCount: () =\u003e get().items.length }))`. Store trả về là một React hook, dùng trực tiếp: `const items = useCartStore(s =\u003e s.items)` hoặc `const addItem = useCartStore(s =\u003e s.addItem)`. Không cần Provider, không cần dispatch — gọi action như gọi function bình thường: `addItem(product)`. So sánh với Redux: 1 file slice Zustand thay thế được actions + actionTypes + reducer + selectors + thunk.

## Detailed Answer (EN)
Use `create` from 'zustand', passing an initializer function that receives `(set, get)` and returns an object containing both state and actions in one place. `set()` merges partial state (no need to spread everything like in Redux). `get()` reads the current state from within an action. Full example: `const useCartStore = create((set, get) =\u003e ({ items: [], total: 0, addItem: (item) =\u003e set((s) =\u003e ({ items: [...s.items, item], total: s.total + item.price })), clearCart: () =\u003e set({ items: [], total: 0 }), getItemCount: () =\u003e get().items.length }))`. The store returns a React hook, used directly: `const items = useCartStore(s =\u003e s.items)` or `const addItem = useCartStore(s =\u003e s.addItem)`. No Provider, no dispatch — call actions like regular functions: `addItem(product)`. Compared to Redux: one Zustand slice file replaces actions + actionTypes + reducer + selectors + thunks.
