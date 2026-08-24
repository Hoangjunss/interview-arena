---
id: quiz-redis-hai-tien-trinh-cung-dem-luot-xem-tren-mot-key-cach-nao-dung
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai tiến trình cùng đếm lượt xem trên một key. Cách nào đúng?

## Đáp án trắc nghiệm
- [ ] Mỗi tiến trình dùng một key riêng rồi cộng khi đọc
- [ ] Đặt một lock ở tầng ứng dụng quanh GET/SET
- [ ] GET rồi cộng ở phía ứng dụng rồi SET giá trị mới lại
- [x] Dùng INCR — Redis thực hiện tăng atomic trên server

## Giải thích (VI)
Dùng INCR. Mọi lệnh Redis đều atomic vì chạy trên một luồng, nên INCR không có khoảng trống đọc-sửa-ghi. Đọc rồi cộng ở ứng dụng là kiểu mất cập nhật kinh điển.

### Giải thích các phương án:
- **Mỗi tiến trình dùng một key riêng rồi cộng khi đọc** (Sai): Chạy được nhưng phải biết trước có bao nhiêu tiến trình và phải quét nhiều key khi đọc.
- **Đặt một lock ở tầng ứng dụng quanh GET/SET** (Sai): Tốn thêm một vòng mạng và một điểm hỏng, trong khi đã có lệnh atomic sẵn.
- **GET rồi cộng ở phía ứng dụng rồi SET giá trị mới lại** (Sai): Đây đúng là tình huống mất cập nhật: hai tiến trình đọc cùng giá trị rồi ghi cùng kết quả.
- **Dùng INCR — Redis thực hiện tăng atomic trên server** (Đúng): Không có khoảng trống giữa đọc và ghi nên hai tiến trình không ghi đè lẫn nhau.
