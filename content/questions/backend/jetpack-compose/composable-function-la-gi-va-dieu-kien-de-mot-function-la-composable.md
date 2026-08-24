---
id: composable-function-la-gi-va-dieu-kien-de-mot-function-la-composable
position: backend
technology: jetpack-compose
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Composable function là gì và điều kiện để một function là Composable?

## Question (EN)
What is a Composable function and what makes something Composable?

## Đáp án chi tiết (VI)
`@Composable` đánh dấu một Kotlin function là pure, idempotent (cùng input → cùng output), và được gọi bởi Compose runtime chứ không phải do bạn gọi thủ công — đây là ràng buộc quan trọng nhất. Function phải trả về Unit, không có side effect trực tiếp, và chạy nhanh. Annotation `@Composable` báo cho Compose runtime theo dõi recomposition và state change.

## Detailed Answer (EN)
`@Composable` marks a Kotlin function as pure, idempotent (same inputs = same output), and invoked by the Compose runtime — not manually. This contract is the key non-obvious constraint. The function returns Unit, must have no direct side effects, and must be fast. The annotation tells the Compose runtime to track recompositions and state changes.
