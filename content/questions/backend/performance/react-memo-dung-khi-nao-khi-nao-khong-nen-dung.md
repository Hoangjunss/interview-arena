---
id: react-memo-dung-khi-nao-khi-nao-khong-nen-dung
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React.memo dùng khi nào? Khi nào KHÔNG nên dùng?

## Question (EN)
When should you use React.memo? When should you NOT use it?

## Đáp án chi tiết (VI)
Dùng khi component nhận props ổn định, render tốn kém, và parent re-render thường xuyên mà props không đổi.\
\
KHÔNG dùng khi: component luôn nhận props mới (objects/arrays tạo mới), component render nhẹ, hoặc dùng inline callbacks (phá vỡ memo).

## Detailed Answer (EN)
Use it when a component receives stable props, has an expensive render, and its parent re-renders frequently without changing those props. Do NOT use it when: the component always receives new props (fresh objects/arrays), the component is cheap to render, or you pass inline callbacks (which break memoization).
