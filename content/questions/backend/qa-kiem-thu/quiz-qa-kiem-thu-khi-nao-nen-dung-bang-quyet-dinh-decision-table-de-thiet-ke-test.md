---
id: quiz-qa-kiem-thu-khi-nao-nen-dung-bang-quyet-dinh-decision-table-de-thiet-ke-test
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng bảng quyết định (decision table) để thiết kế test?

## Đáp án trắc nghiệm
- [x] Khi kết quả phụ thuộc vào tổ hợp nhiều điều kiện
- [ ] Khi hệ thống có nhiều màn hình nối tiếp nhau
- [ ] Khi cần kiểm tra một ô nhập có nhiều khoảng giá trị
- [ ] Khi cần đo độ phủ câu lệnh của mã nguồn

## Giải thích (VI)
Khi kết quả phụ thuộc vào tổ hợp nhiều điều kiện — ví dụ quy tắc tính chiết khấu theo hạng thành viên, giá trị đơn hàng và mã khuyến mại. Bảng giúp lộ ra tổ hợp mà đặc tả bỏ sót.

### Giải thích các phương án:
- **Khi kết quả phụ thuộc vào tổ hợp nhiều điều kiện** (Đúng): Bảng quyết định liệt kê có hệ thống các tổ hợp điều kiện và hành động tương ứng.
- **Khi hệ thống có nhiều màn hình nối tiếp nhau** (Sai): Luồng chuyển màn hình phù hợp với kiểm thử chuyển trạng thái.
- **Khi cần kiểm tra một ô nhập có nhiều khoảng giá trị** (Sai): Trường hợp này dùng phân vùng tương đương và giá trị biên.
- **Khi cần đo độ phủ câu lệnh của mã nguồn** (Sai): Đó là kỹ thuật hộp trắng, không phải bảng quyết định.
