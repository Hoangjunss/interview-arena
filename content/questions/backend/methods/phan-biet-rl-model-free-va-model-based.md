---
id: phan-biet-rl-model-free-va-model-based
position: backend
technology: methods
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt RL model-free và model-based.

## Question (EN)
Distinguish model-free from model-based RL.

## Đáp án chi tiết (VI)
Khác biệt nằm ở việc agent **có học/dùng mô hình môi trường** (hàm chuyển `P(s′|s,a)` và reward `R`) hay không.\
\
**Model-based RL** — agent xây (hoặc được cho) mô hình động lực môi trường, rồi **lập kế hoạch (planning)** bằng cách mô phỏng các bước tương lai trước khi hành động. Ví dụ: Dyna, AlphaZero, MuZero.\
- Ưu: **hiệu quả mẫu** cao (tận dụng mô hình để \\"tưởng tượng\\" nhiều tình huống), lập kế hoạch xa.\
- Nhược: mô hình sai → kế hoạch sai (lỗi tích luỹ); học được mô hình chính xác thường khó.\
\
**Model-free RL** — agent **không** dựng mô hình, học trực tiếp policy hoặc value từ trải nghiệm thử–sai. Ví dụ: Q-Learning, SARSA, DQN, policy gradient.\
- Ưu: đơn giản, không cần biết động lực môi trường, mạnh khi môi trường phức tạp/khó mô hình hoá.\
- Nhược: **tốn nhiều mẫu/tương tác** hơn để hội tụ.\
\
**Chốt:** model-based đổi công sức mô hình hoá lấy hiệu quả mẫu; model-free đơn giản hơn nhưng \\"đói\\" dữ liệu.

## Detailed Answer (EN)
The difference is whether the agent **learns/uses a model of the environment** (the transition function `P(s′|s,a)` and reward `R`) or not.\
\
**Model-based RL** — the agent builds (or is given) a model of the environment dynamics, then **plans** by simulating future steps before acting. Examples: Dyna, AlphaZero, MuZero.\
- Pros: high **sample efficiency** (uses the model to \\"imagine\\" many situations), enables long-horizon planning.\
- Cons: a wrong model → wrong plans (compounding error); learning an accurate model is often hard.\
\
**Model-free RL** — the agent does **not** build a model; it learns a policy or value directly from trial-and-error experience. Examples: Q-Learning, SARSA, DQN, policy gradient.\
- Pros: simpler, needs no knowledge of the dynamics, strong when the environment is complex or hard to model.\
- Cons: needs **many more samples/interactions** to converge.\
\
**Bottom line:** model-based trades modeling effort for sample efficiency; model-free is simpler but data-hungry.
