---
id: quiz-aws-cloud-rds-multi-az-dung-de-lam-gi
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RDS Multi-AZ dùng để làm gì?

## Đáp án trắc nghiệm
- [x] Chuyển đổi dự phòng khi AZ chính gặp sự cố
- [ ] Sao lưu dữ liệu định kỳ sang vùng khác
- [ ] Tăng khả năng đọc bằng cách chia tải truy vấn
- [ ] Giảm chi phí bằng cách chia nhỏ cơ sở dữ liệu

## Giải thích (VI)
Để sẵn sàng cao : một bản dự phòng đồng bộ ở AZ khác, tự chuyển sang khi bản chính hỏng. Nó không dùng để tăng khả năng đọc — muốn chia tải đọc thì dùng read replica (sao chép bất đồng bộ).

### Giải thích các phương án:
- **Chuyển đổi dự phòng khi AZ chính gặp sự cố** (Đúng): Bản dự phòng đồng bộ ở AZ khác, tự chuyển khi có sự cố.
- **Sao lưu dữ liệu định kỳ sang vùng khác** (Sai): Sao lưu là cơ chế riêng, không phải mục đích của Multi-AZ.
- **Tăng khả năng đọc bằng cách chia tải truy vấn** (Sai): Đó là read replica.
- **Giảm chi phí bằng cách chia nhỏ cơ sở dữ liệu** (Sai): Multi-AZ làm tăng chi phí vì phải chạy thêm bản dự phòng.
