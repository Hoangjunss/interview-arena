---
id: quiz-elasticsearch-mapping-dong-trong-elasticsearch-hoat-dong-the-nao
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mapping động trong Elasticsearch hoạt động thế nào?

## Đáp án trắc nghiệm
- [ ] Trường mới bị bỏ qua cho tới khi khai báo tường minh
- [x] Trường mới tự được đoán kiểu khi lần đầu gặp
- [ ] Mọi trường đều được lưu dưới dạng chuỗi ký tự
- [ ] Kiểu của trường được xác định lại ở mỗi lần ghi

## Giải thích (VI)
Trường mới tự được đoán kiểu khi tài liệu đầu tiên chứa nó. Tiện lúc thử nghiệm nhưng nguy hiểm ở sản phẩm: đoán sai kiểu thì phải tạo chỉ mục mới và nạp lại toàn bộ dữ liệu mới sửa được.

### Giải thích các phương án:
- **Trường mới bị bỏ qua cho tới khi khai báo tường minh** (Sai): Đó là hành vi khi tắt mapping động chứ không phải mặc định.
- **Trường mới tự được đoán kiểu khi lần đầu gặp** (Đúng): Tiện lúc thử nghiệm nhưng dễ đoán sai kiểu và khó sửa về sau.
- **Mọi trường đều được lưu dưới dạng chuỗi ký tự** (Sai): Số, ngày và giá trị đúng sai được nhận diện riêng.
- **Kiểu của trường được xác định lại ở mỗi lần ghi** (Sai): Kiểu chỉ được đặt một lần và giữ nguyên cho chỉ mục đó.
