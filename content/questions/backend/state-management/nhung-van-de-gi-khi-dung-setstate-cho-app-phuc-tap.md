---
id: nhung-van-de-gi-khi-dung-setstate-cho-app-phuc-tap
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những vấn đề gì khi dùng `setState()` cho app phức tạp?

## Question (EN)
What are the problems with using `setState()` for complex apps?

## Đáp án chi tiết (VI)
`setState()` rebuild toàn bộ cây con của widget đó, gây vấn đề hiệu năng với cây widget lớn. Logic nghiệp vụ trộn lẫn với UI làm code khó test. Không scale được — nhiều cập nhật state làm code khó theo dõi và khó debug. State bị giới hạn trong một widget — chia sẻ state giữa các widget ở xa trở nên cực kỳ phức tạp. Với bất kỳ thứ gì ngoài widget đơn giản, hãy dùng state management chuyên dụng.

## Detailed Answer (EN)
`setState()` rebuilds that widget's entire subtree, causing performance issues with large trees. Business logic is mixed with UI making testing impossible. State is scoped to one widget — sharing state between distant widgets is cumbersome. For anything beyond simple widgets, use dedicated state management.
