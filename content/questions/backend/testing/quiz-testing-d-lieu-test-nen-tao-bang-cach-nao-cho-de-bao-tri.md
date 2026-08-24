---
id: quiz-testing-d-lieu-test-nen-tao-bang-cach-nao-cho-de-bao-tri
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dữ liệu test nên tạo bằng cách nào cho dễ bảo trì?

## Đáp án trắc nghiệm
- [x] Factory có mặc định, test chỉ khai phần nó quan tâm
- [ ] Viết đầy đủ mọi field ngay trong từng test cho rõ ràng
- [ ] Một tệp fixture dùng chung cho toàn bộ bộ test của dự án
- [ ] Sinh dữ liệu ngẫu nhiên hoàn toàn cho mỗi lần chạy

## Giải thích (VI)
Factory/builder có giá trị mặc định hợp lệ, test chỉ ghi đè phần liên quan: makeUser({ role: 'admin' }). Test đọc dễ vì chỉ thấy thứ quan trọng, và thêm field bắt buộc chỉ cần sửa một chỗ.

### Giải thích các phương án:
- **Factory có mặc định, test chỉ khai phần nó quan tâm** (Đúng): Thêm một field bắt buộc chỉ phải sửa factory chứ không sửa hàng trăm test.
- **Viết đầy đủ mọi field ngay trong từng test cho rõ ràng** (Sai): Rõ nhưng lặp lại nhiều, và thêm một field là phải sửa mọi test.
- **Một tệp fixture dùng chung cho toàn bộ bộ test của dự án** (Sai): Các test bắt đầu phụ thuộc lẫn nhau qua dữ liệu chung.
- **Sinh dữ liệu ngẫu nhiên hoàn toàn cho mỗi lần chạy** (Sai): Test khó tái hiện khi fail vì mỗi lần chạy dữ liệu khác nhau.
