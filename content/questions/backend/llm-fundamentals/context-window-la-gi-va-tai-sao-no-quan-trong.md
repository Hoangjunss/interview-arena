---
id: context-window-la-gi-va-tai-sao-no-quan-trong
position: backend
technology: llm-fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context window là gì và tại sao nó quan trọng?

## Question (EN)
What is the context window and why does it matter?

## Đáp án chi tiết (VI)
Context window là số token tối đa model có thể \\"nhìn thấy\\" cùng lúc — bao gồm cả prompt (system + user + history) và output đang sinh. Model hiện hành phổ biến ở mức vài trăm nghìn token, một số (như Gemini) lên tới hàng triệu — con số cụ thể thay đổi theo từng phiên bản, nên tra tài liệu của model đang dùng.\
\
Tại sao quan trọng:\
- **Giới hạn input** — tài liệu dài, conversation history, code base phải vừa trong cửa sổ.\
- **Chi phí \u0026 latency** — attention là O(n²) theo độ dài context nên context dài → inference chậm và đắt hơn.\
- **Chất lượng suy giảm** — hiện tượng \\"**lost in the middle**\\": model thường chú ý kém với thông tin ở giữa context dài.\
\
Các kỹ thuật xử lý khi vượt context: **sliding window / truncation** giữ các phần quan trọng nhất, **summarization** gói gọn history cũ, **RAG** chỉ retrieve đoạn liên quan thay vì đẩy hết tài liệu vào, **prompt compression** (LLMLingua) nén prompt, **hierarchical processing** chia nhỏ rồi tổng hợp.

## Detailed Answer (EN)
The context window is the maximum number of tokens the model can see at once — including prompt (system + user + history) and the output being generated. Current mainstream models sit at a few hundred thousand tokens, some (like Gemini) reaching millions — exact figures change per model version, so check the docs of the model you use.\
\
Why it matters:\
- **Input limit** — long documents, conversation history, codebases must fit.\
- **Cost \u0026 latency** — attention is O(n²) in context length, so longer context means slower and more expensive inference.\
- **Quality degrades** — the \\"**lost in the middle**\\" phenomenon: models often pay less attention to info in the middle of long contexts.\
\
Handling overflow: **sliding window / truncation** keep the most important parts, **summarization** compresses old history, **RAG** retrieves only relevant chunks instead of dumping entire documents, **prompt compression** (LLMLingua), **hierarchical processing** split-then-aggregate.
