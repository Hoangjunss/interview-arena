---
id: componentwillunmount-dung-de-lam-gi
position: backend
technology: lifecycle
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
componentWillUnmount dùng để làm gì?

## Question (EN)
What is componentWillUnmount used for?

## Đáp án chi tiết (VI)
componentWillUnmount được gọi ngay trước khi component bị xóa khỏi DOM — đây là nơi bắt buộc phải cleanup để tránh memory leak. \
\
**Ví dụ:** `clearInterval(this.timerId)`, hủy WebSocket subscription, gọi `controller.abort()` để cancel fetch đang chạy. Không được gọi setState ở đây vì component không còn tồn tại. Tương đương hàm cleanup `return () =\u003e clearInterval(id)` trả về trong useEffect.

## Detailed Answer (EN)
componentWillUnmount is called just before the component is removed from the DOM — this is where you must clean up to avoid memory leaks. Examples: `clearInterval(this.timerId)`, unsubscribing from a WebSocket, or calling `controller.abort()` to cancel an in-flight fetch. Do not call setState here since the component no longer exists. The equivalent in function components is the cleanup function returned from useEffect: `return () =\u003e clearInterval(id)`.
