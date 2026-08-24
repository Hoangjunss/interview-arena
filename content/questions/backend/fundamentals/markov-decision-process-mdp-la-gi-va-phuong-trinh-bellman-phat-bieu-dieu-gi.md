---
id: markov-decision-process-mdp-la-gi-va-phuong-trinh-bellman-phat-bieu-dieu-gi
position: backend
technology: fundamentals
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Markov Decision Process (MDP) là gì và phương trình Bellman phát biểu điều gì?

## Question (EN)
What is a Markov Decision Process (MDP), and what does the Bellman equation state?

## Đáp án chi tiết (VI)
**MDP** là khung toán học mô tả bài toán ra quyết định tuần tự, định nghĩa bởi bộ `(S, A, P, R, γ)`:\
- **S**: tập trạng thái (states)\
- **A**: tập hành động (actions)\
- **P(s′|s,a)**: xác suất chuyển trạng thái\
- **R(s,a)**: phần thưởng tức thời\
- **γ ∈ [0,1)**: hệ số chiết khấu\
\
Cốt lõi là **tính Markov**: trạng thái kế tiếp chỉ phụ thuộc trạng thái và hành động **hiện tại**, không phụ thuộc toàn bộ lịch sử trước đó. Mục tiêu là tìm **policy** `π` tối đa hoá kỳ vọng tổng phần thưởng chiết khấu.\
\
**Phương trình Bellman** phân rã giá trị một trạng thái thành phần thưởng tức thời cộng giá trị chiết khấu của trạng thái kế. Với hàm giá trị theo policy `π`:\
\
`V^π(s) = Σ_a π(a|s) Σ_s′ P(s′|s,a) [ R(s,a) + γ·V^π(s′) ]`\
\
Phương trình Bellman **tối ưu** thay trung bình theo `π` bằng `max`:\
\
`V*(s) = max_a Σ_s′ P(s′|s,a) [ R(s,a) + γ·V*(s′) ]`\
\
Đây là nền tảng cho quy hoạch động, value iteration, policy iteration và các thuật toán RL.

## Detailed Answer (EN)
An **MDP** is the mathematical framework for sequential decision-making, defined by the tuple `(S, A, P, R, γ)`:\
- **S**: set of states\
- **A**: set of actions\
- **P(s′|s,a)**: state-transition probability\
- **R(s,a)**: immediate reward\
- **γ ∈ [0,1)**: discount factor\
\
The core is the **Markov property**: the next state depends only on the **current** state and action, not on the full history. The goal is to find a **policy** `π` that maximizes the expected discounted total reward.\
\
The **Bellman equation** decomposes a state value into the immediate reward plus the discounted value of the next state. For the value under policy `π`:\
\
`V^π(s) = Σ_a π(a|s) Σ_s′ P(s′|s,a) [ R(s,a) + γ·V^π(s′) ]`\
\
The **optimal** Bellman equation replaces the average over `π` with a `max`:\
\
`V*(s) = max_a Σ_s′ P(s′|s,a) [ R(s,a) + γ·V*(s′) ]`\
\
This underpins dynamic programming, value iteration, policy iteration, and RL algorithms.
