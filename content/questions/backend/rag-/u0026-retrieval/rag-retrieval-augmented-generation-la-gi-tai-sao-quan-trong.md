---
id: rag-retrieval-augmented-generation-la-gi-tai-sao-quan-trong
position: backend
technology: rag-\u0026-retrieval
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RAG (Retrieval-Augmented Generation) là gì? Tại sao quan trọng?

## Question (EN)
What is RAG (Retrieval-Augmented Generation) and why does it matter?

## Đáp án chi tiết (VI)
**RAG** là kỹ thuật bổ sung kiến thức bên ngoài cho LLM tại runtime bằng cách **retrieve** (tìm kiếm) đoạn tài liệu liên quan từ knowledge base, rồi chèn vào prompt để LLM **generate** câu trả lời dựa trên ngữ cảnh đó.\
\
Tại sao cần: LLM pre-train có 3 hạn chế lớn:\
- **Knowledge cutoff** — không biết sự kiện sau training date.\
- **Không có kiến thức private/domain-specific** — tài liệu nội bộ công ty, DB khách hàng.\
- **Hallucination** khi hỏi câu ngoài training set.\
\
RAG giải quyết cả 3 bằng cách đưa thông tin chính xác, cập nhật, có nguồn vào context.\
\
Khi nào dùng RAG: Q\u0026A trên tài liệu, chatbot kỹ thuật, search nội bộ, customer support với knowledge base, trợ lý code với codebase, tóm tắt nhiều tài liệu.\
\
Khác fine-tuning: fine-tune \\"bake\\" kiến thức vào weights (tốn resource, khó update); RAG chỉ cần update knowledge base — linh hoạt hơn cho dữ liệu thay đổi nhanh. Trong thực tế thường kết hợp: fine-tune cho **format/style/tool use**, RAG cho **knowledge**.

## Detailed Answer (EN)
**RAG** augments an LLM with external knowledge at runtime by **retrieving** relevant passages from a knowledge base and injecting them into the prompt so the LLM **generates** answers grounded in that context.\
\
Why: pre-trained LLMs have 3 big limitations:\
- **Knowledge cutoff** — unaware of post-training events.\
- **No private/domain-specific knowledge** — internal docs, customer DB.\
- **Hallucination** on out-of-distribution questions.\
\
RAG addresses all three by putting accurate, up-to-date, sourced information into the context.\
\
When to use RAG: Q\u0026A over documents, technical chatbots, internal search, customer support over a knowledge base, code assistants over a codebase, multi-document summarization.\
\
Vs fine-tuning: fine-tuning bakes knowledge into weights (expensive, hard to update); RAG only requires updating the knowledge base — more flexible for fast-changing data. In practice they're combined: fine-tune for **format/style/tool use**, RAG for **knowledge**.
