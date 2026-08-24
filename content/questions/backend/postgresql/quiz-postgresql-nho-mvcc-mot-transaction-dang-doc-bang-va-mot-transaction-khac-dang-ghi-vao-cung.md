---
id: quiz-postgresql-nho-mvcc-mot-transaction-dang-doc-bang-va-mot-transaction-khac-dang-ghi-vao-cung
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nhờ MVCC, một transaction đang đọc bảng và một transaction khác đang ghi vào cùng bảng thì chuyện gì xảy ra?

## Đáp án trắc nghiệm
- [ ] Reader thấy ngay dữ liệu đang ghi dở của writer
- [ ] Transaction đọc phải chờ transaction ghi commit xong mới đọc được
- [x] Cả hai chạy song song, reader thấy bản đã commit
- [ ] Transaction ghi bị hoãn tới khi mọi reader đóng kết nối

## Giải thích (VI)
Cả hai chạy song song . MVCC (Multi-Version Concurrency Control) giữ nhiều phiên bản của mỗi row: reader đọc phiên bản đã commit theo snapshot của mình, writer tạo phiên bản mới. Vì vậy trong Postgres, đọc không chặn ghi và ghi không chặn đọc — chỉ hai writer trên cùng một row mới phải chờ nhau.

### Giải thích các phương án:
- **Reader thấy ngay dữ liệu đang ghi dở của writer** (Sai): Postgres không cho đọc dữ liệu chưa commit ở bất kỳ isolation level nào.
- **Transaction đọc phải chờ transaction ghi commit xong mới đọc được** (Sai): Đó là hành vi của khoá đọc-ghi truyền thống; MVCC sinh ra để tránh đúng việc này.
- **Cả hai chạy song song, reader thấy bản đã commit** (Đúng): MVCC giữ nhiều phiên bản của một row nên đọc không chặn ghi và ngược lại.
- **Transaction ghi bị hoãn tới khi mọi reader đóng kết nối** (Sai): Writer không quan tâm reader; nó chỉ chờ khi đụng writer khác trên cùng row.
