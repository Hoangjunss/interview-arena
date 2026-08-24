---
id: mixture-of-experts-moe-la-gi-khac-gi-dense-model
position: backend
technology: llm-fundamentals
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mixture of Experts (MoE) là gì? Khác gì dense model?

## Question (EN)
What is Mixture of Experts (MoE)? How does it differ from dense models?

## Đáp án chi tiết (VI)
**Dense model** (LLaMA, GPT-3) — mỗi forward pass kích hoạt TOÀN BỘ tham số. **MoE model** (Mixtral 8x7B, DeepSeek-V3; nhiều frontier model cũng được cho là dùng MoE) — chỉ kích hoạt một **subset** (gọi là \\"experts\\") ở mỗi token.\
\
Cấu trúc: thay FFN dense bằng **MoE layer** gồm N experts (mỗi expert là một FFN độc lập) + **router** (gating network nhỏ). Với mỗi token, router chấm điểm, chọn top-k experts (thường k=1 hoặc 2), rồi tổng hợp output có trọng số. Mixtral 8x7B có 8 experts, top-2 → mỗi token kích hoạt ~13B params dù tổng là 47B.\
\
Lợi ích: **capacity cao** (tổng params lớn → học được nhiều kiến thức) nhưng **inference rẻ** (chỉ 1 phần params active). Chi phí: **memory cao** (phải load hết experts vào VRAM), **routing phức tạp** (load imbalance giữa experts, mất ổn định khi train), **latency** kém khi batch nhỏ vì không tận dụng được.\
\
Thuật ngữ phân biệt: **\\"47B total / 13B active\\"** cho Mixtral 8x7B. Khi so sánh, dùng active params để so với dense.

## Detailed Answer (EN)
**Dense model** (LLaMA, GPT-3) — every forward pass activates ALL parameters. **MoE model** (Mixtral 8x7B, DeepSeek-V3; various frontier models are also believed to use MoE) — only a **subset** of parameters (the \\"experts\\") activates per token.\
\
Structure: replaces the dense FFN with an **MoE layer** of N experts (each a standalone FFN) + a **router** (small gating network). For each token, the router scores experts, picks the top-k (usually k=1 or 2), and combines their outputs with weights. Mixtral 8x7B has 8 experts, top-2 → each token activates ~13B params though the total is 47B.\
\
Benefits: **high capacity** (large total params → more knowledge) but **cheap inference** (only a fraction active). Costs: **high memory** (all experts must sit in VRAM), **complex routing** (load imbalance between experts, training instability), **worse latency at small batch** due to underutilization.\
\
Terminology: **\\"47B total / 13B active\\"** for Mixtral 8x7B. Compare active params against dense models.
