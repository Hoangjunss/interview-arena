---
id: linear-regression-hoat-dong-the-nao-va-dua-tren-nhung-gia-dinh-nao
position: backend
technology: supervised
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Linear Regression hoạt động thế nào và dựa trên những giả định nào?

## Question (EN)
How does linear regression work, and what assumptions does it rely on?

## Đáp án chi tiết (VI)
Linear regression mô hình hóa quan hệ giữa biến mục tiêu liên tục `y` và các đặc trưng `X` bằng một hàm tuyến tính: `y = β₀ + β₁x₁ + … + βₚxₚ + ε`. Hệ số `β` thường được ước lượng bằng **bình phương tối thiểu (OLS)** — cực tiểu tổng bình phương phần dư (khoảng cách dọc giữa điểm thực và đường khớp).\
\
Các giả định chính (để suy diễn thống kê hợp lệ):\
\
- **Tuyến tính**: kỳ vọng của `y` là hàm tuyến tính theo các đặc trưng.\
- **Độc lập**: các phần dư không tự tương quan.\
- **Phương sai đồng nhất (homoscedasticity)**: phần dư có phương sai không đổi trên mọi mức dự đoán.\
- **Phần dư phân phối chuẩn**: cần cho khoảng tin cậy và kiểm định giả thuyết, không bắt buộc cho dự báo điểm.\
- **Ít đa cộng tuyến**: các đặc trưng không tương quan quá mạnh với nhau, nếu không hệ số kém ổn định và khó diễn giải.\
\
Vi phạm giả định không phải lúc nào cũng làm hỏng dự báo, nhưng làm sai lệch p-value và khoảng tin cậy.

## Detailed Answer (EN)
Linear regression models the relationship between a continuous target `y` and features `X` as a linear function: `y = β₀ + β₁x₁ + … + βₚxₚ + ε`. The coefficients `β` are usually estimated by **ordinary least squares (OLS)** — minimizing the sum of squared residuals (the vertical gaps between actual points and the fitted line).\
\
Key assumptions (needed for valid statistical inference):\
\
- **Linearity**: the expected value of `y` is a linear function of the features.\
- **Independence**: residuals are not autocorrelated.\
- **Homoscedasticity**: residuals have constant variance across the range of predictions.\
- **Normality of residuals**: required for confidence intervals and hypothesis tests, not for point predictions.\
- **Low multicollinearity**: features are not too strongly correlated with each other, otherwise coefficients become unstable and hard to interpret.\
\
Violating these assumptions does not always ruin predictions, but it distorts p-values and confidence intervals.
