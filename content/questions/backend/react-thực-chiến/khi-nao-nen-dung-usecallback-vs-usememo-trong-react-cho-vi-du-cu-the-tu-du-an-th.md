---
id: khi-nao-nen-dung-usecallback-vs-usememo-trong-react-cho-vi-du-cu-the-tu-du-an-th
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng useCallback vs useMemo trong React? Cho ví dụ cụ thể từ dự án thực tế.

## Question (EN)
When should you use useCallback vs useMemo in React? Give a concrete real-project example.

## Đáp án chi tiết (VI)
useCallback dùng để giữ nguyên reference của một function qua các lần render, thường dùng khi truyền callback xuống child component đã được bọc React.memo() để tránh re-render không cần thiết.\
\
useMemo dùng để cache lại giá trị tính toán nặng, ví dụ như filtered list hoặc sorted data, chỉ tính lại khi dependency thay đổi. Trong dự án thực tế, useCallback hay dùng cho handleClick hoặc onChange prop, còn useMemo dùng cho danh sách đã lọc hoặc tính toán phức tạp trong component lớn. Lưu ý không nên lạm dụng vì bản thân memoization cũng có chi phí — chỉ dùng khi thực sự cần tối ưu.

## Detailed Answer (EN)
useCallback preserves a function's reference across renders — use it when passing a callback to a child component wrapped in React.memo() to avoid unnecessary re-renders. useMemo caches the result of an expensive computation (e.g., a filtered or sorted list) and only recalculates when a dependency changes. In real projects: useCallback for handleClick or onChange props passed to memoized children; useMemo for filtered lists or complex calculations in large components. Don't overuse either — memoization itself has a cost; only apply it when you've identified an actual performance problem.
