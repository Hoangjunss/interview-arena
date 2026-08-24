---
id: native-module-turbo-native-module-trong-react-native-la-gi
position: backend
technology: native-modules
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Native module (Turbo Native Module) trong React Native là gì?

## Question (EN)
What is a native module (Turbo Native Module) in React Native?

## Đáp án chi tiết (VI)
Native module cho phép JS **gọi API nền tảng** mà RN chưa bọc (Apple Pay, SDK riêng, xử lý ảnh hiệu năng cao) hoặc tái dùng thư viện Kotlin/Swift/C++ sẵn có.\
\
**Turbo Native Modules** (kiến trúc mới) thay cho native module cũ:\
- Bạn **khai báo đặc tả kiểu (spec)** bằng TypeScript/Flow.\
- **Codegen** sinh interface native từ spec → type-safe, bắt lệch kiểu lúc build.\
- Gọi qua **JSI**: **lazy-load** (chỉ nạp module khi dùng) và có thể **đồng bộ**, nhanh hơn kiểu cũ (async qua bridge).\
\
So với native module cũ: cũ nạp toàn bộ lúc khởi động và giao tiếp async qua bridge; Turbo module lazy load + JSI trực tiếp.\
\
Hay hỏi: khi nào cần viết native module thay vì thư viện JS thuần.

## Detailed Answer (EN)
A native module lets JS **call platform APIs** that RN does not wrap (Apple Pay, a proprietary SDK, high-performance image processing) or reuse existing Kotlin/Swift/C++ libraries.\
\
**Turbo Native Modules** (new architecture) replace the old native modules:\
- You **declare a typed spec** in TypeScript/Flow.\
- **Codegen** generates the native interfaces from the spec → type-safe, catching mismatches at build.\
- Calls go through **JSI**: **lazy-loaded** (a module loads only when used) and can be **synchronous**, faster than the old async-over-bridge approach.\
\
Vs old native modules: the old ones loaded everything at startup and communicated async over the bridge; Turbo modules are lazy + direct JSI.\
\
Common ask: when to write a native module instead of a pure JS library.
