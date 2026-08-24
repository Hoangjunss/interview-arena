---
id: quiz-testing-trong-testing-library-nen-tim-phan-tu-bang-cach-nao
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Testing Library, nên tìm phần tử bằng cách nào?

## Đáp án trắc nghiệm
- [ ] getByText cho mọi trường hợp vì đơn giản nhất
- [x] getByRole kèm tên, gần cách người dùng nhận ra phần tử
- [ ] getByTestId vì nó ổn định nhất khi refactor lại giao diện
- [ ] querySelector với class CSS cho linh hoạt

## Giải thích (VI)
Ưu tiên getByRole('button', { name: /gửi/i }). Thứ tự khuyến nghị: role → label → placeholder → text → cuối cùng mới getByTestId. Query theo role vừa gần cách người dùng nhìn giao diện, vừa phát hiện thiếu nhãn truy cập.

### Giải thích các phương án:
- **getByText cho mọi trường hợp vì đơn giản nhất** (Sai): Hữu ích nhưng thiếu ngữ nghĩa: không phân biệt được nút với đoạn văn bản.
- **getByRole kèm tên, gần cách người dùng nhận ra phần tử** (Đúng): Query theo role còn kiểm tra luôn khả năng truy cập của giao diện.
- **getByTestId vì nó ổn định nhất khi refactor lại giao diện** (Sai): Ổn định nhưng không phản ánh cách người dùng tương tác; để dành khi hết cách.
- **querySelector với class CSS cho linh hoạt** (Sai): Class thay đổi khi sửa style và không liên quan tới hành vi.
