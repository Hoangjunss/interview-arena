---
id: proguard-va-r8-la-gi-chung-toi-uu-app-nhu-the-nao
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ProGuard và R8 là gì, chúng tối ưu app như thế nào?

## Question (EN)
What is ProGuard and R8, and how do they optimize apps?

## Đáp án chi tiết (VI)
R8 (người kế nhiệm hiện đại của ProGuard) shrink code không dùng (tree shaking), obfuscate tên class/method để bảo mật, và optimize code cho runtime performance. Chạy trong release build, giảm đáng kể kích thước app và thời gian khởi động. R8 đã bật mặc định từ AGP 3.4 — không cần thêm `android.enableR8 = true` trong gradle.properties với AGP hiện tại (8.x). Hiểu cách cấu hình rules R8 rất quan trọng cho production release.

## Detailed Answer (EN)
R8 (the modern successor to ProGuard) shrinks unused code (tree shaking), obfuscates class/method names for security, and optimizes code for runtime performance. It runs during the release build, significantly reducing app size and startup time. R8 has been enabled by default since AGP 3.4 — the `android.enableR8 = true` gradle.properties flag is legacy and does nothing in current AGP (8.x). Understanding R8 rules configuration is critical for production releases.
