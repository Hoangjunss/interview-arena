---
id: quiz-mongodb-co-index-status-1-createdat-1-truy-van-nao-sau-day-khong-dung-duoc-index-nay
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có index { status: 1, createdAt: -1 }. Truy vấn nào sau đây KHÔNG dùng được index này?

## Đáp án trắc nghiệm
- [ ] B — truy vấn khoảng ($gt) không dùng được index
- [ ] A — chỉ dùng một trường trong index hai trường thì index vô dụng
- [x] C — index phức hợp chỉ dùng được khi có tiền tố bên trái
- [ ] Cả ba đều dùng được, MongoDB tự sắp lại thứ tự trường khi cần

## Giải thích (VI)
C không dùng được. Index phức hợp chỉ phục vụ truy vấn khớp tiền tố bên trái: {status} hoặc {status, createdAt}. Lọc riêng createdAt không khớp tiền tố nào nên phải quét. Cần truy vấn theo riêng createdAt thì tạo thêm index cho nó.

### Giải thích các phương án:
- **B — truy vấn khoảng ($gt) không dùng được index** (Sai): Index B-tree hỗ trợ tốt truy vấn khoảng.
- **A — chỉ dùng một trường trong index hai trường thì index vô dụng** (Sai): status chính là tiền tố bên trái nên A dùng được index bình thường.
- **C — index phức hợp chỉ dùng được khi có tiền tố bên trái** (Đúng): Quy tắc tiền tố bên trái (leftmost prefix) là điểm mấu chốt của index phức hợp: lọc riêng createdAt mà bỏ qua status thì không khớp tiền tố nào.
- **Cả ba đều dùng được, MongoDB tự sắp lại thứ tự trường khi cần** (Sai): MongoDB không sắp lại thứ tự trường trong index phức hợp để khớp truy vấn.
