---
id: quiz-mongodb-muon-chen-1000-document-cung-luc-thi-nen-dung-gi
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn chèn 1000 document cùng lúc thì nên dùng gì?

## Đáp án trắc nghiệm
- [ ] Vòng lặp gọi insertOne() 1000 lần, vì MongoDB tự gộp lại
- [ ] updateMany() với upsert: true
- [ ] replaceOne() gọi lặp lại
- [x] insertMany() — gửi cả lô trong ít lần đi mạng

## Giải thích (VI)
insertMany(). Nó gói nhiều document vào ít lần đi mạng nên nhanh hơn hẳn vòng lặp insertOne. Mặc định chạy có thứ tự (ordered: true) — gặp lỗi là dừng; đặt ordered: false để bỏ qua bản ghi lỗi và chèn tiếp phần còn lại.

### Giải thích các phương án:
- **Vòng lặp gọi insertOne() 1000 lần, vì MongoDB tự gộp lại** (Sai): Không có cơ chế tự gộp; mỗi lệnh là một lần đi mạng riêng.
- **updateMany() với upsert: true** (Sai): Dùng được nhưng chậm hơn nhiều vì phải tìm trước khi chèn.
- **replaceOne() gọi lặp lại** (Sai): Vừa sai mục đích vừa chậm.
- **insertMany() — gửi cả lô trong ít lần đi mạng** (Đúng): Gộp lô giảm số vòng đi mạng, vốn là chi phí lớn nhất — nhanh hơn nhiều so với gọi insertOne() 1000 lần.
