---
id: cross-entropy-va-mse-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cross-entropy và MSE khác nhau thế nào, khi nào dùng cái nào?

## Question (EN)
How do cross-entropy and MSE differ, and when do you use each?

## Đáp án chi tiết (VI)
Hàm mất mát định nghĩa thế nào là \\"sai\\" và tạo ra gradient để học.\
\
- **MSE (sai số bình phương trung bình)** `mean((y − ŷ)²)`: cho **hồi quy** (mục tiêu liên tục). Phạt sai số lớn theo bình phương; nhạy với outlier. Đi cùng đầu ra tuyến tính.\
- **Cross-entropy (log loss)**: cho **phân loại**. Đo độ lệch giữa phân phối xác suất dự đoán và phân phối nhãn thật. **Binary CE** với đầu ra sigmoid; **categorical CE** với đầu ra softmax.\
\
**Vì sao không dùng MSE cho phân loại:** với sigmoid/softmax, MSE cho gradient nhỏ (có khi gần triệt tiêu) ngay khi mô hình dự đoán **sai một cách tự tin**, và bề mặt loss ở đó không lồi → học chậm. Cross-entropy **ghép sạch** với softmax/sigmoid (gradient rút gọn về `ŷ − y`) → gradient mạnh khi sai, hội tụ nhanh hơn, và chính là hàm **hợp lý cực đại (maximum likelihood)** cho đầu ra phân loại.

## Detailed Answer (EN)
The loss function defines what \\"wrong\\" means and produces the gradients that drive learning.\
\
- **MSE (mean squared error)** `mean((y − ŷ)²)`: for **regression** (continuous targets). Penalizes large errors quadratically; sensitive to outliers. Pairs with a linear output.\
- **Cross-entropy (log loss)**: for **classification**. Measures the divergence between the predicted probability distribution and the true label distribution. **Binary CE** with a sigmoid output; **categorical CE** with a softmax output.\
\
**Why not MSE for classification:** with sigmoid/softmax, MSE produces small (sometimes near-vanishing) gradients exactly when the model is **confidently wrong**, and the loss surface there is non-convex → slow learning. Cross-entropy **pairs cleanly** with softmax/sigmoid (the gradient simplifies to `ŷ − y`) → strong gradients when wrong, faster convergence, and it is the **maximum-likelihood** loss for categorical outputs.
