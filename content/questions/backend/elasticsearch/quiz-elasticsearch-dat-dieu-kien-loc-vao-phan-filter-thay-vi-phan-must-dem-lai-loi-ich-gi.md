---
id: quiz-elasticsearch-dat-dieu-kien-loc-vao-phan-filter-thay-vi-phan-must-dem-lai-loi-ich-gi
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt điều kiện lọc vào phần filter thay vì phần must đem lại lợi ích gì?

## Đáp án trắc nghiệm
- [ ] Điều kiện được áp trước khi tìm kiếm bắt đầu
- [ ] Kết quả trả về được sắp xếp theo thời gian
- [ ] Điều kiện được áp cho cả các chỉ mục khác
- [x] Không tính điểm liên quan và kết quả được cache

## Giải thích (VI)
Điều kiện trong filter không tham gia tính điểm và được cache ở tầng bộ lọc. Với các điều kiện lặp lại nhiều như trạng thái đang hoạt động hay khoảng thời gian, khác biệt về hiệu năng rất rõ.

### Giải thích các phương án:
- **Điều kiện được áp trước khi tìm kiếm bắt đầu** (Sai): Thứ tự thực thi do bộ máy quyết định chứ không do vị trí khai báo.
- **Kết quả trả về được sắp xếp theo thời gian** (Sai): Thứ tự sắp xếp là cấu hình riêng.
- **Điều kiện được áp cho cả các chỉ mục khác** (Sai): Phạm vi chỉ mục do phần địa chỉ truy vấn quyết định.
- **Không tính điểm liên quan và kết quả được cache** (Đúng): Điều kiện lọc chỉ trả lời có hoặc không nên bỏ được bước tính điểm và tái dùng được kết quả.
