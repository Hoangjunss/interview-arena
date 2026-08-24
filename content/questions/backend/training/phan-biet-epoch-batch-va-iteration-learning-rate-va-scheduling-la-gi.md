---
id: phan-biet-epoch-batch-va-iteration-learning-rate-va-scheduling-la-gi
position: backend
technology: training
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt epoch, batch và iteration; learning rate và scheduling là gì?

## Question (EN)
Distinguish epoch, batch, and iteration; what are learning rate and scheduling?

## Đáp án chi tiết (VI)
- **Epoch**: một lượt đi qua **toàn bộ** tập huấn luyện.\
- **Batch (mini-batch)**: nhóm mẫu được xử lý trước **một lần cập nhật** trọng số; `batch_size` quyết định độ lớn.\
- **Iteration**: một lần cập nhật trọng số = xử lý xong một batch. `số iteration mỗi epoch = ceil(N / batch_size)`.\
\
**Ví dụ:** 10.000 mẫu, batch 100 → 100 iteration = 1 epoch.\
\
- **Learning rate (LR)**: độ lớn mỗi bước cập nhật — siêu tham số **quan trọng nhất**. Quá cao → phân kỳ/dao động; quá thấp → chậm, dễ kẹt ở cực tiểu kém.\
- **LR scheduling**: **thay đổi LR theo tiến trình** — khởi đầu lớn để đi nhanh, giảm dần về sau để ổn định. Các kiểu phổ biến: step decay, exponential decay, **cosine annealing**, **warmup** (tăng dần lúc đầu), **reduce-on-plateau**. Cải thiện hội tụ và chất lượng cuối.

## Detailed Answer (EN)
- **Epoch**: one full pass over the **entire** training set.\
- **Batch (mini-batch)**: the group of samples processed before **one weight update**; `batch_size` sets its size.\
- **Iteration**: one weight update = one processed batch. `iterations per epoch = ceil(N / batch_size)`.\
\
**Example:** 10,000 samples, batch 100 → 100 iterations = 1 epoch.\
\
- **Learning rate (LR)**: the size of each update step — the **single most important** hyperparameter. Too high → divergence/oscillation; too low → slow, prone to getting stuck in poor minima.\
- **LR scheduling**: **changing the LR over training** — start higher to move fast, decay later to settle. Common schemes: step decay, exponential decay, **cosine annealing**, **warmup** (ramp up at the start), **reduce-on-plateau**. It improves convergence and final quality.
