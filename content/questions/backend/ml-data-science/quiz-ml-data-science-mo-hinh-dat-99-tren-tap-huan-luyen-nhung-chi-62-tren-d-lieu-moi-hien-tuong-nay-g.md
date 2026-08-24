---
id: quiz-ml-data-science-mo-hinh-dat-99-tren-tap-huan-luyen-nhung-chi-62-tren-d-lieu-moi-hien-tuong-nay-g
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mô hình đạt 99% trên tập huấn luyện nhưng chỉ 62% trên dữ liệu mới. Hiện tượng này gọi là gì?

## Đáp án trắc nghiệm
- [ ] Mất cân bằng lớp trong tập dữ liệu
- [ ] Chưa khớp (underfitting)
- [ ] Rò rỉ dữ liệu giữa hai tập
- [x] Quá khớp (overfitting)

## Giải thích (VI)
Quá khớp : mô hình học thuộc cả nhiễu và đặc điểm riêng của tập huấn luyện nên không tổng quát hóa sang dữ liệu mới. Dấu hiệu đặc trưng là khoảng cách lớn giữa điểm huấn luyện và điểm kiểm tra.

### Giải thích các phương án:
- **Mất cân bằng lớp trong tập dữ liệu** (Sai): Mất cân bằng ảnh hưởng cách đọc chỉ số, không tạo ra khoảng cách này.
- **Chưa khớp (underfitting)** (Sai): Chưa khớp thì điểm thấp ở cả hai tập.
- **Rò rỉ dữ liệu giữa hai tập** (Sai): Rò rỉ thường làm điểm trên tập kiểm tra cao bất thường, không thấp.
- **Quá khớp (overfitting)** (Đúng): Mô hình học thuộc cả nhiễu của tập huấn luyện nên không tổng quát hóa được.
