---
id: riverpod-la-gi-va-khac-provider-nhu-the-nao
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Riverpod là gì và khác Provider như thế nào?

## Question (EN)
What is Riverpod and how is it different from Provider?

## Đáp án chi tiết (VI)
Riverpod (kế thừa tinh thần của Provider, cùng tác giả) hoàn toàn type-safe, không phụ thuộc `BuildContext`, và dùng functional provider. Riverpod sinh code lúc compile-time giúp phòng ngừa nhiều bug. Riverpod hỗ trợ parameterized provider, test tốt hơn và auto-dispose. Dùng Riverpod cho project mới; hiện đại hơn Provider nhưng learning curve hơi cao hơn.

## Detailed Answer (EN)
Riverpod is fully type-safe, doesn't depend on `BuildContext`, and uses functional providers with compile-time code generation. It supports parameterized providers, better testing, and auto-dispose. Use Riverpod for new projects; it's more modern than Provider but has a slightly steeper learning curve.
