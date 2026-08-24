---
id: dynamic-feature-module-la-gi-va-khi-nao-nen-dung
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dynamic feature module là gì và khi nào nên dùng?

## Question (EN)
What are dynamic feature modules and when should you use them?

## Đáp án chi tiết (VI)
Dynamic feature module là các tính năng tùy chọn/theo yêu cầu mà người dùng có thể download sau khi cài. Dùng cho tính năng lớn không phải ai cũng cần (như AR filter hay advanced editor). Chúng được download theo yêu cầu, giảm kích thước cài đặt ban đầu. Implement qua conditional delivery trong Google Play Console. Truy cập bằng `SplitCompat` và dynamic feature API.

## Detailed Answer (EN)
Dynamic feature modules are optional/on-demand features users can download after install. Use them for large features not needed by all users (like AR filters or advanced editors). They're downloaded on-demand, reducing initial install size. Implement with conditional delivery in Google Play Console and access using `SplitCompat` and dynamic feature APIs.
