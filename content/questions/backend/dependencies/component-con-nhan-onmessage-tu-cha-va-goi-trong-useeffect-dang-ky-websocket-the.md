---
id: component-con-nhan-onmessage-tu-cha-va-goi-trong-useeffect-dang-ky-websocket-the
position: backend
technology: dependencies
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Component con nhận `onMessage` từ cha và gọi trong `useEffect` đăng ký WebSocket. Thêm `onMessage` vào deps thì kết nối bị mở lại liên tục, bỏ ra thì lint kêu. Xử lý thế nào?

## Question (EN)
A child receives `onMessage` from its parent and calls it inside a `useEffect` that opens a WebSocket. Adding `onMessage` to the deps reconnects constantly; leaving it out trips the lint. What is the fix?

## Đáp án chi tiết (VI)
$7a

## Detailed Answer (EN)
$7b
