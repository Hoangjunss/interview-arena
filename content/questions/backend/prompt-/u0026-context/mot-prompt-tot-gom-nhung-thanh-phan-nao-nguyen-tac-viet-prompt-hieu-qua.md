---
id: mot-prompt-tot-gom-nhung-thanh-phan-nao-nguyen-tac-viet-prompt-hieu-qua
position: backend
technology: prompt-\u0026-context
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một prompt tốt gồm những thành phần nào? Nguyên tắc viết prompt hiệu quả?

## Question (EN)
What makes a good prompt? Principles for writing effective prompts?

## Đáp án chi tiết (VI)
Prompt tốt tách bạch các thành phần rõ ràng để model không phải đoán ý:\
\
1. **Vai trò / bối cảnh** (role) — \\"Bạn là chuyên viên phân tích hợp đồng...\\".\
2. **Nhiệm vụ cụ thể** (task) — nói rõ việc cần làm, tránh mơ hồ.\
3. **Ngữ cảnh / dữ liệu** (context) — tài liệu, ví dụ, dữ liệu tham chiếu; đặt trong delimiter (ba dấu backtick, thẻ XML `\u003cdata\u003e`) để tách khỏi chỉ dẫn.\
4. **Ràng buộc** (constraints) — độ dài, ngôn ngữ, điều cấm.\
5. **Định dạng đầu ra** (output format) — JSON, bảng, bullet; nêu schema nếu cần.\
6. **Ví dụ** (few-shot) — 1-3 ví dụ mẫu khi tác vụ khó mô tả bằng lời.\
\
**Nguyên tắc**: rõ ràng và trực tiếp; ưu tiên chỉ dẫn khẳng định (\\"hãy làm X\\") hơn phủ định (\\"đừng làm Y\\"); đặt chỉ dẫn quan trọng ở đầu/cuối; yêu cầu model \\"suy nghĩ từng bước\\" cho bài lý luận. Quan trọng nhất: **có eval để đo** — sửa prompt theo số liệu, không theo cảm tính.

## Detailed Answer (EN)
A good prompt separates its parts clearly so the model does not have to guess intent:\
\
1. **Role / context** — \\"You are a contract-analysis specialist...\\".\
2. **Specific task** — state exactly what to do; avoid vagueness.\
3. **Context / data** — documents, examples, reference data; wrap in delimiters (triple backticks, XML tags `\u003cdata\u003e`) to separate from instructions.\
4. **Constraints** — length, language, what to avoid.\
5. **Output format** — JSON, table, bullets; give a schema when needed.\
6. **Examples** (few-shot) — 1–3 samples when the task is hard to describe in words.\
\
**Principles**: be clear and direct; prefer positive instructions (\\"do X\\") over negative (\\"don't do Y\\"); put key instructions at the start/end; ask the model to \\"think step by step\\" for reasoning tasks. Most important: **have an eval** — iterate on prompts by metrics, not vibes.
