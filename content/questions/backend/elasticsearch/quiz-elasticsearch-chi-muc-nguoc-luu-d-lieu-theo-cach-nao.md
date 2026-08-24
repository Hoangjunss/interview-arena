---
id: quiz-elasticsearch-chi-muc-nguoc-luu-d-lieu-theo-cach-nao
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chỉ mục ngược lưu dữ liệu theo cách nào?

## Đáp án trắc nghiệm
- [ ] Các trường được lưu thành cột riêng để tính toán
- [ ] Tài liệu được nén lại và lưu theo thứ tự thời gian
- [x] Từ khoá ánh xạ tới danh sách tài liệu chứa nó
- [ ] Tài liệu ánh xạ tới danh sách từ khoá bên trong

## Giải thích (VI)
Chỉ mục ngược ánh xạ từ khoá tới danh sách tài liệu chứa nó . Tìm một từ chỉ cần tra một khoá rồi lấy danh sách, thay vì quét toàn bộ tài liệu như cách so khớp chuỗi trong cơ sở dữ liệu quan hệ.

### Giải thích các phương án:
- **Các trường được lưu thành cột riêng để tính toán** (Sai): Đó là cấu trúc phục vụ gộp nhóm và sắp xếp, không phải tìm toàn văn.
- **Tài liệu được nén lại và lưu theo thứ tự thời gian** (Sai): Nén và sắp xếp không phải cấu trúc phục vụ tìm kiếm toàn văn.
- **Từ khoá ánh xạ tới danh sách tài liệu chứa nó** (Đúng): Nhờ vậy tìm một từ chỉ cần tra một khoá thay vì quét toàn bộ tài liệu.
- **Tài liệu ánh xạ tới danh sách từ khoá bên trong** (Sai): Đó là chiều xuôi, và tìm kiếm theo chiều đó phải quét mọi tài liệu.
