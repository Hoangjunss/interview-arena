---
id: cac-vai-tro-message-system-user-assistant-khac-nhau-the-nao-chat-template-la-gi
position: backend
technology: prompt-\u0026-context
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các vai trò message system / user / assistant khác nhau thế nào? Chat template là gì?

## Question (EN)
How do system / user / assistant message roles differ? What is a chat template?

## Đáp án chi tiết (VI)
API chat của LLM nhận một **danh sách message**, mỗi message có `role` và `content`:\
\
- **system** — chỉ dẫn nền, đặt hành vi/persona/ràng buộc cho cả cuộc hội thoại. Thường đặt một lần ở đầu, ưu tiên cao.\
- **user** — đầu vào của người dùng ở mỗi lượt.\
- **assistant** — câu trả lời của model. Khi gửi lại lịch sử, các message assistant cũ giúp model có ngữ cảnh multi-turn.\
- **tool** (hoặc `function`) — kết quả trả về từ tool mà model đã gọi.\
\
**Chat template** là bước biến danh sách message có cấu trúc này thành **một chuỗi token phẳng** đúng định dạng mà model đã được train. Model open-source lưu template (Jinja) trong tokenizer; nó chèn các **control token** như `\u003c|system|\u003e`, `\u003c|user|\u003e`, `\u003c|assistant|\u003e`, `\u003c|end|\u003e`. Dùng sai template (sai token đặc biệt, sai thứ tự) → model hiểu sai ranh giới lượt và trả lời kém. Với API (OpenAI/Anthropic) việc format này được xử lý phía server; khi self-host thì phải `apply_chat_template` đúng.

## Detailed Answer (EN)
An LLM chat API takes a **list of messages**, each with a `role` and `content`:\
\
- **system** — foundational instructions setting behavior/persona/constraints for the whole conversation. Usually set once at the top, high priority.\
- **user** — the user's input each turn.\
- **assistant** — the model's replies. When you resend history, past assistant messages give the model multi-turn context.\
- **tool** (or `function`) — the result returned from a tool the model called.\
\
A **chat template** turns this structured message list into **a single flat token sequence** in the exact format the model was trained on. Open-source models store the template (Jinja) in the tokenizer; it inserts **control tokens** like `\u003c|system|\u003e`, `\u003c|user|\u003e`, `\u003c|assistant|\u003e`, `\u003c|end|\u003e`. Using the wrong template (wrong special tokens or order) makes the model misread turn boundaries and answer poorly. With APIs (OpenAI/Anthropic) this formatting is handled server-side; when self-hosting you must `apply_chat_template` correctly.
