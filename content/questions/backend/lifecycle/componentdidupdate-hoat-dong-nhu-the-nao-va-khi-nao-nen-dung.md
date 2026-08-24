---
id: componentdidupdate-hoat-dong-nhu-the-nao-va-khi-nao-nen-dung
position: backend
technology: lifecycle
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
componentDidUpdate hoạt động như thế nào và khi nào nên dùng?

## Question (EN)
How does componentDidUpdate work and when should you use it?

## Đáp án chi tiết (VI)
componentDidUpdate(prevProps, prevState) được gọi sau mỗi lần re-render (trừ lần đầu mount). So sánh prevProps/prevState với giá trị hiện tại để quyết định có nên thực hiện side effects không. Luôn wrap code trong điều kiện `if (prevProps.id !== this.props.id)` để tránh infinite loop.

## Detailed Answer (EN)
componentDidUpdate(prevProps, prevState) is called after every re-render except the initial mount. Compare prevProps or prevState against current values to decide whether to perform a side effect. Always wrap your code in a condition like `if (prevProps.id !== this.props.id)` to avoid creating an infinite loop.
