---
id: quiz-postgresql-bang-chi-co-vai-tram-dong-cot-loc-da-co-index-nhung-planner-van-chon-seq-scan-vi
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bảng chỉ có vài trăm dòng, cột lọc đã có index, nhưng planner vẫn chọn Seq Scan. Vì sao?

## Đáp án trắc nghiệm
- [ ] Index chưa được kích hoạt vì bảng chưa đạt ngưỡng số dòng tối thiểu do PostgreSQL quy định
- [ ] Planner chỉ dùng index khi truy vấn có ORDER BY hoặc JOIN đi kèm điều kiện lọc
- [x] Đọc thẳng vài page của bảng rẻ hơn tra index rồi quay lại heap lấy dòng
- [ ] Index trên bảng nhỏ bị lỗi thống kê nên planner không tin tưởng để dùng

## Giải thích (VI)
Vì đó là lựa chọn rẻ hơn thật . Bảng vài trăm dòng chỉ chiếm vài page; Seq Scan đọc thẳng chúng, còn Index Scan phải đọc index rồi quay lại heap lấy dòng — nhiều bước hơn cho cùng kết quả. Seq Scan không phải dấu hiệu xấu; nó chỉ xấu khi xuất hiện trên bảng lớn với điều kiện lọc chọn lọc cao.

### Giải thích các phương án:
- **Index chưa được kích hoạt vì bảng chưa đạt ngưỡng số dòng tối thiểu do PostgreSQL quy định** (Sai): Không tồn tại ngưỡng kích hoạt index; đây thuần tuý là bài toán so sánh chi phí.
- **Planner chỉ dùng index khi truy vấn có ORDER BY hoặc JOIN đi kèm điều kiện lọc** (Sai): Index được cân nhắc cho mọi truy vấn có điều kiện phù hợp, không cần ORDER BY hay JOIN.
- **Đọc thẳng vài page của bảng rẻ hơn tra index rồi quay lại heap lấy dòng** (Đúng): Bảng vài trăm dòng nằm gọn trong vài page nên quét hết là đường đi ngắn nhất.
- **Index trên bảng nhỏ bị lỗi thống kê nên planner không tin tưởng để dùng** (Sai): Thống kê bảng nhỏ vẫn chính xác; planner không "mất niềm tin" vào index.
