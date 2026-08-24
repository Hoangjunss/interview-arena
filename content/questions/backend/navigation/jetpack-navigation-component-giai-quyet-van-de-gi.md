---
id: jetpack-navigation-component-giai-quyet-van-de-gi
position: backend
technology: navigation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Jetpack Navigation Component giải quyết vấn đề gì?

## Question (EN)
What problem does the Jetpack Navigation Component solve?

## Đáp án chi tiết (VI)
Navigation Component chuẩn hóa việc điều hướng trong app thành một **đồ thị (navigation graph)** khai báo, thay cho việc tự quản `FragmentTransaction`/intent rải rác.\
\
Khái niệm chính:\
- **NavGraph**: tập các đích (destination) và các đường đi giữa chúng.\
- **NavHost**: vùng chứa hiển thị đích hiện tại.\
- **NavController**: điều khiển điều hướng (`navigate()`, back stack).\
\
Lợi ích:\
- Quản lý **back stack** nhất quán, xử lý **deep link** sẵn, truyền tham số **type-safe** (Safe Args/route serialization).\
- Dùng chung cho cả **Fragment và Compose** (navigation-compose).\
- Trực quan hóa luồng màn trong editor.\
\
Hay hỏi: cách truyền argument an toàn và xử lý deep link tới một destination cụ thể.

## Detailed Answer (EN)
The Navigation Component standardizes in-app navigation into a declarative **navigation graph**, replacing scattered manual `FragmentTransaction`/intents.\
\
Key concepts:\
- **NavGraph**: the set of destinations and the paths between them.\
- **NavHost**: the container showing the current destination.\
- **NavController**: drives navigation (`navigate()`, back stack).\
\
Benefits:\
- Consistent **back stack** management, built-in **deep link** handling, **type-safe** argument passing (Safe Args/route serialization).\
- Works for both **Fragments and Compose** (navigation-compose).\
- Visualizes the screen flow in the editor.\
\
Common ask: passing arguments safely and handling a deep link to a specific destination.
