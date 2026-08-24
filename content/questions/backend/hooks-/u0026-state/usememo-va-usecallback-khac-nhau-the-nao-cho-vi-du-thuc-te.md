---
id: usememo-va-usecallback-khac-nhau-the-nao-cho-vi-du-thuc-te
position: backend
technology: hooks-\u0026-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useMemo và useCallback khác nhau thế nào? Cho ví dụ thực tế?

## Question (EN)
How are useMemo and useCallback different? Give a real-world example.

## Đáp án chi tiết (VI)
useMemo cache kết quả tính toán: `useMemo(() =\u003e expensiveCalc(data), [data])`. useCallback cache function reference: `useCallback(() =\u003e handleClick(id), [id])`. useCallback dùng khi truyền callback xuống child component dùng React.memo. Lạm dụng 2 hooks này có thể giảm performance do overhead.

## Detailed Answer (EN)
useMemo caches a computed value: `useMemo(() =\u003e expensiveCalc(data), [data])`. useCallback caches a function reference: `useCallback(() =\u003e handleClick(id), [id])`. Use useCallback when passing a callback down to a child component wrapped in React.memo. Overusing both hooks can actually hurt performance due to memoization overhead.
