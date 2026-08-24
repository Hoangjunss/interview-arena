---
id: quiz-graphql-fragment-trong-graphql-dung-de-lam-gi
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Fragment trong GraphQL dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Tải dần từng phần dữ liệu theo thời gian
- [x] Gom một nhóm trường dùng lại ở nhiều truy vấn
- [ ] Chia một truy vấn lớn thành nhiều yêu cầu HTTP
- [ ] Lưu kết quả truy vấn vào cache của client

## Giải thích (VI)
Fragment gom một nhóm trường dùng lại được . Trong thực tế, nó cho phép mỗi thành phần giao diện khai báo dữ liệu nó cần, rồi màn hình ghép các fragment lại thành một truy vấn duy nhất.

### Giải thích các phương án:
- **Tải dần từng phần dữ liệu theo thời gian** (Sai): Việc tải dần cần chỉ thị riêng chứ không phải fragment.
- **Gom một nhóm trường dùng lại ở nhiều truy vấn** (Đúng): Nhờ đó thành phần giao diện khai báo được dữ liệu nó cần và ghép vào truy vấn của màn hình.
- **Chia một truy vấn lớn thành nhiều yêu cầu HTTP** (Sai): Fragment không ảnh hưởng tới số lượng yêu cầu gửi đi.
- **Lưu kết quả truy vấn vào cache của client** (Sai): Bộ nhớ đệm là cơ chế riêng của thư viện client.
