---
id: quiz-system-design-chia-monolith-thanh-microservices-moi-service-nen-co-db-rieng-hay-dung-chung-mot
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chia monolith thành microservices, mỗi service nên có DB riêng hay dùng chung một DB?

## Đáp án trắc nghiệm
- [ ] DB chung để tránh phải đồng bộ dữ liệu giữa các service
- [ ] DB chung nhưng mỗi service dùng schema riêng trong đó
- [ ] Tuỳ quy mô, dưới 10 service thì nên dùng chung
- [x] DB riêng, service khác cần dữ liệu thì gọi API hoặc nghe sự kiện

## Giải thích (VI)
DB riêng cho mỗi service (database per service). DB chung là cái bẫy phổ biến nhất: hai service cùng đọc ghi một bảng thì đổi schema phải deploy đồng thời — bạn có đủ chi phí của microservices mà không có lợi ích deploy độc lập.

### Giải thích các phương án:
- **DB chung để tránh phải đồng bộ dữ liệu giữa các service** (Sai): Tiện lúc đầu nhưng tạo ra monolith phân tán: khó nhất trong các lựa chọn.
- **DB chung nhưng mỗi service dùng schema riêng trong đó** (Sai): Đỡ hơn dùng chung bảng, nhưng vẫn chung một điểm chịu lỗi và một lịch nâng cấp.
- **Tuỳ quy mô, dưới 10 service thì nên dùng chung** (Sai): Số lượng service không phải tiêu chí quyết định ở đây.
- **DB riêng, service khác cần dữ liệu thì gọi API hoặc nghe sự kiện** (Đúng): DB chung làm các service ràng buộc vào schema của nhau nên không deploy độc lập được.
