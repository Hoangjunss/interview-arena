---
id: quiz-mongodb-xem-mot-collection-dang-co-nhng-index-nao-bang-lenh-gi
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xem một collection đang có những index nào bằng lệnh gì?

## Đáp án trắc nghiệm
- [x] db.collection.getIndexes()
- [ ] show indexes
- [ ] db.collection.stats()
- [ ] db.collection.explain()

## Giải thích (VI)
db.collection.getIndexes() liệt kê mọi index kèm định nghĩa. Muốn biết index nào thực sự được dùng thì thêm db.collection.aggregate([{ $indexStats: {} }]) — nó cho số lượt sử dụng của từng index.

### Giải thích các phương án:
- **db.collection.getIndexes()** (Đúng): Đây là lệnh chuẩn để liệt kê index.
- **show indexes** (Sai): Không có lệnh shell nào như vậy.
- **db.collection.stats()** (Sai): stats() cho số liệu về collection như dung lượng, số document.
- **db.collection.explain()** (Sai): explain() phân tích một truy vấn cụ thể, không liệt kê index.
