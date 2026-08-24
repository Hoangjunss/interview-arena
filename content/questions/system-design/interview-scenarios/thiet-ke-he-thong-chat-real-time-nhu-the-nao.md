---
id: thiet-ke-he-thong-chat-real-time-nhu-the-nao
position: system-design
technology: interview-scenarios
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế hệ thống chat real-time như thế nào?

## Question (EN)
How would you design a real-time chat system?

## Đáp án chi tiết (VI)
Hệ thống chat real-time cần dùng WebSocket để giao tiếp hai chiều giữa client và server, thay vì HTTP polling vì WebSocket giữ kết nối mở liên tục và có độ trễ thấp hơn nhiều.\
\
Phía frontend gồm các components chính: MessageList (dùng virtualized list để hiển thị hàng nghìn tin nhắn mượt mà), MessageInput, và ChatSidebar hiển thị danh sách rooms. State management nên dùng Zustand hoặc Redux để quản lý messages và online status, kết hợp Optimistic UI hiển thị tin nhắn ngay lập tức trước khi server confirm để UX mượt hơn.\
\
Cần có chiến lược reconnection tự động khi mất kết nối, lazy load tin nhắn cũ khi scroll lên, và dùng IndexedDB để cache messages offline giúp app vẫn hoạt động khi không có mạng.

## Detailed Answer (EN)
A real-time chat system needs WebSockets for bidirectional client-server communication — lower latency than HTTP polling since the connection stays open. Key frontend components: MessageList (virtualized list for smooth rendering of thousands of messages), MessageInput, and ChatSidebar (room list). Use Zustand or Redux for managing messages and online status, combined with Optimistic UI (display messages instantly before server confirmation) for smooth UX. Must include: auto-reconnection on disconnect, lazy-loading older messages on scroll-up, and IndexedDB caching for offline support.
