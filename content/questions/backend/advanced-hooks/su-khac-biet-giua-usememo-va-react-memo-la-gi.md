---
id: su-khac-biet-giua-usememo-va-react-memo-la-gi
position: backend
technology: advanced-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa useMemo và React.memo là gì?

## Question (EN)
What is the difference between useMemo and React.memo?

## Đáp án chi tiết (VI)
useMemo là hook memoize giá trị/kết quả tính toán bên trong component. React.memo là HOC memoize toàn bộ component, skip re-render khi props không thay đổi (shallow comparison). Kết hợp cả hai: dùng React.memo cho component, useCallback cho callback props để React.memo hoạt động hiệu quả.

## Detailed Answer (EN)
useMemo is a hook that memoizes a computed value or calculation result inside a component. React.memo is a Higher-Order Component that memoizes an entire component, skipping re-renders when props have not changed (shallow comparison). Use both together: wrap the component with React.memo and wrap callback props with useCallback so React.memo's comparison works correctly.
