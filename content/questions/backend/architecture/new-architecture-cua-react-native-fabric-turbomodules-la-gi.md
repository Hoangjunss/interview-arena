---
id: new-architecture-cua-react-native-fabric-turbomodules-la-gi
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
New Architecture của React Native (Fabric, TurboModules) là gì?

## Question (EN)
What is React Native's New Architecture (Fabric, TurboModules)?

## Đáp án chi tiết (VI)
Kiến trúc mới (mặc định từ RN 0.76) thay bridge cũ bằng các trụ cột dựng trên **JSI**:\
\
- **JSI**: lớp C++ cho JS gọi native trực tiếp, đồng bộ, không serialize JSON.\
- **Fabric**: hệ **render mới** — cho phép layout/effect **đồng bộ**, hỗ trợ tính năng concurrent của React 18 (Suspense, Transitions), UI nhất quán hơn giữa các nền tảng.\
- **TurboModules**: native module **nạp lười** và gọi qua JSI (nhanh, ít tốn khởi động).\
- **Codegen**: sinh mã type-safe giữa JS và native từ spec.\
\
Lợi ích: giảm độ trễ JS↔native, cho phép tương tác đồng bộ khi cần, mở đường cho concurrent rendering. Lưu ý: bật kiến trúc mới không tự động nhanh hơn nếu code chưa tận dụng.

## Detailed Answer (EN)
The New Architecture (default since RN 0.76) replaces the old bridge with pillars built on **JSI**:\
\
- **JSI**: a C++ layer for JS to call native directly, synchronously, without JSON serialization.\
- **Fabric**: the **new rendering system** — enables **synchronous** layout/effects, supports React 18 concurrent features (Suspense, Transitions), and more consistent cross-platform UI.\
- **TurboModules**: **lazily loaded** native modules called via JSI (fast, low startup cost).\
- **Codegen**: generates type-safe glue between JS and native from specs.\
\
Benefits: lower JS↔native latency, synchronous interaction when needed, and a path to concurrent rendering. Note: enabling the new architecture is not automatically faster unless code takes advantage of it.
