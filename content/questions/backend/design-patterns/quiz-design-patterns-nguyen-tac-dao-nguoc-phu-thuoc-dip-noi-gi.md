---
id: quiz-design-patterns-nguyen-tac-dao-nguoc-phu-thuoc-dip-noi-gi
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên tắc đảo ngược phụ thuộc (DIP) nói gì?

## Đáp án trắc nghiệm
- [ ] Số lượng phụ thuộc của một lớp thì phải càng ít càng tốt
- [ ] Mọi phụ thuộc phải được truyền vào qua hàm khởi tạo
- [x] Cả hai tầng phụ thuộc vào abstraction, không phụ thuộc nhau
- [ ] Tầng thấp không được gọi tới tầng cao hơn nó

## Giải thích (VI)
Tầng nghiệp vụ không phụ thuộc vào chi tiết hạ tầng; cả hai phụ thuộc vào một abstraction. Ví dụ: OrderService phụ thuộc interface OrderRepository, còn lớp dùng Postgres cài đặt interface đó.

### Giải thích các phương án:
- **Số lượng phụ thuộc của một lớp thì phải càng ít càng tốt** (Sai): Là lời khuyên chung về thiết kế, không phải DIP.
- **Mọi phụ thuộc phải được truyền vào qua hàm khởi tạo** (Sai): Đó là dependency injection, một kỹ thuật để đạt DIP.
- **Cả hai tầng phụ thuộc vào abstraction, không phụ thuộc nhau** (Đúng): Nhờ đó tầng nghiệp vụ không bị ràng buộc vào chi tiết hạ tầng cụ thể.
- **Tầng thấp không được gọi tới tầng cao hơn nó** (Sai): Là quy tắc phân tầng thông thường, không phải nội dung của DIP.
