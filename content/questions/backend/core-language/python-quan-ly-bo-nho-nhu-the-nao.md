---
id: python-quan-ly-bo-nho-nhu-the-nao
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Python quản lý bộ nhớ như thế nào?

## Question (EN)
How does Python manage memory?

## Đáp án chi tiết (VI)
Python dùng hai cơ chế: (1) Reference counting — mỗi object đếm số tham chiếu, về 0 thì giải phóng ngay (2) Garbage Collector (module `gc`) — phát hiện và thu hồi circular references mà reference counting không xử lý được (3) Memory Pool (PyMalloc) — tối ưu allocation cho objects nhỏ \u003c 512 bytes. Lưu ý: Circular reference giữa hai objects sẽ không bao giờ được reference counting giải phóng.

## Detailed Answer (EN)
Python uses two mechanisms: (1) Reference counting — each object tracks reference count; reaches 0 → freed immediately (2) Garbage Collector (gc module) — detects circular references that reference counting misses (3) PyMalloc memory pool — optimizes allocation for small objects \u003c 512 bytes. Pitfall: Circular references are never freed by reference counting alone.
