---
id: shouldcomponentupdate-hoat-dong-nhu-the-nao-va-khi-nao-nen-dung
position: backend
technology: lifecycle
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
shouldComponentUpdate hoạt động như thế nào và khi nào nên dùng?

## Question (EN)
How does shouldComponentUpdate work and when should you use it?

## Đáp án chi tiết (VI)
shouldComponentUpdate(nextProps, nextState) trả về boolean, quyết định component có re-render hay không. Mặc định return true. Dùng để tối ưu performance bằng cách skip render khi props/state không thực sự thay đổi. React.PureComponent tự động implement với shallow comparison. Với function components, dùng React.memo thay thế.

## Detailed Answer (EN)
shouldComponentUpdate(nextProps, nextState) returns a boolean that tells React whether to re-render the component. It defaults to true. Use it to optimize performance by skipping renders when props or state have not meaningfully changed. React.PureComponent implements this automatically with a shallow comparison. For function components, use React.memo instead.
