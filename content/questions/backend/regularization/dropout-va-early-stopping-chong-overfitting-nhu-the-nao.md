---
id: dropout-va-early-stopping-chong-overfitting-nhu-the-nao
position: backend
technology: regularization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dropout và Early Stopping chống overfitting như thế nào?

## Question (EN)
How do dropout and early stopping combat overfitting?

## Đáp án chi tiết (VI)
Cả hai đều là kỹ thuật **regularization** — giảm overfitting mà không cần thêm dữ liệu.\
\
- **Dropout**: trong lúc train, mỗi lượt forward **loại bỏ ngẫu nhiên** (đưa về 0) mỗi nơ-ron với xác suất `p`. Mạng không thể dựa vào vài nơ-ron cùng thích nghi (co-adaptation) → tương đương huấn luyện một **ensemble các mạng con** dùng chung trọng số. Lúc suy luận không loại bỏ nữa; activation được co giãn (hoặc co giãn ngược ngay khi train) để khớp kỳ vọng độ lớn. Kết quả: giảm co-adaptation, tổng quát hóa tốt hơn.\
- **Early stopping**: theo dõi **loss trên tập validation** trong lúc train, dừng khi nó ngừng cải thiện (sau một số epoch \\"kiên nhẫn\\"), giữ lại checkpoint tốt nhất. Ngăn mô hình khớp quá mức dữ liệu train ở các epoch muộn — về bản chất là giới hạn dung lượng mô hình theo thời gian.

## Detailed Answer (EN)
Both are **regularization** techniques — reducing overfitting without extra data.\
\
- **Dropout**: during training, each forward pass **randomly drops** (zeroes out) each neuron with probability `p`. The network cannot rely on a few co-adapted units → this effectively trains an **ensemble of subnetworks** that share weights. At inference nothing is dropped; activations are scaled (or inverse-scaled at training time) to match the expected magnitude. The result: less co-adaptation and better generalization.\
- **Early stopping**: monitor the **validation loss** during training and stop when it stops improving (after a \\"patience\\" of epochs), keeping the best checkpoint. It prevents the model from over-fitting the training data in late epochs — essentially limiting model capacity in time.
