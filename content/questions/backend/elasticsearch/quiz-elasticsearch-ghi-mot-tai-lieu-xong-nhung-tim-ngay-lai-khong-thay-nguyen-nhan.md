---
id: quiz-elasticsearch-ghi-mot-tai-lieu-xong-nhung-tim-ngay-lai-khong-thay-nguyen-nhan
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ghi một tài liệu xong nhưng tìm ngay lại không thấy. Nguyên nhân?

## Đáp án trắc nghiệm
- [ ] Bản sao chưa đồng bộ nên truy vấn không thấy
- [x] Tài liệu tìm được sau lần làm mới kế tiếp
- [ ] Chỉ mục cần được tối ưu lại trước khi tìm được
- [ ] Tài liệu chưa được ghi thành công xuống đĩa

## Giải thích (VI)
Elasticsearch là hệ thời gian thực gần đúng : tài liệu chỉ tìm thấy sau lần làm mới kế tiếp, mặc định khoảng một giây. Dữ liệu đã bền vững ngay khi ghi xong, chỉ là chưa xuất hiện trong kết quả tìm kiếm.

### Giải thích các phương án:
- **Bản sao chưa đồng bộ nên truy vấn không thấy** (Sai): Bản sao được ghi đồng bộ trước khi phản hồi trả về.
- **Tài liệu tìm được sau lần làm mới kế tiếp** (Đúng): Elasticsearch là hệ thời gian thực gần đúng, mặc định làm mới mỗi giây một lần.
- **Chỉ mục cần được tối ưu lại trước khi tìm được** (Sai): Việc gộp phân đoạn không quyết định khả năng tìm thấy.
- **Tài liệu chưa được ghi thành công xuống đĩa** (Sai): Ghi đã thành công và bền vững trước khi trả về kết quả.
