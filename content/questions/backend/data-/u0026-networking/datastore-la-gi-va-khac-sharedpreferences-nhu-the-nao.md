---
id: datastore-la-gi-va-khac-sharedpreferences-nhu-the-nao
position: backend
technology: data-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DataStore là gì và khác SharedPreferences như thế nào?

## Question (EN)
What is DataStore and how does it differ from SharedPreferences?

## Đáp án chi tiết (VI)
DataStore là sự thay thế hiện đại cho SharedPreferences, được xây dựng trên coroutine và Flow cho lưu trữ dữ liệu type-safe và transactional. Async-first (không blocking), hỗ trợ protocol buffer cho type safety, và an toàn hơn SharedPreferences vốn có vấn đề threading. Dùng `context.dataStore.data.map { it.setting }` để đọc và `context.dataStore.updateData { it.copy(setting = value) }` để ghi.

## Detailed Answer (EN)
DataStore is a modern replacement for SharedPreferences, built on coroutines and Flow for type-safe, transactional data storage. It's async-first (no blocking), supports protocol buffers for type safety, and is safer than SharedPreferences which has threading issues. Use `context.dataStore.data.map { it.setting }` to read and `context.dataStore.updateData { ... }` to write.
