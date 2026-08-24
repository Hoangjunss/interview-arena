---
id: buildcontext-la-gi-va-tai-sao-no-quan-trong
position: backend
technology: widget-\u0026-ui
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`BuildContext` là gì và tại sao nó quan trọng?

## Question (EN)
What is `BuildContext` and why is it important?

## Đáp án chi tiết (VI)
`BuildContext` là tham chiếu đến vị trí của widget trong cây widget, cung cấp quyền truy cập vào các dịch vụ như `Theme`, `MediaQuery`, `Navigator` và `ScaffoldState`. Mọi widget đều có `BuildContext` được truyền vào hàm `build()`. Nó cần thiết để điều hướng, hiển thị dialog, truy cập dữ liệu theme và đọc thuộc tính thiết bị.

## Detailed Answer (EN)
`BuildContext` is a reference to a widget's location in the widget tree and provides access to services like `Theme`, `MediaQuery`, `Navigator`, and `ScaffoldState`. It's essential for navigating, showing dialogs, accessing theme data, and reading device properties.
