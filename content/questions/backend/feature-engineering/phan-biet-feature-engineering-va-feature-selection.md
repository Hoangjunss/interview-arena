---
id: phan-biet-feature-engineering-va-feature-selection
position: backend
technology: feature-engineering
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt feature engineering và feature selection.

## Question (EN)
Distinguish feature engineering from feature selection.

## Đáp án chi tiết (VI)
**Feature engineering** là *tạo và biến đổi* đặc trưng để mô hình dễ học hơn: mã hoá biến hạng mục (one-hot, target encoding), chuẩn hoá/scale số, tạo đặc trưng tương tác hay đa thức, trích xuất phần từ ngày giờ, biến đổi log cho phân phối lệch, hoặc đặc trưng theo kiến thức miền. Đây thường là bước tác động lớn nhất tới chất lượng mô hình cổ điển.\
\
**Feature selection** là *chọn tập con* đặc trưng hữu ích nhất, để giảm overfit, chi phí tính toán và tăng khả năng diễn giải. Ba nhóm phương pháp:\
\
- **Filter** — chấm điểm từng đặc trưng độc lập với mô hình: variance threshold, tương quan, chi-square, mutual information.\
- **Wrapper** — thử các tập con bằng chính mô hình: **RFE** (recursive feature elimination), forward/backward selection. Chính xác hơn nhưng tốn kém.\
- **Embedded** — việc chọn nằm trong quá trình train: **Lasso** (L1), độ quan trọng đặc trưng của mô hình cây (tree importance).\
\
Lưu ý chống rò rỉ dữ liệu: bước chọn đặc trưng phải nằm *trong* cross-validation, không được nhìn tập test trước.

## Detailed Answer (EN)
$87
