---
id: quiz-postgresql-sau-khi-nap-them-hang-chuc-trieu-dong-vao-mot-bang-vai-truy-van-quen-thuoc-dot-n
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sau khi nạp thêm hàng chục triệu dòng vào một bảng, vài truy vấn quen thuộc đột nhiên chọn plan kém. Việc đầu tiên nên làm là gì?

## Đáp án trắc nghiệm
- [ ] REINDEX toàn bộ index của bảng vì dữ liệu mới làm index phân mảnh
- [x] Chạy ANALYZE trên bảng để cập nhật thống kê cho planner
- [ ] Tăng shared buffers để chứa được lượng dữ liệu mới nạp vào
- [ ] Thêm index mới cho các cột xuất hiện trong truy vấn chậm

## Giải thích (VI)
Chạy ANALYZE bảng_đó . Planner ước chi phí dựa trên thống kê mẫu trong pg_statistic (số dòng, phân bố giá trị, tương quan). Sau bulk load, thống kê vẫn mô tả bảng cũ nên ước lượng lệch hàng chục lần và planner chọn sai plan. Dấu hiệu nhận biết trong EXPLAIN ANALYZE: rows ước lượng chênh xa rows thực tế.

### Giải thích các phương án:
- **REINDEX toàn bộ index của bảng vì dữ liệu mới làm index phân mảnh** (Sai): Phân mảnh không làm planner chọn sai plan; REINDEX không sửa được ước lượng.
- **Chạy ANALYZE trên bảng để cập nhật thống kê cho planner** (Đúng): Thống kê còn mô tả bảng cũ nên mọi ước lượng của planner đều lệch xa thực tế.
- **Tăng shared buffers để chứa được lượng dữ liệu mới nạp vào** (Sai): Bộ nhớ cache ảnh hưởng tốc độ đọc, không ảnh hưởng cách planner ước lượng.
- **Thêm index mới cho các cột xuất hiện trong truy vấn chậm** (Sai): Truy vấn từng chạy tốt với index hiện có; vấn đề nằm ở thống kê chứ không thiếu index.
