---
id: quiz-design-patterns-repository-pattern-mang-lai-loi-ich-gi-so-voi-goi-thang-orm-trong-service
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Repository pattern mang lại lợi ích gì so với gọi thẳng ORM trong service?

## Đáp án trắc nghiệm
- [ ] Cho phép đổi từ SQL sang NoSQL mà không phải sửa gì cả
- [x] Truy vấn tập trung một chỗ, service test được không cần DB
- [ ] Truy vấn chạy nhanh hơn nhờ được tối ưu tập trung
- [ ] Tự động thêm cache cho mọi truy vấn đi qua nó

## Giải thích (VI)
Hai lợi ích thực tế: truy vấn tập trung một chỗ (sửa schema thì biết phải sửa ở đâu, và tên truy vấn nói lên ý nghĩa nghiệp vụ), và service test được với repository giả mà không cần DB thật.

### Giải thích các phương án:
- **Cho phép đổi từ SQL sang NoSQL mà không phải sửa gì cả** (Sai): Promise này ít khi đúng vì mô hình dữ liệu khác nhau về bản chất.
- **Truy vấn tập trung một chỗ, service test được không cần DB** (Đúng): Truy vấn rải khắp service thì sửa schema phải tìm khắp nơi.
- **Truy vấn chạy nhanh hơn nhờ được tối ưu tập trung** (Sai): Không ảnh hưởng tới hiệu năng của bản thân truy vấn.
- **Tự động thêm cache cho mọi truy vấn đi qua nó** (Sai): Cache là việc phải tự thêm, không có sẵn.
