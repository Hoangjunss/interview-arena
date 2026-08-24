---
id: self-attention-va-query-key-value-hoat-dong-nhu-the-nao
position: backend
technology: llm-fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Self-attention và Query/Key/Value hoạt động như thế nào?

## Question (EN)
How do self-attention and Query/Key/Value work?

## Đáp án chi tiết (VI)
Self-attention cho phép mỗi token \\"hỏi\\" các token khác trong câu mức độ liên quan rồi lấy thông tin tương ứng — giải quyết được hạn chế của RNN (phụ thuộc xa).\
\
Với input X, model tính 3 ma trận bằng 3 linear projection: **Q = X·Wq** (Query — câu hỏi token này đang hỏi), **K = X·Wk** (Key — key mà các token khác \\"quảng cáo\\"), **V = X·Wv** (Value — nội dung thực để lấy). Công thức: **Attention(Q,K,V) = softmax(Q·Kᵀ / √dₖ) · V**.\
\
Giải thích: `Q·Kᵀ` đo độ tương đồng giữa Q của token hiện tại với K của mọi token → chia `√dₖ` để ổn định gradient (tránh softmax bão hoà khi dₖ lớn) → softmax biến thành phân phối xác suất → nhân với V để lấy weighted sum của value. **Multi-Head** chạy song song H attention với H bộ (Wq, Wk, Wv) rồi concat — mỗi head học một kiểu quan hệ khác (syntactic, semantic, positional...).

## Detailed Answer (EN)
Self-attention lets each token \\"ask\\" every other token how relevant they are and pull information accordingly — solving RNN long-range dependency issues.\
\
From input X, the model computes 3 matrices via linear projections: **Q = X·Wq** (Query — what this token asks), **K = X·Wk** (Key — what other tokens advertise), **V = X·Wv** (Value — the actual content). Formula: **Attention(Q,K,V) = softmax(Q·Kᵀ / √dₖ) · V**.\
\
Why: `Q·Kᵀ` measures similarity between the current token's Q and every token's K → divide by `√dₖ` for stable gradients (avoids softmax saturation when dₖ is large) → softmax turns it into a probability distribution → multiply by V to produce a weighted sum of values. **Multi-Head** runs H parallel attentions with H sets of (Wq, Wk, Wv) and concatenates — each head learns a different relationship (syntactic, semantic, positional...).
