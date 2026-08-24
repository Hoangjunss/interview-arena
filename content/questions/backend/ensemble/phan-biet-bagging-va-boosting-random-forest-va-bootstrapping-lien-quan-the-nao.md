---
id: phan-biet-bagging-va-boosting-random-forest-va-bootstrapping-lien-quan-the-nao
position: backend
technology: ensemble
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Bagging và Boosting; Random Forest và bootstrapping liên quan thế nào?

## Question (EN)
Distinguish bagging from boosting; how do random forests and bootstrapping relate?

## Đáp án chi tiết (VI)
- **Bootstrapping**: lấy mẫu lại **có hoàn lại** từ tập train để tạo nhiều tập con cùng kích thước — nền tảng của bagging.\
- **Bagging (Bootstrap Aggregating)**: huấn luyện nhiều mô hình **song song, độc lập** trên các mẫu bootstrap khác nhau, rồi tổng hợp (vote cho phân loại, trung bình cho hồi quy). Chủ yếu giảm **phương sai (variance)**, chống overfit; các mô hình có thể train song song.\
- **Boosting**: huấn luyện các mô hình yếu **tuần tự**, mỗi mô hình sửa lỗi của mô hình trước (tập trung vào mẫu bị sai). Chủ yếu giảm **bias**, nhưng dễ nhạy với nhiễu/overfit hơn nếu không điều chỉnh.\
\
**Random Forest = bagging trên cây quyết định + ngẫu nhiên hóa đặc trưng.** Ngoài lấy mẫu bootstrap cho từng cây, mỗi lần tách nút nó chỉ xét một **tập con ngẫu nhiên các đặc trưng**. Việc này **khử tương quan** giữa các cây (tránh vài đặc trưng mạnh chi phối mọi cây), nên trung bình của rừng ổn định hơn bagging cây thuần.

## Detailed Answer (EN)
- **Bootstrapping**: resampling **with replacement** from the training set to create many same-sized subsets — the basis of bagging.\
- **Bagging (Bootstrap Aggregating)**: train many models **in parallel, independently** on different bootstrap samples, then aggregate (vote for classification, average for regression). Mainly reduces **variance** and counters overfitting; models can be trained in parallel.\
- **Boosting**: train weak models **sequentially**, each correcting the previous one's errors (focusing on misclassified samples). Mainly reduces **bias**, but is more sensitive to noise/overfitting if unregularized.\
\
**Random Forest = bagging over decision trees + feature randomization.** On top of bootstrap sampling per tree, at each split it only considers a **random subset of features**. This **decorrelates** the trees (preventing a few strong features from dominating every tree), so the forest average is steadier than plain bagged trees.
