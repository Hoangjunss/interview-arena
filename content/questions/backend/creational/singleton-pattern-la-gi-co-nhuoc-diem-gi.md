---
id: singleton-pattern-la-gi-co-nhuoc-diem-gi
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Singleton pattern là gì? Có nhược điểm gì?

## Question (EN)
What is the Singleton pattern and what are its drawbacks?

## Đáp án chi tiết (VI)
Singleton đảm bảo một lớp chỉ có **đúng một thể hiện (instance)** trong toàn ứng dụng và cung cấp một **điểm truy cập toàn cục** tới nó. Thường dùng cho tài nguyên dùng chung: config, logger, connection pool, cache.\
\
Cách làm điển hình: constructor private + một biến static giữ instance + phương thức `getInstance()` tạo lười (lazy) khi cần lần đầu.\
\
Nhược điểm (hay bị hỏi):\
- Thực chất là **global state** → khó test (khó mock/inject), che giấu phụ thuộc, dễ gây coupling ngầm.\
- **Không an toàn đa luồng** nếu khởi tạo lười mà không đồng bộ (cần double-checked locking hoặc eager init).\
- Vi phạm Single Responsibility (vừa lo nghiệp vụ vừa lo vòng đời của chính nó).\
\
Thay thế hiện đại: dùng **dependency injection** với scope singleton do container quản lý → giữ được \\"một instance\\" nhưng dễ test hơn.

## Detailed Answer (EN)
Singleton ensures a class has **exactly one instance** across the app and provides a **global access point** to it. Common for shared resources: config, logger, connection pool, cache.\
\
Typical implementation: a private constructor + a static field holding the instance + a `getInstance()` method that lazily creates it on first use.\
\
Drawbacks (commonly probed):\
- It is essentially **global state** → hard to test (hard to mock/inject), hides dependencies, and encourages hidden coupling.\
- **Not thread-safe** if lazily initialized without synchronization (needs double-checked locking or eager init).\
- Violates Single Responsibility (it does its job and manages its own lifecycle).\
\
Modern alternative: use **dependency injection** with a container-managed singleton scope → you keep \\"one instance\\" but stay testable.
