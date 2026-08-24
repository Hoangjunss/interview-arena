---
id: typescript-performance-tai-sao-type-checking-co-the-cham-va-cach-cai-thien
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TypeScript performance: tại sao type checking có thể chậm và cách cải thiện?

## Question (EN)
Why can TypeScript type checking be slow, and how do you improve it?

## Đáp án chi tiết (VI)
Type checking chậm do: complex conditional types, deep recursion, large union types, excessive use of infer. Cải thiện: bật incremental compilation, dùng project references, skipLibCheck: true, tránh deeply recursive types, prefer interface over type cho object shapes (merge tốt hơn), dùng tsc --diagnostics để profile.\
\
Lý do prefer interface cho performance: interface types được cached bởi identity — compiler có thể nhanh chóng xác định hai interface references là cùng một type mà không cần re-evaluate. Type alias (đặc biệt là complex types) phải re-evaluate mỗi lần dùng.

## Detailed Answer (EN)
Type checking can be slow due to: complex conditional types, deep recursion, large union types, and excessive use of infer. Improvements: enable incremental compilation, use project references, set skipLibCheck: true, avoid deeply recursive types, prefer interface over type for object shapes (merges better), and use `tsc --diagnostics` to profile.\
\
Why interface performs better: interface types are cached by identity — the compiler can quickly determine two interface references are the same type without re-evaluating. Type aliases (especially complex ones) must be re-evaluated each time they are used.
