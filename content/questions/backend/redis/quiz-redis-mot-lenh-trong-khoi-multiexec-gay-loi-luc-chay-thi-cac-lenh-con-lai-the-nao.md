---
id: quiz-redis-mot-lenh-trong-khoi-multiexec-gay-loi-luc-chay-thi-cac-lenh-con-lai-the-nao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một lệnh trong khối MULTI/EXEC gây lỗi lúc chạy thì các lệnh còn lại thế nào?

## Đáp án trắc nghiệm
- [ ] Khối dừng ngay tại lệnh lỗi, các lệnh sau bị bỏ
- [ ] Toàn bộ khối được rollback về đúng trạng thái trước đó
- [ ] Redis thử lại lệnh lỗi cho tới khi thành công
- [x] Các lệnh khác vẫn chạy — Redis không rollback

## Giải thích (VI)
Các lệnh còn lại vẫn chạy — Redis không rollback. Phản hồi của EXEC là một mảng, phần tử tương ứng chứa lỗi. Đây là điểm khiến "transaction" của Redis không giống transaction của SQL.

### Giải thích các phương án:
- **Khối dừng ngay tại lệnh lỗi, các lệnh sau bị bỏ** (Sai): Các lệnh sau vẫn được thực thi lần lượt.
- **Toàn bộ khối được rollback về đúng trạng thái trước đó** (Sai): Redis không có rollback; không có khái niệm undo log như cơ sở dữ liệu quan hệ.
- **Redis thử lại lệnh lỗi cho tới khi thành công** (Sai): Không có cơ chế thử lại tự động ở phía server.
- **Các lệnh khác vẫn chạy — Redis không rollback** (Đúng): Chỉ lỗi cú pháp phát hiện lúc xếp hàng mới làm cả khối bị từ chối.
