---
id: quiz-testing-test-form-nhap-lieu-nen-mo-phong-nguoi-dung-bang-cach-nao
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test form nhập liệu, nên mô phỏng người dùng bằng cách nào?

## Đáp án trắc nghiệm
- [x] userEvent vì nó phát đúng chuỗi sự kiện thật
- [ ] Gọi hàm submit của form thay vì tương tác qua input
- [ ] fireEvent.change vì nó ngắn và đủ để đổi giá trị
- [ ] Gán trực tiếp vào thuộc tính value của phần tử input đó

## Giải thích (VI)
userEvent (await user.type(...), await user.click(...)). Nó phát đúng chuỗi sự kiện thật — focus, keydown, input, change — nên bắt được lỗi mà fireEvent bỏ qua, ví dụ validate chạy theo blur.

### Giải thích các phương án:
- **userEvent vì nó phát đúng chuỗi sự kiện thật** (Đúng): fireEvent chỉ bắn một sự kiện nên bỏ qua focus, keydown, input.
- **Gọi hàm submit của form thay vì tương tác qua input** (Sai): Bỏ qua toàn bộ phần validate khi người dùng gõ.
- **fireEvent.change vì nó ngắn và đủ để đổi giá trị** (Sai): Đổi được giá trị nhưng bỏ qua các sự kiện mà code có thể đang lắng nghe.
- **Gán trực tiếp vào thuộc tính value của phần tử input đó** (Sai): React không nhận biết thay đổi này nên state không cập nhật.
