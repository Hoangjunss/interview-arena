---
id: lam-sao-tranh-infinite-loop-trong-useeffect
position: backend
technology: usestate-\u0026-useeffect
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao tránh infinite loop trong useEffect?

## Question (EN)
How do you avoid infinite loops in useEffect?

## Đáp án chi tiết (VI)
Infinite loop xảy ra khi effect cập nhật state mà state đó lại là dependency của effect. Giải pháp: kiểm tra dependency array có chính xác không, dùng functional updater `setCount(c =\u003e c + 1)` thay vì reference state trong effect, tách effect thành nhiều effect với dependencies khác nhau, hoặc dùng useRef để lưu giá trị mà không trigger re-render.

## Detailed Answer (EN)
An infinite loop occurs when the effect updates state that is also listed as a dependency, causing it to re-run forever. Solutions: verify the dependency array is correct, use the functional updater `setCount(c =\u003e c + 1)` instead of referencing state directly inside the effect, split a large effect into multiple focused ones, or use useRef to store a value without triggering a re-render.
