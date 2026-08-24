---
id: llm-large-language-model-la-gi-va-hoat-dong-nhu-the-nao
position: backend
technology: llm-fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
LLM (Large Language Model) là gì và hoạt động như thế nào?

## Question (EN)
What is a Large Language Model (LLM) and how does it work?

## Đáp án chi tiết (VI)
LLM là mô hình ngôn ngữ dựa trên kiến trúc Transformer, được pre-train trên lượng lớn text corpus (hàng trăm tỷ đến hàng nghìn tỷ token). Cốt lõi của LLM là dự đoán token tiếp theo (next-token prediction) dựa trên chuỗi token đầu vào — về bản chất là một hàm xác suất `P(token_t | token_0..t-1)`.\
\
**Quy trình hoạt động:**\
\
1. Input text được **tokenize** thành các ID số.\
2. Đi qua **embedding layer** để biến thành vector.\
3. Đi qua nhiều lớp **Transformer block** (self-attention + feed-forward) để học ngữ cảnh.\
4. Lớp cuối sinh **logits** trên toàn bộ vocabulary.\
5. Sử dụng các kỹ thuật **sampling** (greedy / top-k / top-p / temperature) để chọn token tiếp theo.\
6. Lặp lại quá trình này (autoregressive) cho đến khi gặp token kết thúc.\
\
**Đặc điểm:**\
- Các khả năng emergent (reasoning, code, dịch thuật, tool use) xuất hiện khi tăng quy mô dữ liệu và tham số.\
- Mô hình được fine-tune bằng SFT (Supervised Fine-Tuning) và căn chỉnh qua RLHF/DPO để tuân theo chỉ dẫn tốt hơn và an toàn hơn.

## Detailed Answer (EN)
An LLM is a language model built on the Transformer architecture, pre-trained on massive text corpora (hundreds of billions to trillions of tokens). At its core, it performs next-token prediction given the preceding tokens — essentially calculating the probability `P(token_t | token_0..t-1)`.\
\
**Pipeline:**\
\
1. Input text is **tokenized** into integer IDs.\
2. Passed through an **embedding layer** to become vectors.\
3. Goes through stacked **Transformer blocks** (self-attention + feed-forward) to capture context.\
4. The final layer produces **logits** over the entire vocabulary.\
5. **Sampling** methods (greedy / top-k / top-p / temperature) are applied to pick the next token.\
6. This repeats autoregressively until an end token is generated.\
\
**Key Characteristics:**\
- Emergent abilities (reasoning, coding, translation, tool use) appear as data and parameter counts scale.\
- Models are fine-tuned via SFT (Supervised Fine-Tuning) and aligned using RLHF/DPO to better follow instructions and remain safe.
