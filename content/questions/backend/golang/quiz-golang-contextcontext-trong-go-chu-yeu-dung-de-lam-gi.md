---
id: quiz-golang-contextcontext-trong-go-chu-yeu-dung-de-lam-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
context.Context trong Go chủ yếu dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Tự động giới hạn bộ nhớ mà một goroutine được cấp phát
- [x] Truyền tín hiệu hủy, deadline và giá trị phạm vi request
- [ ] Lưu trữ trạng thái ứng dụng lâu dài thay cho biến toàn cục
- [ ] Thay thế cho channel trong mọi bài toán đồng bộ goroutine

## Giải thích (VI)
context.Context truyền tín hiệu hủy (cancel), deadline/timeout và một ít giá trị phạm vi request qua chuỗi lời gọi và các goroutine. Hàm nhận ctx lắng nghe ctx.Done() để dừng sớm khi request bị huỷ hoặc hết hạn. Quy ước: truyền ctx làm tham số đầu tiên, đừng lưu trong struct, đừng dùng làm kho tham số.

### Giải thích các phương án:
- **Tự động giới hạn bộ nhớ mà một goroutine được cấp phát** (Sai): Context không quản lý hay giới hạn bộ nhớ; nó chỉ mang tín hiệu hủy/deadline và vài giá trị, không can thiệp allocation.
- **Truyền tín hiệu hủy, deadline và giá trị phạm vi request** (Đúng): context mang deadline, tín hiệu cancel và request-scoped values; goroutine con lắng nghe ctx.Done() để dừng sớm, giúp lan truyền hủy qua nhiều tầng gọi. Xuyên qua chuỗi lời gọi và ranh giới goroutine/API.
- **Lưu trữ trạng thái ứng dụng lâu dài thay cho biến toàn cục** (Sai): Context không phải kho state chung; tài liệu Go khuyến cáo chỉ để giá trị request-scoped, không dùng như global store hay để truyền tham số tuỳ ý.
- **Thay thế cho channel trong mọi bài toán đồng bộ goroutine** (Sai): Context không thay channel cho việc truyền dữ liệu; nó dùng channel Done() bên trong chỉ để phát tín hiệu hủy, không phải kênh dữ liệu tổng quát.
