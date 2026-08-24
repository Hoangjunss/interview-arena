---
id: quiz-ruby-on-rails-quan-he-truy-van-trong-activerecord-duoc-thuc-thi-vao-luc-nao
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quan hệ truy vấn trong ActiveRecord được thực thi vào lúc nào?

## Đáp án trắc nghiệm
- [ ] Ngay khi dòng lệnh truy vấn được viết ra
- [x] Khi kết quả thật sự được dùng tới
- [ ] Khi controller trả về phản hồi cho người dùng
- [ ] Khi giao dịch cơ sở dữ liệu được xác nhận

## Giải thích (VI)
Quan hệ được thực thi khi kết quả thật sự được dùng , ví dụ khi duyệt hoặc khi đếm. Nhờ lười thực thi, các điều kiện lọc nối tiếp nhau được gộp thành một truy vấn duy nhất thay vì chạy từng bước.

### Giải thích các phương án:
- **Ngay khi dòng lệnh truy vấn được viết ra** (Sai): Nếu vậy thì không nối tiếp được các điều kiện lọc.
- **Khi kết quả thật sự được dùng tới** (Đúng): Nhờ lười thực thi mà các điều kiện lọc nối tiếp nhau được gộp thành một truy vấn duy nhất.
- **Khi controller trả về phản hồi cho người dùng** (Sai): Thời điểm phụ thuộc vào chỗ kết quả được dùng chứ không phải chỗ trả phản hồi.
- **Khi giao dịch cơ sở dữ liệu được xác nhận** (Sai): Truy vấn đọc không cần chờ xác nhận giao dịch.
