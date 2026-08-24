---
id: giai-thich-cac-khai-niem-cot-loi-cua-rl-reward-policy-value-function-discount-fa
position: backend
technology: fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích các khái niệm cốt lõi của RL: reward, policy, value function, discount factor γ.

## Question (EN)
Explain the core RL concepts: reward, policy, value function, discount factor γ.

## Đáp án chi tiết (VI)
- **Reward `r`** — tín hiệu số vô hướng môi trường trả về sau mỗi bước, đo mức \\"tốt\\" **tức thời** của một hành động. Mục tiêu của agent là tối đa **tổng phần thưởng tích luỹ (return)**, không phải reward từng bước.\
- **Policy `π`** — chiến lược của agent, ánh xạ trạng thái → hành động. Có thể **tất định** `a = π(s)` hoặc **ngẫu nhiên** `π(a|s)`.\
- **Value function** — kỳ vọng return khi bắt đầu từ một trạng thái (`V^π(s)`) hoặc từ một cặp trạng thái–hành động (`Q^π(s,a)`), rồi đi theo policy `π`. Nó đo giá trị **dài hạn**, khác với reward tức thời.\
- **Discount factor `γ ∈ [0,1)`** — trọng số cho phần thưởng tương lai: `G_t = r_{t+1} + γ·r_{t+2} + γ²·r_{t+3} + …`. `γ` gần 0 → agent \\"thiển cận\\

## Detailed Answer (EN)
$7a
