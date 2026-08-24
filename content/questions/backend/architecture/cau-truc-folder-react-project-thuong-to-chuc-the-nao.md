---
id: cau-truc-folder-react-project-thuong-to-chuc-the-nao
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cấu trúc folder React project thường tổ chức thế nào?

## Question (EN)
How is a React project folder structure typically organized?

## Đáp án chi tiết (VI)
Cách tổ chức phổ biến và hiệu quả nhất là theo feature-based, trong đó mỗi tính năng có folder riêng như `src/features/auth/` hay `src/features/dashboard/`, bên trong chứa đầy đủ components, hooks, services, và types của tính năng đó.\
\
Phần dùng chung được đặt ở `src/components/` cho UI components, `src/hooks/` cho custom hooks, `src/utils/` cho helper functions, và `src/services/` cho API calls. Mỗi folder nên có file `index.ts` làm barrel export để import gọn gàng hơn.\
\
Cách tổ chức này tốt hơn nhiều so với cấu trúc theo type (gom tất cả components vào một folder, tất cả hooks vào một folder) vì khi dự án lớn lên, feature-based giúp tìm và sửa code liên quan đến một tính năng dễ dàng hơn rất nhiều.

## Detailed Answer (EN)
The most effective approach is feature-based organization: each feature has its own folder like `src/features/auth/` or `src/features/dashboard/` containing that feature's components, hooks, services, and types. Shared code lives in `src/components/` (UI components), `src/hooks/` (custom hooks), `src/utils/` (helpers), and `src/services/` (API calls). Each folder should have an `index.ts` barrel export for cleaner imports. This is far superior to type-based organization (all components in one folder, all hooks in another) because as the project grows, feature-based structure makes finding and modifying related code much easier.
