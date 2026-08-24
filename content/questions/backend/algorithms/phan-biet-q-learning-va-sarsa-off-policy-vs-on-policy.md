---
id: phan-biet-q-learning-va-sarsa-off-policy-vs-on-policy
position: backend
technology: algorithms
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Q-Learning và SARSA (off-policy vs on-policy).

## Question (EN)
Distinguish Q-Learning from SARSA (off-policy vs on-policy).

## Đáp án chi tiết (VI)
Cả hai đều học hàm giá trị hành động `Q(s,a)` bằng temporal-difference (TD), khác nhau ở **target cập nhật**.\
\
**SARSA (on-policy)** — dùng hành động `a′` **thực sự được chọn** ở trạng thái kế:\
\
`Q(s,a) ← Q(s,a) + α[ r + γ·Q(s′,a′) − Q(s,a) ]`\
\
Tên \\"SARSA\\" đến từ bộ `(s, a, r, s′, a′)`. Nó học giá trị của **chính policy đang thực thi**, tính cả phần khám phá.\
\
**Q-Learning (off-policy)** — dùng hành động **tốt nhất** ở trạng thái kế, bất kể thực tế chọn gì:\
\
`Q(s,a) ← Q(s,a) + α[ r + γ·max_a′ Q(s′,a′) − Q(s,a) ]`\
\
Nó học **policy tối ưu** trong khi vẫn hành xử theo policy khám phá (vd ε-greedy).\
\
**Khác biệt thực tế:** gần vùng rủi ro (vd cliff walking), SARSA học đường đi **an toàn hơn** vì tính cả rủi ro của bước khám phá; Q-Learning học đường tối ưu nhưng \\"liều\\" hơn. Cả hai hội tụ về `Q*` dưới các điều kiện phù hợp.

## Detailed Answer (EN)
Both learn an action-value function `Q(s,a)` via temporal-difference (TD) learning; they differ in the **update target**.\
\
**SARSA (on-policy)** — uses the action `a′` that was **actually taken** in the next state:\
\
`Q(s,a) ← Q(s,a) + α[ r + γ·Q(s′,a′) − Q(s,a) ]`\
\
The name \\"SARSA\\" comes from the tuple `(s, a, r, s′, a′)`. It learns the value of the **policy it is actually following**, exploration included.\
\
**Q-Learning (off-policy)** — uses the **best** action in the next state, regardless of what was actually taken:\
\
`Q(s,a) ← Q(s,a) + α[ r + γ·max_a′ Q(s′,a′) − Q(s,a) ]`\
\
It learns the **optimal policy** while still behaving under an exploratory policy (e.g. ε-greedy).\
\
**Practical difference:** near risky regions (e.g. cliff walking), SARSA learns a **safer** path because it accounts for the risk of the exploratory step; Q-Learning learns the optimal but \\"riskier\\" path. Both converge to `Q*` under suitable conditions.
