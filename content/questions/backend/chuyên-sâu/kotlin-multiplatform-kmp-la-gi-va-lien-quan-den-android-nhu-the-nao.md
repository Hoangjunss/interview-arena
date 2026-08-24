---
id: kotlin-multiplatform-kmp-la-gi-va-lien-quan-den-android-nhu-the-nao
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kotlin Multiplatform (KMP) là gì và liên quan đến Android như thế nào?

## Question (EN)
What is Kotlin Multiplatform (KMP) and how does it relate to Android?

## Đáp án chi tiết (VI)
KMP cho phép chia sẻ code giữa Android, iOS, và web platform bằng Kotlin. Bạn viết business logic một lần trong common module, rồi code platform-specific cho từng nền tảng. Với Android app, KMP cho phép chia sẻ code với iOS hay backend service. Không bắt buộc nhưng hữu ích cho tổ chức support nhiều platform. Setup với plugin `kotlin-multiplatform` và source set `commonMain`, `androidMain`.

## Detailed Answer (EN)
KMP allows sharing code between Android, iOS, and web platforms using Kotlin. You write business logic once in the common module, then platform-specific code for each platform. For Android apps, KMP enables code sharing with iOS development or backend services. Set up with the `kotlin-multiplatform` plugin and `commonMain`, `androidMain` source sets.
