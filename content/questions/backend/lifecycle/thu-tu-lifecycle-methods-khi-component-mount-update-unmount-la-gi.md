---
id: thu-tu-lifecycle-methods-khi-component-mount-update-unmount-la-gi
position: backend
technology: lifecycle
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thứ tự lifecycle methods khi component mount, update, unmount là gì?

## Question (EN)
What is the order of lifecycle methods during mount, update, and unmount?

## Đáp án chi tiết (VI)
Thứ tự lifecycle methods qua 3 giai đoạn:\
\
- Mount: constructor → getDerivedStateFromProps → render → DOM update → componentDidMount.\
- Update: getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → DOM update → componentDidUpdate.\
- Unmount: componentWillUnmount → component bị xóa.\
- Với concurrent mode, render phase có thể bị interrupt.

## Detailed Answer (EN)
Lifecycle methods go through 3 phases:\
\
- Mount: constructor → getDerivedStateFromProps → render → DOM update → componentDidMount.\
- Update: getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → DOM update → componentDidUpdate.\
- Unmount: componentWillUnmount → component removed.\
- In Concurrent Mode, the render phase can be interrupted and restarted.
