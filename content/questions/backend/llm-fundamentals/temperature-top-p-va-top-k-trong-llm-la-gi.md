---
id: temperature-top-p-va-top-k-trong-llm-la-gi
position: backend
technology: llm-fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Temperature, Top-p và Top-k trong LLM là gì?

## Question (EN)
What are Temperature, Top-p, and Top-k in LLMs?

## Đáp án chi tiết (VI)
Đây là ba tham số **sampling** kiểm soát cách chọn token tiếp theo từ phân phối xác suất do model sinh ra.\
\
**Temperature (T)** chia logits trước softmax: `softmax(logits / T)`. `T=0` → greedy (luôn chọn token xác suất cao nhất, deterministic). `T\u003c1` → làm phân phối sắc nét hơn (bảo thủ, ít sáng tạo). `T\u003e1` → làm phẳng phân phối (sáng tạo, ngẫu nhiên hơn, dễ lạc đề). Dùng `T=0-0.3` cho code/factual, `0.7-1.0` cho sáng tạo.\
\
**Top-k** chỉ chọn trong K token có xác suất cao nhất, bỏ phần còn lại. Vấn đề: K cứng không thích nghi với phân phối khác nhau.\
\
**Top-p (nucleus sampling)** chọn tập token nhỏ nhất có tổng xác suất ≥ p (ví dụ `p=0.9` → giữ các token chiếm 90% khối lượng xác suất). Thích nghi tốt hơn top-k: khi model \\"tự tin\\" tập sẽ nhỏ, khi không chắc tập sẽ lớn.\
\
Thực tế thường kết hợp: `temperature=0.7` + `top_p=0.9` + tùy chọn `top_k=40`.

## Detailed Answer (EN)
These are three **sampling** parameters controlling how the next token is chosen from the probability distribution.\
\
**Temperature (T)** divides logits before softmax: `softmax(logits / T)`. `T=0` → greedy (always pick the highest-probability token, deterministic). `T\u003c1` → sharpens the distribution (conservative, less creative). `T\u003e1` → flattens it (creative, more random, may go off-topic). Use `T=0-0.3` for code/factual, `0.7-1.0` for creative.\
\
**Top-k** samples only from the K highest-probability tokens. Issue: a fixed K doesn't adapt to different distributions.\
\
**Top-p (nucleus sampling)** picks the smallest set of tokens whose cumulative probability ≥ p (e.g. `p=0.9` → keep tokens covering 90% of the mass). Adapts better than top-k: when the model is confident the set is small, when uncertain it's larger.\
\
Common production setting: `temperature=0.7` + `top_p=0.9` + optional `top_k=40`.
