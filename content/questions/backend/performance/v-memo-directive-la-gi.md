---
id: v-memo-directive-la-gi
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`v-memo` directive là gì?

## Question (EN)
What is the `v-memo` directive?

## Đáp án chi tiết (VI)
`v-memo` skip re-render một subtree nếu array dependency không thay đổi — tương tự `React.memo` nhưng ở template level:\
```vue\
\u003cdiv v-for=\\"item in list\\" :key=\\"item.id\\" v-memo=\\"[item.id, item.selected]\\"\u003e\
  \u003c!-- Chỉ re-render khi id hoặc selected thay đổi --\u003e\
  \u003cExpensiveComponent :item=\\"item\\" /\u003e\
\u003c/div\u003e\
```\
Dùng cho: (1) Long lists với expensive child renders (2) Chỉ một vài properties ảnh hưởng đến render. Lưu ý: không lạm dụng — dependency array phải đầy đủ, thiếu dependency sẽ gây stale render.

## Detailed Answer (EN)
`v-memo` skips re-rendering a subtree when its dependency array has not changed — similar to `React.memo` but at the template level:\
```vue\
\u003cdiv v-for=\\"item in list\\" :key=\\"item.id\\" v-memo=\\"[item.id, item.selected]\\"\u003e\
  \u003c!-- Only re-renders when id or selected changes --\u003e\
  \u003cExpensiveComponent :item=\\"item\\" /\u003e\
\u003c/div\u003e\
```\
Use for: (1) Long lists with expensive child renders (2) When only a few properties affect rendering. Pitfall: do not overuse — the dependency array must be complete; missing a dependency causes stale renders.
