---
id: trade-off-time-vs-space-trong-coding-interview-thuong-bieu-hien-the-nao
position: backend
technology: time-vs-space
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trade-off time vs space trong coding interview thường biểu hiện thế nào?

## Question (EN)
How does the time-versus-space trade-off show up in coding interviews?

## Đáp án chi tiết (VI)
Quy luật quen thuộc: muốn nhanh hơn thì thường phải tốn thêm bộ nhớ, và ngược lại. Ví dụ điển hình là HashMap — đổi O(n) space để biến lookup từ O(n) xuống O(1), giúp Two Sum từ O(n²) còn O(n). Hay precompute/prefix sum: tốn O(n) bộ nhớ lưu tổng tích lũy để mỗi truy vấn range sum chỉ còn O(1). Chiều ngược lại: bài cần O(1) space buộc bạn xử lý in-place hoặc dùng two pointers thay vì tạo cấu trúc phụ. Khi trình bày, hãy nói rõ bạn đang đánh đổi cái gì lấy cái gì và vì sao nó hợp với constraint của đề (ví dụ memory limit chặt thì ưu tiên space).

## Detailed Answer (EN)
The familiar rule: going faster usually costs more memory, and vice versa. A HashMap trades O(n) space to turn O(n) lookups into O(1), cutting Two Sum from O(n²) to O(n). Prefix sums spend O(n) memory so each range-sum query is O(1). The other way, an O(1)-space requirement forces in-place work or two pointers instead of auxiliary structures. State what you trade for what, and why it fits the problem constraints.
