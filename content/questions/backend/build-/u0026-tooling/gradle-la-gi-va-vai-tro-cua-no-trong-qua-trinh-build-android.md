---
id: gradle-la-gi-va-vai-tro-cua-no-trong-qua-trinh-build-android
position: backend
technology: build-\u0026-tooling
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gradle là gì và vai trò của nó trong quá trình build Android?

## Question (EN)
What is Gradle and what role does it play in building an Android app?

## Đáp án chi tiết (VI)
Gradle là **hệ thống build tự động** mà Android dùng để biên dịch mã, gói tài nguyên, và tạo ra file `APK`/`AAB`. Android Gradle Plugin (AGP) mở rộng Gradle với các tác vụ riêng cho Android.\
\
Vai trò chính:\
- **Quản lý dependency**: khai báo thư viện, Gradle tải và resolve tự động.\
- **Build variants**: kết hợp *build type* (`debug`/`release`) với *product flavor* (vd `free`/`paid`) để sinh nhiều biến thể từ một codebase.\
- **Đóng gói**: biên dịch Kotlin/Java, xử lý resources, chạy R8/ProGuard (thu nhỏ + obfuscate), ký (sign) app.\
\
Cấu hình nằm trong các file `build.gradle(.kts)`: cấp project (thiết lập chung) và cấp module (dependency, config của từng module). Cách quản lý phiên bản dependency hiện đại là **version catalog** (`libs.versions.toml`).

## Detailed Answer (EN)
Gradle is the **automated build system** Android uses to compile code, package resources, and produce `APK`/`AAB` files. The Android Gradle Plugin (AGP) extends Gradle with Android-specific tasks.\
\
Key roles:\
- **Dependency management**: declare libraries and Gradle downloads and resolves them automatically.\
- **Build variants**: combine a *build type* (`debug`/`release`) with a *product flavor* (e.g. `free`/`paid`) to generate multiple variants from one codebase.\
- **Packaging**: compiles Kotlin/Java, processes resources, runs R8/ProGuard (shrinking + obfuscation), signs the app.\
\
Configuration lives in `build.gradle(.kts)` files: project-level (shared setup) and module-level (per-module dependencies and config). The modern way to manage dependency versions is a **version catalog** (`libs.versions.toml`).
