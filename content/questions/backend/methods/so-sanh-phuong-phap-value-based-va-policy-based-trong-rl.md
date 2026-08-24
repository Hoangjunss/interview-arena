---
id: so-sanh-phuong-phap-value-based-va-policy-based-trong-rl
position: backend
technology: methods
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh phương pháp value-based và policy-based trong RL.

## Question (EN)
Compare value-based and policy-based methods in RL.

## Đáp án chi tiết (VI)
**Value-based** — học hàm giá trị (`Q` hoặc `V`), rồi suy ra policy bằng cách chọn hành động có giá trị cao nhất (greedy trên `Q`). Ví dụ: Q-Learning, SARSA, DQN.\
- Ưu: **hiệu quả mẫu** tốt, dễ tái sử dụng dữ liệu (off-policy).\
- Nhược: khó với **hành động liên tục** (phải `argmax` trên A); policy suy ra là gián tiếp, thường tất định.\
\
**Policy-based** — tham số hoá **trực tiếp** policy `π_θ(a|s)` và tối ưu tham số `θ` theo gradient của kỳ vọng phần thưởng (policy gradient, REINFORCE).\
- Ưu: xử lý được **hành động liên tục**, học được **policy ngẫu nhiên (stochastic)**, hội tụ mượt hơn.\
- Nhược: phương sai gradient cao, kém hiệu quả mẫu, dễ kẹt cực trị cục bộ.\
\
**Actor-Critic** kết hợp cả hai: \\"actor\\" (policy-based) chọn hành động, \\"critic\\" (value-based) đánh giá — giảm phương sai và tăng ổn định (A2C, PPO...).

## Detailed Answer (EN)
**Value-based** — learn a value function (`Q` or `V`), then derive a policy by picking the highest-value action (greedy on `Q`). Examples: Q-Learning, SARSA, DQN.\
- Pros: good **sample efficiency**, easy data reuse (off-policy).\
- Cons: awkward for **continuous action** spaces (needs `argmax` over A); the derived policy is indirect and usually deterministic.\
\
**Policy-based** — parameterize the policy `π_θ(a|s)` **directly** and optimize `θ` via the gradient of expected reward (policy gradient, REINFORCE).\
- Pros: handles **continuous actions**, can learn a **stochastic policy**, smoother convergence.\
- Cons: high gradient variance, lower sample efficiency, prone to local optima.\
\
**Actor-Critic** combines both: the \\"actor\\" (policy-based) picks actions and the \\"critic\\" (value-based) evaluates them — reducing variance and improving stability (A2C, PPO, ...).
