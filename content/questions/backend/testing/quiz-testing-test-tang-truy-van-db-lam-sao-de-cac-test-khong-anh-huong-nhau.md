---
id: quiz-testing-test-tang-truy-van-db-lam-sao-de-cac-test-khong-anh-huong-nhau
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test tầng truy vấn DB, làm sao để các test không ảnh hưởng nhau?

## Đáp án trắc nghiệm
- [ ] Mock toàn bộ tầng DB để không cần dữ liệu thật
- [x] Mỗi test chạy trong transaction rồi rollback
- [ ] Xoá toàn bộ bảng trước mỗi test bằng lệnh TRUNCATE CASCADE
- [ ] Đặt tên dữ liệu test khác nhau để không đụng nhau

## Giải thích (VI)
Bọc mỗi test trong một transaction rồi rollback : dữ liệu tự biến mất, không cần dọn, và mỗi test bắt đầu từ trạng thái sạch. Nếu framework không hỗ trợ thì dùng schema riêng cho mỗi worker để chạy song song.

### Giải thích các phương án:
- **Mock toàn bộ tầng DB để không cần dữ liệu thật** (Sai): Khi đó không còn kiểm tra được truy vấn có đúng với schema hay không.
- **Mỗi test chạy trong transaction rồi rollback** (Đúng): Dữ liệu không đọng lại và không cần dọn bảng bằng tay sau mỗi test.
- **Xoá toàn bộ bảng trước mỗi test bằng lệnh TRUNCATE CASCADE** (Sai): Chạy được nhưng chậm hơn và không chạy song song được.
- **Đặt tên dữ liệu test khác nhau để không đụng nhau** (Sai): Khó duy trì và vẫn để lại dữ liệu rác trong DB.
