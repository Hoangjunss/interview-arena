---
id: explain-react-memo-memo-hook-khi-nao-nen-dung
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Explain React.memo() \u0026 memo() hook. Khi nào nên dùng?

## Question (EN)
Explain React.memo(). When should you use it?

## Đáp án chi tiết (VI)
React.memo() là higher-order component bọc quanh functional component để bỏ qua re-render nếu props không thay đổi, so sánh bằng shallow comparison. Nên dùng khi: child component có chi phí render cao, parent re-render thường xuyên mà props của child ít thay đổi.\
\
Cần lưu ý rằng shallow comparison chỉ so sánh tham chiếu, nên nếu truyền object hoặc function mới mỗi lần render thì memo sẽ vô hiệu — vì vậy nên kết hợp với useCallback và useMemo. Không nên dùng memo cho mọi component vì bản thân việc so sánh props cũng tốn chi phí.

## Detailed Answer (EN)
React.memo() is a higher-order component that wraps a functional component to skip re-rendering when props haven't changed, using shallow comparison. Use it when: the child has an expensive render, and its parent re-renders frequently while its props rarely change. \
\
**Note:** shallow comparison only checks references — if you pass a new object or function on every render, memo is ineffective. Always combine with useCallback and useMemo. Do not memo every component; the comparison itself has a cost.
