---
id: discriminated-unions-vs-class-hierarchy-khi-nao-dung-cai-nao
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Discriminated unions vs class hierarchy khi nào dùng cái nào?

## Question (EN)
When should you use discriminated unions vs class hierarchies?

## Đáp án chi tiết (VI)
Discriminated unions: prefer khi data-centric, cần exhaustive matching, serializable (Redux actions, API responses). Redux Toolkit `createSlice` actions là ví dụ thực tế điển hình — mỗi action type là một discriminated union member và reducers exhaustively switch qua chúng. Class hierarchy: khi cần behavior với data, encapsulation, OOP patterns. TypeScript exhaustiveness checking qua never type.

## Detailed Answer (EN)
Discriminated unions: prefer when data-centric, need exhaustive matching, or data must be serializable (Redux actions, API responses). Redux Toolkit `createSlice` actions are a prime real-world example — each action type is a discriminated union member and reducers exhaustively switch through them. Class hierarchy: when you need behavior bundled with data, encapsulation, or OOP patterns. TypeScript exhaustiveness checking uses the never type.
