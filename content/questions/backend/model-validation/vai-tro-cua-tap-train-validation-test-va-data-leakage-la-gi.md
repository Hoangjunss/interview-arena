---
id: vai-tro-cua-tap-train-validation-test-va-data-leakage-la-gi
position: backend
technology: model-validation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vai trò của tập train/validation/test và data leakage là gì?

## Question (EN)
What are the roles of train/validation/test sets, and what is data leakage?

## Đáp án chi tiết (VI)
Chia dữ liệu thành ba phần để mỗi phần giữ một vai trò riêng:\
\
- **Train** — dùng để *khớp* tham số mô hình.\
- **Validation** — dùng để *chọn* mô hình và tinh chỉnh siêu tham số. Vì ta đưa ra quyết định dựa trên nó nên điểm số validation đã bị \\"lây\\" thông tin.\
- **Test** — chỉ chạm *một lần cuối cùng* để có ước lượng khách quan về khả năng tổng quát hoá. Nhìn tập test nhiều lần sẽ khiến ước lượng lạc quan giả.\
\
**Data leakage** là khi thông tin lẽ ra không có lúc dự đoán lại lọt vào lúc huấn luyện, khiến điểm số cao ảo rồi sụp khi lên production. Các dạng thường gặp:\
- **Rò rỉ tiền xử lý** — fit scaler/encoder/imputer trên *toàn bộ* dữ liệu trước khi chia. Cách đúng: fit chỉ trên train, gói mọi bước bằng **Pipeline** đặt trong cross-validation.\
- **Target leakage** — một đặc trưng thực chất chứa thông tin của nhãn (hoặc chỉ xuất hiện *sau* thời điểm dự đoán).\
- **Temporal leakage** — dùng dữ liệu tương lai để đoán quá khứ; với chuỗi thời gian phải chia theo thời gian.

## Detailed Answer (EN)
Split data into three parts, each with a distinct role:\
\
- **Train** — used to *fit* the model parameters.\
- **Validation** — used to *select* models and tune hyperparameters. Because you make decisions from it, the validation score is already \\"contaminated\\" with information.\
- **Test** — touched *once at the very end* for an unbiased generalization estimate. Peeking at it repeatedly makes the estimate falsely optimistic.\
\
**Data leakage** is when information not available at prediction time slips into training, inflating scores that then collapse in production. Common forms:\
- **Preprocessing leakage** — fitting a scaler/encoder/imputer on the *entire* dataset before splitting. The fix: fit only on train and wrap every step in a **Pipeline** placed inside cross-validation.\
- **Target leakage** — a feature that actually encodes the label (or only appears *after* the prediction moment).\
- **Temporal leakage** — using future data to predict the past; for time series, split chronologically.
