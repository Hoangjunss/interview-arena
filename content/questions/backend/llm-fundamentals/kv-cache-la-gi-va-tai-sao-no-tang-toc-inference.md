---
id: kv-cache-la-gi-va-tai-sao-no-tang-toc-inference
position: backend
technology: llm-fundamentals
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
KV Cache là gì và tại sao nó tăng tốc inference?

## Question (EN)
What is the KV Cache and why does it speed up inference?

## Đáp án chi tiết (VI)
Khi sinh text autoregressive, tại mỗi step model cần tính self-attention với TẤT CẢ token đã sinh trước đó. Nếu không cache, mỗi token mới phải tính lại K và V cho toàn bộ token cũ → O(n²) work mỗi step.\
\
**KV Cache** lưu lại ma trận K và V đã tính ở các step trước, nên khi sinh token mới chỉ cần: (1) tính Q/K/V cho token mới; (2) append K, V mới vào cache; (3) attention giữa Q mới và toàn bộ K, V trong cache. Độ phức tạp mỗi step giảm từ O(n²) xuống O(n), toàn bộ generation từ O(n³) xuống O(n²).\
\
Nhược điểm: KV cache tiêu tốn GPU memory. Công thức xấp xỉ: `2 × num_layers × num_heads × head_dim × seq_len × batch_size × bytes_per_param`. Với LLaMA-70B, context 32K có thể tốn chục GB/request.\
\
Tối ưu: **GQA/MQA** (giảm số KV head), **PagedAttention** (quản lý KV cache như virtual memory của OS — vLLM dùng), **quantize KV cache** xuống INT8/INT4, **prefix caching** chia sẻ prefix chung giữa các request.

## Detailed Answer (EN)
During autoregressive generation, at each step the model needs self-attention against ALL previously generated tokens. Without caching, each new token recomputes K and V for every old token → O(n²) work per step.\
\
**KV Cache** stores K and V matrices from previous steps, so generating a new token only requires: (1) compute Q/K/V for the new token; (2) append new K, V to the cache; (3) attention between the new Q and the full cached K, V. Per-step complexity drops from O(n²) to O(n); full generation from O(n³) to O(n²).\
\
Downside: KV cache consumes GPU memory. Rough formula: `2 × num_layers × num_heads × head_dim × seq_len × batch_size × bytes_per_param`. For LLaMA-70B at 32K context this can be tens of GB per request.\
\
Optimizations: **GQA/MQA** (fewer KV heads), **PagedAttention** (manages KV cache like OS virtual memory — used by vLLM), **KV cache quantization** to INT8/INT4, **prefix caching** to share common prefixes across requests.
