---
id: lam-the-nao-de-share-stateful-logic-giua-nhieu-components-voi-useeffect
position: backend
technology: usestate-\u0026-useeffect
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để share stateful logic giữa nhiều components với useEffect?

## Question (EN)
How do you share stateful logic across multiple components using useEffect?

## Đáp án chi tiết (VI)
Trích xuất logic vào custom hook - function bắt đầu bằng 'use'. Custom hook có thể gọi useState, useEffect và các hooks khác. Component sử dụng custom hook sẽ có state riêng biệt, không chia sẻ instance. \
\
**Ví dụ:** useWindowSize(), useDebounce(), useFetch() đều là custom hooks phổ biến.

## Detailed Answer (EN)
Extract the logic into a custom hook — a function whose name starts with 'use'. The custom hook can call useState, useEffect, and other hooks. Each component that uses the hook gets its own isolated state instance; state is not shared. Common examples include useWindowSize(), useDebounce(), and useFetch().
