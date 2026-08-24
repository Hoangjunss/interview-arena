---
id: quiz-sql-nhng-phat-bieu-nao-sau-day-dung-ve-index-trong-co-so-d-lieu-quan-he-chon-nhieu-d
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào sau đây đúng về index trong cơ sở dữ liệu quan hệ? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [ ] Index tự động được tạo cho mọi cột xuất hiện trong mệnh đề WHERE của các truy vấn thường chạy
- [ ] Truy vấn dùng index luôn nhanh hơn quét toàn bảng, nên bảng càng nhiều index thì đọc càng nhanh
- [x] Index tăng tốc truy vấn đọc nhưng làm ghi chậm hơn, vì mỗi INSERT/UPDATE/DELETE phải cập nhật cả index

## Giải thích (VI)
Ba điểm đúng: (1) index tăng tốc đọc nhưng làm ghi chậm và tốn đĩa — mỗi thao tác ghi phải cập nhật cả index; (2) thứ tự cột trong composite index quan trọng — index (a, b) không phục vụ truy vấn chỉ lọc theo b; (3) planner có thể bỏ index để quét toàn bảng khi cách đó rẻ hơn. Hiểu nhầm cần tránh: "index luôn nhanh hơn" và "database tự tạo index theo WHERE".

### Giải thích các phương án:
- **Index tự động được tạo cho mọi cột xuất hiện trong mệnh đề WHERE của các truy vấn thường chạy** (Sai): Sai — database không tự tạo index theo truy vấn; index chỉ được tạo tường minh (hoặc ngầm bởi ràng buộc PK/UNIQUE), việc chọn cột index là quyết định của người thiết kế.
- **Truy vấn dùng index luôn nhanh hơn quét toàn bảng, nên bảng càng nhiều index thì đọc càng nhanh** (Sai): Sai — với điều kiện trả về nhiều dòng, đọc rải rác qua index đắt hơn quét tuần tự; và thêm index không giúp truy vấn không dùng tới nó, chỉ tốn thêm chi phí ghi.
- **Index tăng tốc truy vấn đọc nhưng làm ghi chậm hơn, vì mỗi INSERT/UPDATE/DELETE phải cập nhật cả index** (Đúng): Đúng — đây là đánh đổi cốt lõi: mỗi index thêm chi phí bảo trì trên đường ghi và chiếm thêm dung lượng đĩa.
