---
id: quiz-ml-data-science-dieu-chuan-l1-lasso-khac-l2-ridge-o-dac-diem-nao
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điều chuẩn L1 (Lasso) khác L2 (Ridge) ở đặc điểm nào?

## Đáp án trắc nghiệm
- [ ] Hai loại cho kết quả giống hệt nhau trong thực tế
- [x] L1 đưa được hệ số về đúng 0
- [ ] L1 dùng cho phân loại, L2 dùng cho hồi quy
- [ ] L2 có thể đưa hệ số về 0 còn L1 thì không

## Giải thích (VI)
L1 phạt theo trị tuyệt đối nên đẩy được một số hệ số về đúng 0 — tức tự chọn lọc đặc trưng. L2 phạt theo bình phương nên chỉ co nhỏ hệ số, giữ lại tất cả nhưng giảm ảnh hưởng.

### Giải thích các phương án:
- **Hai loại cho kết quả giống hệt nhau trong thực tế** (Sai): Nghiệm rất khác nhau, nhất là khi có nhiều đặc trưng tương quan.
- **L1 đưa được hệ số về đúng 0** (Đúng): L2 chỉ co nhỏ hệ số chứ hiếm khi triệt tiêu hẳn.
- **L1 dùng cho phân loại, L2 dùng cho hồi quy** (Sai): Cả hai đều dùng được cho cả hai loại bài toán.
- **L2 có thể đưa hệ số về 0 còn L1 thì không** (Sai): Đảo ngược tính chất của hai loại.
