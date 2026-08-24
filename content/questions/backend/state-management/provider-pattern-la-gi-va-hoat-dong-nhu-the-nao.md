---
id: provider-pattern-la-gi-va-hoat-dong-nhu-the-nao
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Provider pattern là gì và hoạt động như thế nào?

## Question (EN)
What is the Provider pattern and how does it work?

## Đáp án chi tiết (VI)
Provider là thư viện state management dùng `ChangeNotifier` để thông báo listener khi state thay đổi. Widget lắng nghe qua `Consumer` hoặc `context.watch\u003cT\u003e()` và chỉ rebuild khi dữ liệu chúng phụ thuộc thay đổi. Provider nhẹ và phù hợp cho app nhỏ đến vừa, nhưng Flutter team hiện nay khuyến nghị Riverpod cho dự án mới vì type-safe hơn và không phụ thuộc `BuildContext`. Bọc app với `MultiProvider`, định nghĩa provider cho data, và consume trong widget.

## Detailed Answer (EN)
Provider uses `ChangeNotifier` to notify listeners when state changes. Widgets listen via `Consumer` or `context.watch\u003cT\u003e()` and rebuild only when data they depend on changes. Provider is lightweight and suitable for small-to-medium apps, but the Flutter team now recommends Riverpod for new projects as it is fully type-safe and does not depend on `BuildContext`.
