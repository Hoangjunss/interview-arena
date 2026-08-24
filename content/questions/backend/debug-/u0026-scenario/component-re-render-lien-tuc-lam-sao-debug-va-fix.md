---
id: component-re-render-lien-tuc-lam-sao-debug-va-fix
position: backend
technology: debug-\u0026-scenario
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Component re-render liên tục, làm sao debug và fix?

## Question (EN)
A component is re-rendering continuously. How do you debug and fix it?

## Đáp án chi tiết (VI)
Continuous re-render thường do reference instability hoặc missing dependency — dùng DevTools Profiler để identify.\
\
- React DevTools Profiler: tìm component render nhiều.\
- Nguyên nhân phổ biến: tạo object/array mới trong render, missing dependency array useEffect, context value thay đổi.\
- Fix: React.memo, useMemo/useCallback, split context, move state xuống component con.

## Detailed Answer (EN)
Debug and fix continuously re-rendering components:\
\
- React DevTools Profiler: find which component renders excessively.\
- Common causes: creating new objects/arrays inline during render, missing useEffect dependency array, context value changing.\
- Fixes: React.memo, useMemo/useCallback, split the context, or move state down to a child component.
