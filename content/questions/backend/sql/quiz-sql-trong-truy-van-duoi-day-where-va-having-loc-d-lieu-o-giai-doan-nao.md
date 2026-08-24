---
id: quiz-sql-trong-truy-van-duoi-day-where-va-having-loc-d-lieu-o-giai-doan-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong truy vấn dưới đây, WHERE và HAVING lọc dữ liệu ở giai đoạn nào?

## Đáp án trắc nghiệm
- [ ] WHERE lọc sau khi GROUP BY đã gom nhóm xong, còn HAVING lọc dòng trước khi gom nhóm
- [ ] Hai mệnh đề tương đương nhau, chỉ khác cú pháp — có thể chuyển count( ) >= 2 vào WHERE mà kết quả không đổi
- [ ] WHERE và HAVING đều chạy sau SELECT để lọc trên các cột đã được đặt bí danh
- [x] WHERE lọc từng dòng trước khi gom nhóm; HAVING lọc trên nhóm sau đó

## Giải thích (VI)
WHERE lọc từng dòng trước khi GROUP BY gom nhóm — dòng có salary = 2. Thứ tự logic: FROM → WHERE → GROUP BY → HAVING → SELECT. Hiểu nhầm "WHERE lọc sau GROUP BY" là sai.

### Giải thích các phương án:
- **WHERE lọc sau khi GROUP BY đã gom nhóm xong, còn HAVING lọc dòng trước khi gom nhóm** (Sai): Ngược thứ tự: WHERE luôn chạy trước GROUP BY trên từng dòng — vì thế WHERE không dùng được hàm gộp như count().
- **Hai mệnh đề tương đương nhau, chỉ khác cú pháp — có thể chuyển count( ) >= 2 vào WHERE mà kết quả không đổi** (Sai): Không tương đương: viết WHERE count( ) >= 2 gây lỗi vì hàm gộp chưa thể tính khi chưa gom nhóm — điều kiện trên kết quả gộp bắt buộc nằm ở HAVING.
- **WHERE và HAVING đều chạy sau SELECT để lọc trên các cột đã được đặt bí danh** (Sai): Cả hai chạy trước bước SELECT theo thứ tự logic — đó là lý do WHERE/HAVING (theo chuẩn SQL) không tham chiếu được bí danh cột khai báo trong SELECT.
- **WHERE lọc từng dòng trước khi gom nhóm; HAVING lọc trên nhóm sau đó** (Đúng): Đúng thứ tự xử lý logic: FROM → WHERE → GROUP BY → HAVING → SELECT; WHERE làm việc với dòng, HAVING làm việc với nhóm. Vì vậy dòng salary <= 1000 không được tính vào count, và chỉ HAVING mới dùng được hàm gộp.
