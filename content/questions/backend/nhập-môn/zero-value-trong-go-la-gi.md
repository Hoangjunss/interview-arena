---
id: zero-value-trong-go-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Zero value trong Go là gì?

## Question (EN)
What is the zero value in Go?

## Đáp án chi tiết (VI)
Giá trị mặc định khi khai báo biến không khởi tạo — Go đảm bảo mọi biến đều có giá trị hợp lệ (khác JS/undefined, Python/None). Cụ thể:\
\
- int/float → 0\
- string → `\\"\\"` (rỗng)\
- bool → false\
- pointer/slice/map/channel/interface → nil\
- struct → zero value của mỗi field\
\
Ý nghĩa: code an toàn hơn, không cần check null/undefined, zero value thường là trạng thái hợp lý (ví dụ: counter bắt đầu từ 0).

## Detailed Answer (EN)
The zero value is the default value assigned to a variable when declared without explicit initialization. Go guarantees every variable has a valid value — unlike JS's `undefined` or Python's `None`. Specifically:\
\
- int/float → 0\
- string → `\\"\\"`\
- bool → false\
- pointer/slice/map/channel/interface → nil\
- struct → zero value of each field\
\
This makes code safer: no null/undefined checks needed, and zero values are usually sensible defaults (e.g., a counter starting at 0).
