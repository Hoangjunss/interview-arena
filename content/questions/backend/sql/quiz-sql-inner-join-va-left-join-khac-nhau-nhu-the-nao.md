---
id: quiz-sql-inner-join-va-left-join-khac-nhau-nhu-the-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
INNER JOIN và LEFT JOIN khác nhau như thế nào?

## Đáp án trắc nghiệm
- [x] INNER JOIN chỉ giữ dòng khớp ở cả hai bảng; LEFT JOIN giữ toàn bộ dòng bảng trái
- [ ] INNER JOIN chỉ dùng được với hai bảng, LEFT JOIN dùng được với nhiều bảng
- [ ] LEFT JOIN nhanh hơn INNER JOIN vì chỉ phải đọc bảng bên trái
- [ ] LEFT JOIN bỏ qua điều kiện ON và ghép mọi dòng với mọi dòng như CROSS JOIN

## Giải thích (VI)
INNER JOIN chỉ trả về dòng có khớp ở cả hai bảng. LEFT JOIN trả về toàn bộ dòng của bảng trái; nếu bảng phải không có dòng khớp, các cột của bảng phải nhận NULL. Chọn LEFT JOIN khi cần giữ cả bản ghi chưa có dữ liệu liên kết, ví dụ khách hàng chưa có đơn hàng.

### Giải thích các phương án:
- **INNER JOIN chỉ giữ dòng khớp ở cả hai bảng; LEFT JOIN giữ toàn bộ dòng bảng trái** (Đúng): Đúng định nghĩa: khác biệt nằm ở việc có giữ lại dòng không khớp của bảng trái hay không. Cột của bảng phải được điền NULL ở những dòng trái không tìm được dòng khớp.
- **INNER JOIN chỉ dùng được với hai bảng, LEFT JOIN dùng được với nhiều bảng** (Sai): Cả hai loại join đều xâu chuỗi được qua nhiều bảng trong một câu truy vấn — số bảng không phải điểm khác biệt.
- **LEFT JOIN nhanh hơn INNER JOIN vì chỉ phải đọc bảng bên trái** (Sai): LEFT JOIN vẫn phải đọc cả hai bảng để tìm dòng khớp — khác biệt là ngữ nghĩa kết quả, không phải số bảng được đọc hay tốc độ.
- **LEFT JOIN bỏ qua điều kiện ON và ghép mọi dòng với mọi dòng như CROSS JOIN** (Sai): LEFT JOIN vẫn ghép theo điều kiện ON; chỉ CROSS JOIN mới tạo tích Descartes không cần điều kiện.
