---
id: feature-scaling-phan-biet-normalization-va-standardization-khi-nao-can
position: backend
technology: preprocessing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Feature scaling: phân biệt normalization và standardization, khi nào cần?

## Question (EN)
Feature scaling: distinguish normalization from standardization, and when is it needed?

## Đáp án chi tiết (VI)
Scaling đưa các đặc trưng số về **thang tương đương** để không đặc trưng nào lấn át chỉ vì đơn vị lớn.\
\
- **Normalization (Min-Max)** — co giá trị về khoảng cố định, thường `[0, 1]`:\
\
`x′ = (x − min) / (max − min)`\
\
Giữ nguyên hình dạng phân phối; **nhạy với ngoại lai** (min/max bị kéo lệch). Hợp khi cần miền chặn (vd ảnh, một số mạng nơ-ron).\
- **Standardization (Z-score)** — đưa về trung bình 0, độ lệch chuẩn 1:\
\
`x′ = (x − μ) / σ`\
\
Không chặn trong khoảng cố định nhưng **bền với ngoại lai hơn** min-max; là lựa chọn mặc định phổ biến.\
\
**Khi nào cần scaling:**\
- **Cần** cho mô hình dựa trên **khoảng cách hoặc gradient**: KNN, K-Means, SVM, hồi quy có regularization (Ridge/Lasso), PCA, mạng nơ-ron.\
- **Không cần** cho mô hình **cây** (Decision Tree, Random Forest, gradient boosting) — chúng chia theo ngưỡng từng đặc trưng nên bất biến với scale đơn điệu.\
\
**Lưu ý:** fit scaler **trên train** rồi transform cho test (tránh rò rỉ dữ liệu).

## Detailed Answer (EN)
Scaling brings numeric features onto a **comparable range** so no feature dominates just because its units are large.\
\
- **Normalization (Min-Max)** — squeeze values into a fixed range, usually `[0, 1]`:\
\
`x′ = (x − min) / (max − min)`\
\
Preserves the distribution shape; **sensitive to outliers** (min/max get skewed). Fits when a bounded range is needed (e.g. images, some neural networks).\
- **Standardization (Z-score)** — center to mean 0, standard deviation 1:\
\
`x′ = (x − μ) / σ`\
\
Not bounded to a fixed range but **more robust to outliers** than min-max; the common default choice.\
\
**When scaling is needed:**\
- **Needed** for **distance- or gradient-based** models: KNN, K-Means, SVM, regularized regression (Ridge/Lasso), PCA, neural networks.\
- **Not needed** for **tree** models (Decision Tree, Random Forest, gradient boosting) — they split on per-feature thresholds and are invariant to monotonic scaling.\
\
**Note:** fit the scaler **on the training set**, then transform the test set (to avoid data leakage).
