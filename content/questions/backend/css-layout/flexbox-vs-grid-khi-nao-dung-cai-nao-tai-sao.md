---
id: flexbox-vs-grid-khi-nao-dung-cai-nao-tai-sao
position: backend
technology: css-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flexbox vs Grid. Khi nào dùng cái nào? Tại sao?

## Question (EN)
Flexbox vs Grid. When should you use each and why?

## Đáp án chi tiết (VI)
Flexbox là hệ thống layout một chiều, phân bố item dọc theo một trục (hàng hoặc cột), phù hợp cho navigation bar, danh sách item, hoặc căn chỉnh đơn giản. CSS Grid là hệ thống layout hai chiều, cho phép định nghĩa cả hàng và cột cùng lúc, phù hợp cho layout trang, dashboard, hoặc layout phức tạp. Trong thực tế thường kết hợp cả hai: Grid cho layout tổng thể của trang, Flexbox cho layout bên trong từng component. Quy tắc đơn giản: nếu chỉ cần sắp xếp theo một hướng thì dùng Flexbox, nếu cần kiểm soát cả hai chiều thì dùng Grid.

## Detailed Answer (EN)
Flexbox is a one-dimensional layout system that distributes items along a single axis (row or column) — great for navigation bars, item lists, or simple alignment. CSS Grid is two-dimensional, letting you define both rows and columns simultaneously — ideal for full page layouts, dashboards, and complex arrangements. In practice, use both together: Grid for the overall page layout, Flexbox inside individual components. Simple rule: if you only need to arrange items in one direction, use Flexbox; if you need control over both dimensions, use Grid.
