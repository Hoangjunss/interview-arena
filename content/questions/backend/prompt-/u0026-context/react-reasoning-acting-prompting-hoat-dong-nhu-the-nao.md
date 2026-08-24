---
id: react-reasoning-acting-prompting-hoat-dong-nhu-the-nao
position: backend
technology: prompt-\u0026-context
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ReAct (Reasoning + Acting) prompting hoạt động như thế nào?

## Question (EN)
How does ReAct (Reasoning + Acting) prompting work?

## Đáp án chi tiết (VI)
**ReAct** (Yao et al. 2022) kết hợp **Reasoning** (suy luận bằng CoT) với **Acting** (gọi tool/API lấy thông tin bên ngoài). Model lặp vòng: **Thought → Action → Observation → Thought → ...** cho đến khi có đủ dữ kiện để trả lời.\
\
Ví dụ workflow:\
```\
Question: \\"GDP Việt Nam 2024 gấp bao lần Lào?\\"\
\
Thought: Cần tra GDP VN và Lào.\
Action: search(\\"GDP Vietnam 2024\\")\
Observation: 476 tỷ USD\
\
Thought: Giờ tra Lào.\
Action: search(\\"GDP Laos 2024\\")\
Observation: 15.8 tỷ USD\
\
Thought: 476 / 15.8 ≈ 30.1.\
Answer: Khoảng 30 lần.\
```\
\
**Ưu điểm**:\
- Giảm hallucination do dùng dữ kiện thực.\
- Minh bạch (traceable reasoning).\
- Kết hợp được nhiều tool (search, calculator, DB query, code execution).\
\
Đây là nền tảng cho hầu hết **AI agent** hiện tại (LangChain Agent, LlamaIndex Agent, OpenAI Assistants).\
\
**Nhược điểm**:\
- Latency cao (nhiều round-trip LLM call).\
- Chi phí token lớn.\
- Dễ kẹt vòng lặp nếu tool trả kết quả không rõ — cần đặt **max_iterations** và **timeout**.

## Detailed Answer (EN)
**ReAct** (Yao et al. 2022) combines **Reasoning** (CoT) with **Acting** (calling tools/APIs for external info). The model loops: **Thought → Action → Observation → Thought → ...** until it has enough to answer.\
\
Example workflow:\
```\
Question: \\"How many times is Vietnam's GDP larger than Laos' in 2024?\\"\
\
Thought: Need VN and Laos GDP.\
Action: search(\\"GDP Vietnam 2024\\")\
Observation: $476B\
\
Thought: Now Laos.\
Action: search(\\"GDP Laos 2024\\")\
Observation: $15.8B\
\
Thought: 476 / 15.8 ≈ 30.1.\
Answer: About 30x.\
```\
\
**Pros**:\
- Less hallucination since it uses real data.\
- Transparent (traceable reasoning).\
- Composes many tools (search, calculator, DB, code exec).\
\
It underpins most current **AI agents** (LangChain Agent, LlamaIndex Agent, OpenAI Assistants).\
\
**Cons**:\
- High latency (many LLM round-trips).\
- High token cost.\
- Risks looping if tools return ambiguous results — always set **max_iterations** and **timeout**.
