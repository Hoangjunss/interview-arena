---
id: tai-sao-khong-nen-tao-component-trong-component-inline-components
position: backend
technology: performance-\u0026-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao không nên tạo component trong component (inline components)?

## Question (EN)
Why should you avoid defining components inside other components (inline components)?

## Đáp án chi tiết (VI)
Định nghĩa component bên trong component khác tạo new component type mỗi render, React unmount/remount thay vì update, gây mất state và performance issues. Luôn khai báo components ở top-level module, hoặc ngoài parent component. Nếu cần data từ parent, truyền qua props hoặc dùng children pattern.

## Detailed Answer (EN)
Defining a component inside another component creates a new component type on every render. React sees it as a different component each time and unmounts/remounts instead of updating, causing state loss and performance issues. Always declare components at the module's top level. If they need data from the parent, pass it via props or use the children pattern.
