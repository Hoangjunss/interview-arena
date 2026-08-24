---
id: quiz-sql-nhng-phat-bieu-nao-sau-day-dung-ve-isolation-level-trong-postgresql-chon-nhieu-d
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào sau đây đúng về isolation level trong PostgreSQL? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [ ] Chọn Read Uncommitted trong PostgreSQL cho phép đọc dữ liệu chưa commit của transaction khác (dirty read) để tăng tốc
- [ ] Isolation level càng cao thì càng nên dùng mặc định cho mọi truy vấn, vì an toàn hơn mà không có nhược điểm
- [x] Mức mặc định là Read Committed: mỗi câu lệnh thấy ảnh chụp dữ liệu đã commit mới nhất, nên hai lần đọc trong cùng transaction có thể ra kết quả khác nhau

## Giải thích (VI)
PostgreSQL có ba mức thực tế: Read Committed (mặc định) — snapshot theo từng câu lệnh, hai lần đọc có thể khác nhau; Repeatable Read — một snapshot cố định cho cả transaction; Serializable — kết quả như chạy tuần tự, xung đột thì hủy một transaction để thử lại. Read Uncommitted bị xử lý như Read Committed — MVCC không cho phép dirty read. Mức cao hơn không miễn phí: cần logic retry và giảm song song.

### Giải thích các phương án:
- **Chọn Read Uncommitted trong PostgreSQL cho phép đọc dữ liệu chưa commit của transaction khác (dirty read) để tăng tốc** (Sai): Sai — PostgreSQL chấp nhận cú pháp Read Uncommitted nhưng xử lý nó như Read Committed; kiến trúc MVCC không bao giờ cho phép dirty read.
- **Isolation level càng cao thì càng nên dùng mặc định cho mọi truy vấn, vì an toàn hơn mà không có nhược điểm** (Sai): Sai — mức cao hơn kèm chi phí: nguy cơ transaction bị hủy phải thử lại và giảm mức song song; chọn mức theo ràng buộc nghiệp vụ, không mặc định mức cao nhất.
- **Mức mặc định là Read Committed: mỗi câu lệnh thấy ảnh chụp dữ liệu đã commit mới nhất, nên hai lần đọc trong cùng transaction có thể ra kết quả khác nhau** (Đúng): Đúng — Read Committed lấy snapshot theo từng câu lệnh; transaction khác commit ở giữa thì lần đọc sau thấy dữ liệu mới (non-repeatable read).
