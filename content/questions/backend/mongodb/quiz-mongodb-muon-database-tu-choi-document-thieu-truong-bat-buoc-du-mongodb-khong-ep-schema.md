---
id: quiz-mongodb-muon-database-tu-choi-document-thieu-truong-bat-buoc-du-mongodb-khong-ep-schema
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn database từ chối document thiếu trường bắt buộc, dù MongoDB không ép schema, thì dùng gì?

## Đáp án trắc nghiệm
- [x] Schema validation bằng $jsonSchema khai báo trên collection
- [ ] Đặt strict: true khi kết nối driver
- [ ] Không có cách nào — bắt buộc phải kiểm tra hoàn toàn ở tầng ứng dụng
- [ ] Tạo unique index cho mọi trường bắt buộc

## Giải thích (VI)
Schema validation với $jsonSchema: khai báo required và kiểu dữ liệu trên collection, MongoDB từ chối ghi khi vi phạm. Nó bổ sung chứ không thay thế kiểm tra ở ứng dụng — nhưng là lưới an toàn cuối khi có nhiều dịch vụ cùng ghi vào một collection.

### Giải thích các phương án:
- **Schema validation bằng $jsonSchema khai báo trên collection** (Đúng): Đây là cơ chế kiểm tra ở tầng database do MongoDB cung cấp sẵn: kiểm tra mỗi lần ghi và từ chối document không hợp lệ.
- **Đặt strict: true khi kết nối driver** (Sai): Không có tùy chọn kết nối nào làm việc này.
- **Không có cách nào — bắt buộc phải kiểm tra hoàn toàn ở tầng ứng dụng** (Sai): MongoDB có schema validation từ phiên bản 3.2.
- **Tạo unique index cho mọi trường bắt buộc** (Sai): Unique index đảm bảo không trùng, không đảm bảo có mặt.
