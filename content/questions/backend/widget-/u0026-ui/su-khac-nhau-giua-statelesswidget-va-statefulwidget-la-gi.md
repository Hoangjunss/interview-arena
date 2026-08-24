---
id: su-khac-nhau-giua-statelesswidget-va-statefulwidget-la-gi
position: backend
technology: widget-\u0026-ui
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa `StatelessWidget` và `StatefulWidget` là gì?

## Question (EN)
What is the difference between `StatelessWidget` and `StatefulWidget`?

## Đáp án chi tiết (VI)
`StatelessWidget` là immutable — sau khi build xong, nó không thể thay đổi. Hàm `build()` chỉ được gọi một lần trừ khi parent rebuild. `StatefulWidget` duy trì state có thể thay đổi qua `setState()`, kích hoạt rebuild. Dùng `StatelessWidget` cho UI tĩnh (nhãn văn bản, icon), `StatefulWidget` cho component tương tác (form, toggle). Luôn ưu tiên `StatelessWidget` vì hiệu năng tốt hơn.

## Detailed Answer (EN)
`StatelessWidget` is immutable — once built, it cannot change. `StatefulWidget` maintains state that can change via `setState()`, triggering rebuilds. Use `StatelessWidget` for static UI, `StatefulWidget` for interactive components. Always prefer `StatelessWidget` for performance.
