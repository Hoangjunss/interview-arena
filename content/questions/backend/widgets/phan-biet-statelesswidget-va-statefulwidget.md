---
id: phan-biet-statelesswidget-va-statefulwidget
position: backend
technology: widgets
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt StatelessWidget và StatefulWidget?

## Question (EN)
What is the difference between StatelessWidget and StatefulWidget?

## Đáp án chi tiết (VI)
- **StatelessWidget**: không có state nội bộ thay đổi theo thời gian. UI chỉ phụ thuộc vào cấu hình truyền vào (constructor) và `BuildContext`. Vẽ một lần, chỉ dựng lại khi cha truyền dữ liệu mới. Ví dụ: `Text`, `Icon`.\
- **StatefulWidget**: có **state có thể đổi** trong vòng đời. Bản thân widget vẫn bất biến, nhưng nó tạo một đối tượng `State` (qua `createState()`) giữ dữ liệu thay đổi; gọi `setState()` để báo cần dựng lại. Ví dụ: checkbox, form, animation.\
\
Quy tắc thực dụng: mặc định dùng Stateless; chỉ nâng lên Stateful khi cần lưu local state (ephemeral state) mà không muốn đẩy lên state management ngoài.

## Detailed Answer (EN)
- **StatelessWidget**: no internal state that changes over time. Its UI depends only on the configuration passed in (constructor) and `BuildContext`. Built once, rebuilt only when the parent supplies new data. E.g. `Text`, `Icon`.\
- **StatefulWidget**: has **mutable state** during its lifetime. The widget itself stays immutable, but it creates a `State` object (via `createState()`) holding the changing data; you call `setState()` to signal a rebuild. E.g. checkbox, form, animation.\
\
Practical rule: default to Stateless; upgrade to Stateful only when you need local (ephemeral) state you do not want to lift into external state management.
