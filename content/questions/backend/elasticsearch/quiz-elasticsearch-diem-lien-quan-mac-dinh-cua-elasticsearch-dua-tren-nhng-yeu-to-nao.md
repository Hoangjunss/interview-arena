---
id: quiz-elasticsearch-diem-lien-quan-mac-dinh-cua-elasticsearch-dua-tren-nhng-yeu-to-nao
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điểm liên quan mặc định của Elasticsearch dựa trên những yếu tố nào?

## Đáp án trắc nghiệm
- [ ] Thứ tự tài liệu được thêm vào chỉ mục
- [ ] Thời điểm tài liệu được ghi vào chỉ mục
- [x] Tần suất từ, độ hiếm của từ và độ dài trường
- [ ] Số lượt người dùng nhấp vào tài liệu đó

## Giải thích (VI)
Ba yếu tố chính: tần suất từ trong tài liệu, độ hiếm của từ trên toàn chỉ mục, và độ dài trường . Từ hiếm mang nhiều thông tin hơn, còn cùng số lần xuất hiện thì trường ngắn được coi là liên quan hơn.

### Giải thích các phương án:
- **Thứ tự tài liệu được thêm vào chỉ mục** (Sai): Thứ tự thêm vào không ảnh hưởng tới điểm.
- **Thời điểm tài liệu được ghi vào chỉ mục** (Sai): Muốn ưu tiên tài liệu mới thì phải cấu hình tăng điểm theo thời gian.
- **Tần suất từ, độ hiếm của từ và độ dài trường** (Đúng): Từ hiếm mang nhiều thông tin hơn, và cùng số lần xuất hiện thì trường ngắn được coi là liên quan hơn.
- **Số lượt người dùng nhấp vào tài liệu đó** (Sai): Elasticsearch không tự biết hành vi người dùng.
