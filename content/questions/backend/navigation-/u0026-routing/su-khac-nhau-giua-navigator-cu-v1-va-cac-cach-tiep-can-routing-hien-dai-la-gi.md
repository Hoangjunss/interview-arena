---
id: su-khac-nhau-giua-navigator-cu-v1-va-cac-cach-tiep-can-routing-hien-dai-la-gi
position: backend
technology: navigation-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa `Navigator` cũ (v1) và các cách tiếp cận routing hiện đại là gì?

## Question (EN)
What is the difference between the old `Navigator` (v1) and modern routing approaches?

## Đáp án chi tiết (VI)
Navigator v1 dùng lệnh imperative `Navigator.push()` và `Navigator.pop()` — bạn quản lý navigation stack thủ công. Navigator 2.0 giới thiệu declarative routing qua Router API. GoRouter (được khuyến nghị hiện nay) xây trên đó, cung cấp URL-based, type-safe declarative routing. GoRouter đơn giản hơn và tự động xử lý deep linking, trở thành lựa chọn hiện đại cho project mới.

## Detailed Answer (EN)
Navigator v1 uses imperative `Navigator.push()` and `Navigator.pop()` calls to manually manage the navigation stack. GoRouter (recommended now) provides URL-based declarative routing with automatic deep linking support, making it the modern choice for new projects.
