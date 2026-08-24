---
id: perplexity-la-gi-do-cai-gi-va-co-han-che-nao
position: backend
technology: evaluation-\u0026-safety
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Perplexity là gì? Đo cái gì và có hạn chế nào?

## Question (EN)
What is perplexity? What does it measure and what are its limits?

## Đáp án chi tiết (VI)
**Perplexity (PPL)** đo mức độ \\"bất ngờ\\" của một mô hình ngôn ngữ khi dự đoán một chuỗi text — chính là **lũy thừa của cross-entropy trung bình** (`exp(mean negative log-likelihood)`). Trực giác: PPL = số lựa chọn khả dĩ trung bình mà model \\"phân vân\\" ở mỗi token. **PPL thấp = model tự tin và dự đoán tốt hơn**.\
\
Dùng để: so sánh các mô hình ngôn ngữ trên cùng tập test, theo dõi hội tụ khi train/fine-tune, phát hiện text out-of-distribution.\
\
**Cách tính cho model context giới hạn**: dùng **sliding window** (trượt cửa sổ ngữ cảnh) thay vì cắt rời từng đoạn, để mỗi token được dự đoán với đủ ngữ cảnh — cắt rời cho PPL cao giả tạo.\
\
**Hạn chế**:\
- **Phụ thuộc tokenizer/vocab** — không so được PPL giữa hai model khác tokenizer.\
- **Không đo tính hữu ích/đúng đắn** — model có PPL thấp vẫn có thể hallucinate hoặc trả lời vô dụng.\
- Không áp dụng trực tiếp cho tác vụ downstream (QA, tóm tắt) — ở đó cần metric riêng (accuracy, faithfulness, LLM-as-judge).

## Detailed Answer (EN)
$84
