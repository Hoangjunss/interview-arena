---
id: vanishing-gradient-va-exploding-gradient-la-gi-vi-sao-xay-ra-va-cach-khac-phuc
position: backend
technology: training
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vanishing gradient và exploding gradient là gì, vì sao xảy ra và cách khắc phục?

## Question (EN)
What are vanishing and exploding gradients, why do they happen, and how do you fix them?

## Đáp án chi tiết (VI)
Khi backprop, gradient của loss được lan ngược qua từng lớp bằng **chuỗi quy tắc dây chuyền** — tức nhân liên tiếp nhiều đạo hàm riêng. Với mạng sâu:\
\
- Nếu các thừa số `\u003c 1` nhân dồn → gradient co lại **theo cấp số nhân** → các lớp gần đầu vào gần như không được cập nhật: **vanishing gradient**.\
- Nếu các thừa số `\u003e 1` → gradient phồng lên, cập nhật bất ổn, dễ tràn số (`NaN`): **exploding gradient**.\
\
Activation bão hòa (sigmoid, tanh) có đạo hàm nhỏ (sigmoid tối đa `0.25`) nên góp phần làm vanishing.\
\
**Cách khắc phục:**\
\
- Dùng activation không bão hòa: **ReLU** và biến thể.\
- Khởi tạo trọng số hợp lý (**Xavier/He**) để giữ phương sai ổn định qua các lớp.\
- **Batch/Layer Normalization**.\
- **Residual/skip connection** (ResNet) tạo đường tắt cho gradient.\
- Với exploding: **gradient clipping** (chặn norm gradient).\
- Với chuỗi: kiến trúc có cổng (**LSTM/GRU**).

## Detailed Answer (EN)
During backprop, the loss gradient is propagated backward layer by layer via the **chain rule** — i.e. many partial derivatives multiplied together. In a deep network:\
\
- If the factors are `\u003c 1` and compound, the gradient shrinks **exponentially** → layers near the input barely update: **vanishing gradient**.\
- If the factors are `\u003e 1`, the gradient blows up, updates become unstable and can overflow to `NaN`: **exploding gradient**.\
\
Saturating activations (sigmoid, tanh) have small derivatives (sigmoid peaks at `0.25`) and contribute to vanishing.\
\
**Fixes:**\
\
- Use non-saturating activations: **ReLU** and variants.\
- Sensible weight initialization (**Xavier/He**) to keep variance stable across layers.\
- **Batch/Layer Normalization**.\
- **Residual/skip connections** (ResNet) give the gradient a shortcut.\
- For exploding: **gradient clipping** (cap the gradient norm).\
- For sequences: gated architectures (**LSTM/GRU**).
