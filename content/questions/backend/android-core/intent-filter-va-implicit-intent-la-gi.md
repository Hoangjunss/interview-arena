---
id: intent-filter-va-implicit-intent-la-gi
position: backend
technology: android-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Intent filter và implicit intent là gì?

## Question (EN)
Explain Intent filters and implicit intents.

## Đáp án chi tiết (VI)
Intent filter được khai báo trong manifest để chỉ định loại implicit intent mà Activity có thể xử lý. Chúng định nghĩa action, category, và kiểu dữ liệu. Khi bạn gửi implicit intent, hệ thống tìm tất cả app có Intent filter phù hợp. Ví dụ Intent với action `ACTION_VIEW` và data `http://` có thể mở browser. Phải thêm `android.intent.category.DEFAULT` để implicit intent hoạt động.

## Detailed Answer (EN)
Intent filters are declared in the manifest to specify what implicit intents an Activity can handle. They define action, category, and data types. When you send an implicit intent, the system finds all apps with matching Intent filters. For example, an Intent with action `ACTION_VIEW` and data `http://` might open a browser. You must include `android.intent.category.DEFAULT` for implicit intents to work.
