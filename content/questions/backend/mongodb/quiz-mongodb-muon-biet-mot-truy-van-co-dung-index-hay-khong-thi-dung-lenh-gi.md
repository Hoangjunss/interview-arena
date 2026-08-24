---
id: quiz-mongodb-muon-biet-mot-truy-van-co-dung-index-hay-khong-thi-dung-lenh-gi
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn biết một truy vấn có dùng index hay không thì dùng lệnh gì?

## Đáp án trắc nghiệm
- [ ] db.collection.getIndexes() — cho biết truy vấn đang dùng index nào
- [ ] Không có cách nào biết, phải đo thời gian chạy rồi suy đoán
- [x] .explain("executionStats") — cho biết kế hoạch và index được dùng
- [ ] db.collection.stats() — trả về kế hoạch thực thi của truy vấn gần nhất

## Giải thích (VI)
db.coll.find({...}).explain("executionStats"). Đọc stage (IXSCAN là có dùng index, COLLSCAN là quét toàn bộ), indexName, và so totalDocsExamined với nReturned — hai số càng gần nhau thì truy vấn càng hiệu quả.

### Giải thích các phương án:
- **db.collection.getIndexes() — cho biết truy vấn đang dùng index nào** (Sai): Nó chỉ liệt kê các index đang tồn tại, không nói truy vấn dùng cái nào.
- **Không có cách nào biết, phải đo thời gian chạy rồi suy đoán** (Sai): explain() cung cấp thông tin này một cách trực tiếp.
- **.explain("executionStats") — cho biết kế hoạch và index được dùng** (Đúng): Đây là công cụ chuẩn để phân tích truy vấn: kế hoạch được chọn, index nào được dùng, số document đã quét và thời gian thực thi.
- **db.collection.stats() — trả về kế hoạch thực thi của truy vấn gần nhất** (Sai): stats() cho thông tin về collection, không phải về một truy vấn cụ thể.
