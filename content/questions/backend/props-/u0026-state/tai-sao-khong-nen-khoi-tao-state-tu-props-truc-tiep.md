---
id: tai-sao-khong-nen-khoi-tao-state-tu-props-truc-tiep
position: backend
technology: props-\u0026-state
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao không nên khởi tạo state từ props trực tiếp?

## Question (EN)
Why should you avoid initializing state directly from props?

## Đáp án chi tiết (VI)
Khởi tạo state từ props (`useState(props.value)`) chỉ chạy một lần khi mount, khi props thay đổi state sẽ không cập nhật theo. Đây là anti-pattern gây ra bugs khó phát hiện. Nếu cần derived state từ props, hoặc tính toán trong render, hoặc dùng useEffect để sync, hoặc làm component fully controlled.

## Detailed Answer (EN)
Initializing state from props (`useState(props.value)`) only runs once on mount — when props change later, the state does not update. This is an anti-pattern that causes subtle, hard-to-find bugs. If you need derived state from props, either compute it during render, sync it with useEffect, or make the component fully controlled.
