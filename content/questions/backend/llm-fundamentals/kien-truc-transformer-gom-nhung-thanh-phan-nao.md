---
id: kien-truc-transformer-gom-nhung-thanh-phan-nao
position: backend
technology: llm-fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiến trúc Transformer gồm những thành phần nào?

## Question (EN)
What are the components of the Transformer architecture?

## Đáp án chi tiết (VI)
Transformer (Vaswani 2017) gồm các khối chính: **Token embedding** (biến token ID thành vector) + **Positional encoding** (thêm thông tin vị trí); **Multi-Head Self-Attention** (cho phép mỗi token \\"nhìn\\" các token khác qua Query/Key/Value); **Feed-Forward Network** (FFN — 2 lớp linear + activation, thường mở rộng 4x hidden size); **Residual connection** + **LayerNorm** quanh mỗi sub-layer để train sâu ổn định.\
\
Ba biến thể chính: **Encoder-only** (BERT — hiểu/classify); **Decoder-only** (GPT, LLaMA — sinh text, có causal mask); **Encoder-Decoder** (T5, BART — dịch/tóm tắt). LLM hiện đại hầu hết là decoder-only. Các cải tiến phổ biến: **RoPE** thay positional encoding, **SwiGLU** thay ReLU, **RMSNorm** thay LayerNorm, **GQA** (Grouped-Query Attention) giảm memory của KV cache, **Flash Attention** tối ưu I/O GPU.

## Detailed Answer (EN)
Transformer (Vaswani 2017) consists of: **Token embedding** (turns token IDs into vectors) + **Positional encoding** (adds position info); **Multi-Head Self-Attention** (each token attends to others via Query/Key/Value); **Feed-Forward Network** (FFN — 2 linear layers + activation, typically 4x hidden size); **Residual connections** + **LayerNorm** around each sub-layer for stable deep training.\
\
Three variants: **Encoder-only** (BERT — understanding/classification); **Decoder-only** (GPT, LLaMA — generation, with causal mask); **Encoder-Decoder** (T5, BART — translation/summarization). Modern LLMs are mostly decoder-only. Common improvements: **RoPE** replacing positional encoding, **SwiGLU** replacing ReLU, **RMSNorm** replacing LayerNorm, **GQA** (Grouped-Query Attention) to shrink KV cache memory, **Flash Attention** to optimize GPU I/O.
