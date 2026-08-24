---
id: tree-shaking-trong-flutter-release-build-la-gi-va-tai-sao-no-giam-kich-thuoc-app
position: backend
technology: chuyên-sâu
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tree-shaking trong Flutter release build là gì và tại sao nó giảm kích thước app?

## Question (EN)
What is tree-shaking in Flutter release builds and why does it reduce app size?

## Đáp án chi tiết (VI)
Tree-shaking là quá trình tự động loại bỏ code, class, method không được dùng trong quá trình build. Flutter chỉ giữ lại code reachable từ `main()`. \
\
**Ví dụ:** nếu bạn import một package lớn nhưng chỉ dùng một hàm, chỉ hàm đó được đưa vào app. Tree-shaking chỉ chạy ở release mode (`flutter build apk --release`). Mức độ giảm phụ thuộc vào số package lớn có nhiều code không dùng — app dùng ít package nhỏ có thể không thấy nhiều khác biệt. Để phân tích xem code nào còn lại, dùng `--analyze-size` hoặc DevTools Size Analyzer.

## Detailed Answer (EN)
Tree-shaking removes unused classes, methods, and packages during the build, keeping only code reachable from `main()`. Only runs in release mode (`flutter build apk --release`). Size savings vary: apps using large packages with many unused utilities benefit most; apps with few small packages may see minimal reduction. Use `--analyze-size` flag or DevTools Size Analyzer to inspect what remains.
