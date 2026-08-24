---
id: quiz-testing-phan-nao-cua-code-dang-duoc-test-nhieu-nhat-khi-thoi-gian-co-han
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phần nào của code đáng được test nhiều nhất khi thời gian có hạn?

## Đáp án trắc nghiệm
- [ ] Phần code mới viết, còn code cũ đã chạy ổn thì bỏ qua
- [x] Logic nghiệp vụ phức tạp và luồng gây thiệt hại khi sai
- [ ] Các component giao diện vì người dùng thấy trực tiếp
- [ ] Toàn bộ code với mức độ như nhau cho công bằng giữa các phần

## Giải thích (VI)
Ưu tiên theo mức thiệt hại nếu sai × độ phức tạp : tính tiền, phân quyền, tồn kho, luồng thanh toán, và mọi chỗ có nhiều nhánh điều kiện. Getter, mapper đơn giản hay code chỉ ghép chuỗi thì để sau.

### Giải thích các phương án:
- **Phần code mới viết, còn code cũ đã chạy ổn thì bỏ qua** (Sai): Code cũ vẫn vỡ khi refactor, và thường không ai còn nhớ nó làm gì.
- **Logic nghiệp vụ phức tạp và luồng gây thiệt hại khi sai** (Đúng): Tính tiền, phân quyền, tồn kho — sai ở đó là mất tiền hoặc mất dữ liệu.
- **Các component giao diện vì người dùng thấy trực tiếp** (Sai): Lỗi giao diện thường dễ phát hiện và ít gây thiệt hại lâu dài.
- **Toàn bộ code với mức độ như nhau cho công bằng giữa các phần** (Sai): Chia đều công sức nghĩa là phần quan trọng nhất bị test ít hơn mức cần.
