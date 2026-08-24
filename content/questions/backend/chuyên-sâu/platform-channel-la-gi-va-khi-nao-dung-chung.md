---
id: platform-channel-la-gi-va-khi-nao-dung-chung
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Platform channel là gì và khi nào dùng chúng?

## Question (EN)
What are platform channels and when do you use them?

## Đáp án chi tiết (VI)
Platform channel cho phép giao tiếp giữa Dart và code native (Kotlin/Java cho Android, Swift/ObjC cho iOS). Dùng khi cần tính năng Flutter không hỗ trợ: truy cập phần cứng đặc thù, dùng thư viện native, hoặc kiểm soát OS chi tiết. Giao tiếp là bất đồng bộ thông qua message passing. Platform channel là lối thoát cho native functionality nhưng thêm độ phức tạp, nên ưu tiên dùng plugin có sẵn.

## Detailed Answer (EN)
Platform channels enable communication between Dart and native code (Kotlin/Java for Android, Swift/ObjC for iOS). Use them for features Flutter doesn't support like device-specific hardware or native libraries. Communication is asynchronous via message passing.
