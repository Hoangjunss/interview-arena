---
id: impeller-la-gi-va-tai-sao-flutter-chuyen-sang-dung-no-lam-rendering-engine-mac-d
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Impeller là gì và tại sao Flutter chuyển sang dùng nó làm rendering engine mặc định?

## Question (EN)
What is Impeller and why did Flutter switch to it as the default rendering engine?

## Đáp án chi tiết (VI)
Impeller là rendering engine mới của Flutter, thay thế Skia. Mặc định trên iOS từ Flutter 3.10, và trên Android (API 29+) từ Flutter 3.27. Điểm khác biệt chính: Impeller pre-compile toàn bộ shader lúc build, trong khi Skia compile shader lần đầu tiên khi chạy (JIT), gây ra \\"shader jank\\"—giật hình khi người dùng lần đầu chạm vào UI. Impeller dùng Metal trên iOS và Vulkan trên Android, tận dụng GPU API hiện đại. Kết quả: frame time ổn định hơn, không còn giật đột ngột, trải nghiệm người dùng mượt hơn đáng kể.

## Detailed Answer (EN)
Impeller is Flutter's new rendering engine, replacing Skia. Default on iOS since Flutter 3.10, and on Android (API 29+) since Flutter 3.27. The key difference: Impeller pre-compiles all shaders at build time, while Skia compiled them JIT on first use, causing \\"shader jank\\" (sudden stutters on first touch). Impeller uses Metal on iOS and Vulkan on Android for predictable frame times and smoother UX.
