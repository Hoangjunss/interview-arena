---
id: tai-sao-khong-nen-tao-object-array-moi-trong-jsx-props
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao không nên tạo object/array mới trong JSX props?

## Question (EN)
Why shouldn't you create new objects or arrays inline in JSX props?

## Đáp án chi tiết (VI)
`\u003cChild style={{color: 'red'}}/\u003e` tạo object mới mỗi render → Child luôn re-render dù dùng React.memo. Fix: khai báo object ngoài component hoặc useMemo. Tương tự với `onClick={() =\u003e handle(id)}` → dùng useCallback hoặc data attribute.

## Detailed Answer (EN)
`\u003cChild style={{color: 'red'}}/\u003e` creates a new object on every render, causing Child to always re-render even with React.memo. Fix: declare the object outside the component or use useMemo. Same applies to `onClick={() =\u003e handle(id)}` — use useCallback or a data attribute instead.
