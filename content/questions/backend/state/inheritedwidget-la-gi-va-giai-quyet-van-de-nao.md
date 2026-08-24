---
id: inheritedwidget-la-gi-va-giai-quyet-van-de-nao
position: backend
technology: state
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
InheritedWidget là gì và giải quyết vấn đề nào?

## Question (EN)
What is InheritedWidget and what problem does it solve?

## Đáp án chi tiết (VI)
`InheritedWidget` là widget đặc biệt cho phép **truyền dữ liệu xuống cây con hiệu quả** mà không phải chuyền tay qua từng constructor (tránh \\"prop drilling\\").\
\
- Con truy cập qua `context.dependOnInheritedWidgetOfExactType()` (thường bọc trong `of(context)`), và **tự động đăng ký phụ thuộc**: khi dữ liệu đổi, chỉ những widget đã đọc mới dựng lại.\
- Framework dùng nó ở dưới nền cho `Theme`, `MediaQuery`, và là nền tảng của `package:provider`.\
- Điều khiển việc thông báo dựng lại bằng `updateShouldNotify()`.\
\
Ý nghĩa: đây là cơ chế lan truyền state gốc của Flutter; các thư viện state management chỉ là lớp tiện ích bọc quanh nó.

## Detailed Answer (EN)
`InheritedWidget` is a special widget that **propagates data down the subtree efficiently** without threading it through every constructor (avoiding \\"prop drilling\\").\
\
- Descendants access it via `context.dependOnInheritedWidgetOfExactType()` (usually wrapped in `of(context)`), and **auto-register a dependency**: when the data changes, only the widgets that read it rebuild.\
- The framework uses it under the hood for `Theme`, `MediaQuery`, and it underpins `package:provider`.\
- Control rebuild notifications with `updateShouldNotify()`.\
\
Meaning: this is Flutter's built-in state-propagation mechanism; state management libraries are just convenience layers on top of it.
