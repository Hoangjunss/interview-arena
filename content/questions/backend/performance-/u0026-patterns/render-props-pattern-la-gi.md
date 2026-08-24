---
id: render-props-pattern-la-gi
position: backend
technology: performance-\u0026-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Render props pattern là gì?

## Question (EN)
What is the render props pattern?

## Đáp án chi tiết (VI)
Render props là technique chia sẻ code giữa components dùng prop là function trả về React element. Component nhận function prop gọi nó với internal state/logic: `\u003cMouse render={({ x, y }) =\u003e \u003cCat x={x} y={y} /\u003e} /\u003e`. Linh hoạt hơn HOC vì tránh naming collisions. Custom hooks giờ thường là giải pháp cleaner hơn.

## Detailed Answer (EN)
Render props is a technique for sharing code between components using a prop that is a function returning a React element. The component calls the function prop with its internal state or logic: `\u003cMouse render={({ x, y }) =\u003e \u003cCat x={x} y={y} /\u003e} /\u003e`. It is more flexible than HOCs because it avoids naming collisions. Custom hooks are now generally the cleaner alternative.
