---
id: zero-shot-one-shot-few-shot-prompting-khac-nhau-the-nao
position: backend
technology: prompt-\u0026-context
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Zero-shot, one-shot, few-shot prompting khác nhau thế nào?

## Question (EN)
How do zero-shot, one-shot, and few-shot prompting differ?

## Đáp án chi tiết (VI)
**Zero-shot**: chỉ mô tả task bằng ngôn ngữ tự nhiên, không cho ví dụ. Ví dụ: `\\"Phân loại sentiment của câu sau: 'Sản phẩm rất tệ'\\"`. Dùng khi task phổ biến, model lớn đủ khả năng hiểu.\
\
**One-shot**: cho 1 ví dụ input→output trước task thật. Giúp model hiểu format mong muốn.\
\
**Few-shot**: cho 2-10 ví dụ đa dạng. Ví dụ:\
```\
Q: \\"Dở quá\\" → Negative\
Q: \\"Tuyệt vời\\" → Positive\
Q: \\"Tạm được\\" → Neutral\
Q: \\"Sản phẩm rất tệ\\" → ?\
```\
\
Few-shot thường tốt hơn zero-shot với task cần format phức tạp, domain-specific, hoặc khi zero-shot không ổn định.\
\
**Lưu ý**:\
- Thứ tự ví dụ ảnh hưởng output (recency bias).\
- Ví dụ phải đại diện tốt cho distribution.\
- Tốn token → chi phí tăng.\
- Với model mạnh hiện nay, zero-shot với instructions rõ ràng thường đã đủ.

## Detailed Answer (EN)
**Zero-shot**: describe the task in natural language with no examples. E.g. `\\"Classify the sentiment: 'The product is terrible'\\"`. Use when tasks are common and the model is strong enough.\
\
**One-shot**: include 1 input→output example before the real task. Helps convey the desired format.\
\
**Few-shot**: 2–10 diverse examples. E.g.:\
```\
Q: \\"Awful\\" → Negative\
Q: \\"Amazing\\" → Positive\
Q: \\"It's okay\\" → Neutral\
Q: \\"The product is terrible\\" → ?\
```\
\
Few-shot usually beats zero-shot for complex formats, domain-specific tasks, or unstable zero-shot.\
\
**Caveats**:\
- Example order affects output (recency bias).\
- Examples must represent the distribution well.\
- Eats tokens → costs more.\
- With today's strong models, zero-shot with clear instructions is often enough.
