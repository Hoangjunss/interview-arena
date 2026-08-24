---
id: quiz-elasticsearch-nap-mot-trieu-ban-ghi-vao-elasticsearch-nen-dung-cach-nao
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nạp một triệu bản ghi vào Elasticsearch nên dùng cách nào?

## Đáp án trắc nghiệm
- [ ] Ghi thẳng tệp dữ liệu vào thư mục của chỉ mục
- [ ] Gửi từng tài liệu một để dễ bắt lỗi
- [ ] Tạo một chỉ mục riêng cho mỗi nghìn bản ghi
- [x] Dùng API ghi hàng loạt theo từng lô

## Giải thích (VI)
Dùng API ghi hàng loạt theo từng lô, mỗi lô vài megabyte. Gộp nhiều tài liệu vào một yêu cầu giảm mạnh chi phí mạng và chi phí xử lý, và đây là khác biệt hàng chục lần về tốc độ nạp.

### Giải thích các phương án:
- **Ghi thẳng tệp dữ liệu vào thư mục của chỉ mục** (Sai): Không có cách nạp dữ liệu bằng cách chép tệp như vậy.
- **Gửi từng tài liệu một để dễ bắt lỗi** (Sai): Chi phí mỗi yêu cầu nhân lên một triệu lần làm việc nạp cực chậm.
- **Tạo một chỉ mục riêng cho mỗi nghìn bản ghi** (Sai): Quá nhiều chỉ mục nhỏ gây tốn tài nguyên quản lý cụm.
- **Dùng API ghi hàng loạt theo từng lô** (Đúng): Gộp nhiều tài liệu vào một yêu cầu giảm mạnh chi phí mạng và chi phí xử lý từng yêu cầu.
