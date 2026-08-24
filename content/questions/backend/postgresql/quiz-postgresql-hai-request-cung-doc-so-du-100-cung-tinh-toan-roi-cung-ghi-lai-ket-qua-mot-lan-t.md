---
id: quiz-postgresql-hai-request-cung-doc-so-du-100-cung-tinh-toan-roi-cung-ghi-lai-ket-qua-mot-lan-t
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai request cùng đọc số dư 100, cùng tính toán rồi cùng ghi lại — kết quả một lần trừ tiền bị mất (lost update). Ở READ COMMITTED, cách chặn theo hướng pessimistic là gì?

## Đáp án trắc nghiệm
- [ ] Hạ isolation xuống mức thấp nhất để ghi được nhanh hơn
- [ ] Thêm UNIQUE constraint trên cột số dư để chặn ghi trùng
- [ ] Bọc cả đọc lẫn ghi trong một transaction BEGIN...COMMIT
- [x] Đọc bằng SELECT ... FOR UPDATE trước khi tính

## Giải thích (VI)
SELECT ... FOR UPDATE khoá row ngay lúc đọc : transaction thứ hai chạm vào row đó phải chờ transaction đầu commit, rồi mới đọc — và đọc được giá trị mới. Chuỗi đọc-tính-ghi vì thế thành tuần tự trên từng row. Chỉ BEGIN...COMMIT không đủ, vì SELECT thường không khoá gì.

### Giải thích các phương án:
- **Hạ isolation xuống mức thấp nhất để ghi được nhanh hơn** (Sai): Isolation thấp hơn không tồn tại trong Postgres và cũng không giải quyết gì.
- **Thêm UNIQUE constraint trên cột số dư để chặn ghi trùng** (Sai): UNIQUE chặn giá trị trùng giữa các row, không liên quan tới lost update.
- **Bọc cả đọc lẫn ghi trong một transaction BEGIN...COMMIT** (Sai): Transaction không tự khoá row khi SELECT; hai bên vẫn đọc được cùng giá trị cũ.
- **Đọc bằng SELECT ... FOR UPDATE trước khi tính** (Đúng): Request thứ hai phải chờ ở bước đọc, nên nó luôn thấy số dư mới nhất.
