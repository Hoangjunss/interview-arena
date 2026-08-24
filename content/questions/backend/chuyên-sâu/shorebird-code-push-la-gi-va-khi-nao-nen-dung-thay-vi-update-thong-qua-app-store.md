---
id: shorebird-code-push-la-gi-va-khi-nao-nen-dung-thay-vi-update-thong-qua-app-store
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Shorebird code push là gì và khi nào nên dùng thay vì update thông qua App Store?

## Question (EN)
What is Shorebird code push and when should you use it instead of App Store/Play Store updates?

## Đáp án chi tiết (VI)
Shorebird là dịch vụ over-the-air (OTA) cho phép cập nhật code Dart của Flutter mà không cần qua App Store hay Play Store review. Deploy hotfix trong vài phút thay vì chờ 1-3 ngày review. Hỗ trợ A/B testing tính năng, rollback nhanh nếu có bug. Giới hạn: chỉ update được Dart code—không thể thay đổi native plugin, asset, hay Dart VM. Dùng Shorebird cho: bugfix khẩn cấp, copy change, logic update nhỏ. Vẫn dùng App Store cho: major feature, thay đổi UI lớn, cập nhật native code—để đảm bảo version control và rollback đầy đủ.

## Detailed Answer (EN)
Shorebird is an OTA service that pushes Dart code updates without app store review, delivering fixes in minutes vs 1-3 day review cycles. Supports A/B testing and quick rollback. Limitation: only updates Dart code — cannot change native plugins, assets, or the Dart VM. Use Shorebird for critical hotfixes, copy changes, and small logic updates. Use app stores for major features, large UI changes, and native code updates to maintain full version control.
