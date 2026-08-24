---
id: he-thong-layout-cua-flutter-hoat-dong-the-nao-column-row-expanded-va-flexible-du
position: backend
technology: widget-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hệ thống layout của Flutter hoạt động thế nào: `Column`, `Row`, `Expanded` và `Flexible` dùng ra sao?

## Question (EN)
Explain the Flutter layout system: how do `Column`, `Row`, `Expanded`, and `Flexible` work?

## Đáp án chi tiết (VI)
`Row` xếp widget theo chiều ngang; `Column` xếp theo chiều dọc. Mặc định chúng chiếm không gian tối thiểu. `Expanded` buộc con lấp đầy không gian còn lại đều nhau. `Flexible` cho phép con chiếm thêm không gian nhưng có thể nhỏ hơn nếu cần. Dùng `MainAxisAlignment` và `CrossAxisAlignment` để kiểm soát khoảng cách và căn chỉnh.

## Detailed Answer (EN)
`Row` lays widgets horizontally; `Column` vertically. By default, they take minimum space. `Expanded` forces children to fill remaining space equally. `Flexible` allows children to take extra space but can be smaller if needed. Use `MainAxisAlignment` and `CrossAxisAlignment` for spacing and alignment.
