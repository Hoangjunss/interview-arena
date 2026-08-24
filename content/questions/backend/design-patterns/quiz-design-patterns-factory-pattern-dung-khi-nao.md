---
id: quiz-design-patterns-factory-pattern-dung-khi-nao
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Factory pattern dùng khi nào?

## Đáp án trắc nghiệm
- [ ] Khi đối tượng có quá nhiều tham số khởi tạo
- [x] Khi chọn lớp cụ thể phụ thuộc dữ liệu lúc chạy
- [ ] Khi cần bảo đảm chỉ có một đối tượng trong hệ thống
- [ ] Khi cần tạo đối tượng nhanh hơn so với cách thông thường

## Giải thích (VI)
Khi lớp cụ thể được chọn lúc chạy dựa vào dữ liệu: createPaymentGateway(method) trả về cổng phù hợp. Nơi gọi chỉ biết interface, và thêm phương thức thanh toán mới không phải sửa nơi gọi.

### Giải thích các phương án:
- **Khi đối tượng có quá nhiều tham số khởi tạo** (Sai): Trường hợp đó builder phù hợp hơn.
- **Khi chọn lớp cụ thể phụ thuộc dữ liệu lúc chạy** (Đúng): Nơi gọi chỉ cần kết quả, không cần biết lớp nào được tạo.
- **Khi cần bảo đảm chỉ có một đối tượng trong hệ thống** (Sai): Đó là singleton.
- **Khi cần tạo đối tượng nhanh hơn so với cách thông thường** (Sai): Factory không liên quan tới hiệu năng khởi tạo.
