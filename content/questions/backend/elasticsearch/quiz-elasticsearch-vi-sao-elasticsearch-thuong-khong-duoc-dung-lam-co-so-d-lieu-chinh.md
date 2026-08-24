---
id: quiz-elasticsearch-vi-sao-elasticsearch-thuong-khong-duoc-dung-lam-co-so-d-lieu-chinh
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao Elasticsearch thường không được dùng làm cơ sở dữ liệu chính?

## Đáp án trắc nghiệm
- [ ] Không mở rộng được khi dữ liệu lớn dần
- [ ] Không lưu được dữ liệu xuống đĩa một cách bền vững
- [x] Không có giao dịch và ràng buộc toàn vẹn
- [ ] Không truy vấn được theo định danh của tài liệu

## Giải thích (VI)
Nó không có giao dịch trên nhiều tài liệu, không có khoá ngoại và không có ràng buộc toàn vẹn . Mô hình thường dùng là giữ nguồn sự thật ở cơ sở dữ liệu giao dịch rồi đồng bộ sang Elasticsearch để phục vụ tìm kiếm.

### Giải thích các phương án:
- **Không mở rộng được khi dữ liệu lớn dần** (Sai): Mở rộng theo chiều ngang chính là điểm mạnh của nó.
- **Không lưu được dữ liệu xuống đĩa một cách bền vững** (Sai): Dữ liệu được ghi bền vững bình thường.
- **Không có giao dịch và ràng buộc toàn vẹn** (Đúng): Nó tối ưu cho tìm kiếm và phân tích chứ không bảo đảm nhất quán như cơ sở dữ liệu giao dịch.
- **Không truy vấn được theo định danh của tài liệu** (Sai): Lấy tài liệu theo định danh là thao tác cơ bản và rất nhanh.
