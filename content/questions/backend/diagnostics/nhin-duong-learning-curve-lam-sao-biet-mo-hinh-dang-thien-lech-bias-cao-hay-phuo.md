---
id: nhin-duong-learning-curve-lam-sao-biet-mo-hinh-dang-thien-lech-bias-cao-hay-phuo
position: backend
technology: diagnostics
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nhìn đường learning curve, làm sao biết mô hình đang thiên lệch (bias) cao hay phương sai (variance) cao, và mỗi trường hợp nên làm gì?

## Question (EN)
From a learning curve, how do you tell whether a model has high bias or high variance, and what do you do in each case?

## Đáp án chi tiết (VI)
Learning curve vẽ **lỗi trên tập train** và **lỗi trên tập validation** theo số mẫu huấn luyện. Hình dạng của hai đường cho biết vấn đề nằm ở đâu.\
\
**Bias cao (underfit):** cả hai đường đều dừng ở mức lỗi cao và **gần nhau**. Thêm dữ liệu gần như không giúp gì — đường đã phẳng.\
- Dùng mô hình có sức biểu diễn lớn hơn (thêm bậc đa thức, đổi sang mô hình phi tuyến, tăng độ sâu cây).\
- Thêm/biến đổi feature có thông tin.\
- Giảm cường độ regularization.\
\
**Variance cao (overfit):** lỗi train rất thấp, lỗi validation cao, **khoảng cách giữa hai đường lớn** và chưa khép lại.\
- Thêm dữ liệu (đây là trường hợp thêm dữ liệu thực sự có tác dụng).\
- Tăng regularization, giảm độ phức tạp mô hình, early stopping.\
- Giảm số feature nhiễu.\
\
Một dấu hiệu hữu ích khác: so lỗi train với **mức lỗi con người / mức chấp nhận được của bài toán**. Nếu lỗi train đã cao hơn mức đó nhiều thì đang thiếu sức biểu diễn, không phải thiếu dữ liệu.

## Detailed Answer (EN)
A learning curve plots **training error** and **validation error** against the number of training samples. The shape of the two curves tells you where the problem is.\
\
**High bias (underfitting):** both curves plateau at a high error and sit **close together**. Adding data barely helps — the curves are already flat.\
- Use a more expressive model (higher-degree polynomial, a non-linear model, deeper trees).\
- Add or transform informative features.\
- Reduce regularization strength.\
\
**High variance (overfitting):** training error is very low, validation error is high, and the **gap between the curves is wide** and not closing.\
- Add more data (this is the case where more data genuinely helps).\
- Increase regularization, reduce model complexity, use early stopping.\
- Drop noisy features.\
\
Another useful signal: compare training error with **human-level or acceptable error for the task**. If training error is already far above that bar, the model lacks capacity — it is not a data-volume problem.
