---
id: naive-bayes-hoat-dong-the-nao-va-gia-dinh-doc-lap-ngay-tho-la-gi
position: backend
technology: supervised
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Naive Bayes hoạt động thế nào và giả định độc lập \\"ngây thơ\\" là gì?

## Question (EN)
How does Naive Bayes work, and what is its \\"naive\\" independence assumption?

## Đáp án chi tiết (VI)
Naive Bayes là bộ phân loại xác suất dựa trên **định lý Bayes**: nó chọn lớp `y` có xác suất hậu nghiệm cao nhất, `P(y | x) ∝ P(y) · Π P(xⱼ | y)`.\
\
**Giả định \\"naive\\"** chính là **độc lập có điều kiện**: các đặc trưng **độc lập với nhau khi đã biết lớp**. Nhờ giả định này, xác suất đồng thời `P(x₁,…,xₚ | y)` tách được thành **tích** các xác suất từng đặc trưng `Π P(xⱼ | y)` — dễ ước lượng và tính rất nhanh, thay vì phải mô hình hóa mọi tương tác giữa các đặc trưng.\
\
Trong thực tế đặc trưng hiếm khi độc lập thật, nhưng mô hình vẫn hoạt động tốt đáng ngạc nhiên (nhất là phân loại văn bản / lọc spam), huấn luyện nhanh và cần ít dữ liệu.\
\
Các biến thể theo phân phối của đặc trưng: **Gaussian NB** (đặc trưng liên tục), **Multinomial NB** (đếm tần suất, phổ biến cho text), **Bernoulli NB** (đặc trưng nhị phân). Thường dùng **Laplace smoothing** để tránh xác suất bằng 0 với giá trị chưa từng gặp.

## Detailed Answer (EN)
Naive Bayes is a probabilistic classifier based on **Bayes' theorem**: it picks the class `y` with the highest posterior probability, `P(y | x) ∝ P(y) · Π P(xⱼ | y)`.\
\
The **\\"naive\\" assumption** is **conditional independence**: the features are **independent of each other given the class**. This assumption lets the joint probability `P(x₁,…,xₚ | y)` factor into a **product** of per-feature probabilities `Π P(xⱼ | y)` — easy to estimate and very fast to compute, instead of modeling every interaction between features.\
\
In practice features are rarely truly independent, yet the model works surprisingly well (especially for text classification / spam filtering), trains quickly, and needs little data.\
\
Variants by feature distribution: **Gaussian NB** (continuous features), **Multinomial NB** (frequency counts, common for text), and **Bernoulli NB** (binary features). **Laplace smoothing** is typically applied to avoid zero probabilities for unseen values.
