---
id: intent-trong-android-la-gi-va-co-may-loai
position: backend
technology: android-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Intent trong Android là gì và có mấy loại?

## Question (EN)
What are Intents in Android and what are the two types?

## Đáp án chi tiết (VI)
Intent là object nhắn tin để yêu cầu một hành động từ component khác trong app. Explicit intent chỉ định chính xác component cần khởi động (ví dụ mở một Activity cụ thể trong app). Implicit intent khai báo action mà không chỉ định component, để hệ thống tìm app phù hợp xử lý (ví dụ mở URL trong browser). Cả hai loại đều có thể truyền dữ liệu qua bundle.

## Detailed Answer (EN)
Intents are messaging objects used to request an action from another app component. Explicit intents specify the exact component to launch (e.g., starting a specific Activity in your app). Implicit intents declare an action without specifying the component, letting the system find the appropriate app to handle it (e.g., opening a URL in a browser). Both types can pass data through bundles.
