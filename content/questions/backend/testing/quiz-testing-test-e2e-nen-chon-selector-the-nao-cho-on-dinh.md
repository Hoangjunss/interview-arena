---
id: quiz-testing-test-e2e-nen-chon-selector-the-nao-cho-on-dinh
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test e2e nên chọn selector thế nào cho ổn định?

## Đáp án trắc nghiệm
- [ ] Theo thứ tự phần tử trong trang, ví dụ nút thứ ba
- [ ] Theo class CSS vì nó ngắn và dễ đọc trong test
- [x] Theo role và nhãn hiển thị, hoặc data-testid
- [ ] Theo XPath đầy đủ để chỉ tới đúng một phần tử duy nhất trong trang

## Giải thích (VI)
Ưu tiên role + nhãn người dùng thấy (getByRole('button', { name: 'Thanh toán' })), và dùng data-testid cho những chỗ không có nhãn ổn định. Tránh XPath, class CSS, và vị trí theo thứ tự.

### Giải thích các phương án:
- **Theo thứ tự phần tử trong trang, ví dụ nút thứ ba** (Sai): Thêm một nút ở trên là toàn bộ test sai hết.
- **Theo class CSS vì nó ngắn và dễ đọc trong test** (Sai): Class gắn với style nên đổi thường xuyên mà chức năng không đổi.
- **Theo role và nhãn hiển thị, hoặc data-testid** (Đúng): Selector theo CSS class hay đường dẫn DOM vỡ ngay khi sửa layout.
- **Theo XPath đầy đủ để chỉ tới đúng một phần tử duy nhất trong trang** (Sai): Đây là loại selector dễ vỡ nhất khi cấu trúc thay đổi.
