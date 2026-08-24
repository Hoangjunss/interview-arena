---
id: quiz-elasticsearch-phan-doan-trong-lucene-co-dac-diem-gi-quan-trong
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân đoạn trong Lucene có đặc điểm gì quan trọng?

## Đáp án trắc nghiệm
- [ ] Được sửa trực tiếp mỗi khi tài liệu thay đổi
- [ ] Chỉ tồn tại trong bộ nhớ chứ không ghi xuống đĩa
- [ ] Mỗi chỉ mục chỉ có đúng một phân đoạn
- [x] Bất biến sau khi tạo, cập nhật là ghi bản mới

## Giải thích (VI)
Phân đoạn bất biến sau khi tạo . Cập nhật một tài liệu thực chất là ghi bản mới và đánh dấu bản cũ đã xoá, nên bản cũ vẫn chiếm chỗ cho tới khi các phân đoạn được gộp lại.

### Giải thích các phương án:
- **Được sửa trực tiếp mỗi khi tài liệu thay đổi** (Sai): Phân đoạn không sửa được sau khi ghi.
- **Chỉ tồn tại trong bộ nhớ chứ không ghi xuống đĩa** (Sai): Chúng được ghi xuống đĩa để bền vững.
- **Mỗi chỉ mục chỉ có đúng một phân đoạn** (Sai): Một shard chứa nhiều phân đoạn và số lượng thay đổi liên tục.
- **Bất biến sau khi tạo, cập nhật là ghi bản mới** (Đúng): Vì thế tài liệu cũ vẫn chiếm chỗ tới khi phân đoạn được gộp lại.
