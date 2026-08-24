---
id: quiz-ruby-on-rails-d-lieu-mau-co-dinh-va-factory-sinh-d-lieu-khac-nhau-o-diem-nao-trong-kiem-thu
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dữ liệu mẫu cố định và factory sinh dữ liệu khác nhau ở điểm nào trong kiểm thử?

## Đáp án trắc nghiệm
- [ ] Factory chỉ dùng được với cơ sở dữ liệu trong bộ nhớ
- [ ] Factory không tạo được dữ liệu hợp lệ theo ràng buộc
- [x] Dữ liệu cố định nạp sẵn, factory sinh theo bài
- [ ] Dữ liệu cố định không thể có quan hệ giữa các bảng

## Giải thích (VI)
Dữ liệu cố định được nạp sẵn một lần cho cả bộ kiểm thử nên nhanh nhưng dùng chung và dễ gây phụ thuộc ngầm. Factory sinh dữ liệu theo từng bài nên mỗi bài tự mô tả điều kiện của mình, đổi lại chậm hơn.

### Giải thích các phương án:
- **Factory chỉ dùng được với cơ sở dữ liệu trong bộ nhớ** (Sai): Cả hai đều dùng với cơ sở dữ liệu thật của môi trường kiểm thử.
- **Factory không tạo được dữ liệu hợp lệ theo ràng buộc** (Sai): Nó tạo dữ liệu hợp lệ theo định nghĩa được viết sẵn.
- **Dữ liệu cố định nạp sẵn, factory sinh theo bài** (Đúng): Nạp sẵn nhanh hơn nhưng dữ liệu dùng chung; sinh theo bài thì rõ ràng hơn nhưng chậm hơn.
- **Dữ liệu cố định không thể có quan hệ giữa các bảng** (Sai): Quan hệ khai báo được trong tệp dữ liệu cố định.
