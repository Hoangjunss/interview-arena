---
id: relu-sigmoid-tanh-va-softmax-dac-diem-va-khi-nao-dung
position: backend
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ReLU, sigmoid, tanh và softmax: đặc điểm và khi nào dùng?

## Question (EN)
ReLU, sigmoid, tanh, and softmax: characteristics and when to use each?

## Đáp án chi tiết (VI)
Activation đưa **phi tuyến** vào mạng — thiếu nó, nhiều lớp tuyến tính chồng lên nhau vẫn chỉ tương đương một phép tuyến tính.\
\
- **Sigmoid** `1/(1+e^(-x))`: đầu ra `(0, 1)`. Dùng cho **xác suất nhị phân** ở lớp ra. Nhược điểm ở lớp ẩn: bão hòa → vanishing gradient, đầu ra không quanh 0.\
- **Tanh** `(e^x − e^(-x))/(e^x + e^(-x))`: đầu ra `(−1, 1)`, **đối xứng quanh 0** (tốt hơn sigmoid cho lớp ẩn) nhưng vẫn bão hòa.\
- **ReLU** `max(0, x)`: **mặc định cho lớp ẩn** — rẻ, không bão hòa ở phần dương → giảm vanishing gradient, activation thưa. Rủi ro: **\\"dying ReLU\\"** (kẹt ở 0); các biến thể Leaky/ELU/GELU khắc phục.\
- **Softmax**: chuẩn hóa một vector thành **phân phối xác suất tổng bằng 1**; dùng ở lớp ra cho **phân loại đa lớp**.\
\
**Quy tắc nhanh:** ReLU (hoặc biến thể) cho lớp ẩn; sigmoid cho đầu ra nhị phân; softmax cho đầu ra đa lớp.

## Detailed Answer (EN)
Activations inject **non-linearity** into the network — without them, stacked linear layers collapse into a single linear map.\
\
- **Sigmoid** `1/(1+e^(-x))`: output in `(0, 1)`. Use it for a **binary probability** at the output. Downsides in hidden layers: it saturates → vanishing gradients, and its output is not zero-centered.\
- **Tanh** `(e^x − e^(-x))/(e^x + e^(-x))`: output in `(−1, 1)`, **zero-centered** (better than sigmoid for hidden layers) but still saturates.\
- **ReLU** `max(0, x)`: the **default for hidden layers** — cheap, non-saturating on the positive side → reduces vanishing gradients, gives sparse activations. Risk: the **\\"dying ReLU\\"** (stuck at 0); Leaky/ELU/GELU variants address it.\
- **Softmax**: normalizes a vector into a **probability distribution that sums to 1**; use it at the output for **multi-class classification**.\
\
**Rule of thumb:** ReLU (or a variant) for hidden layers; sigmoid for a binary output; softmax for a multi-class output.
