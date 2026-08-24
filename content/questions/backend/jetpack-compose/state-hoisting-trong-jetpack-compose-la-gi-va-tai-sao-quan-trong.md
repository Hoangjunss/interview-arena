---
id: state-hoisting-trong-jetpack-compose-la-gi-va-tai-sao-quan-trong
position: backend
technology: jetpack-compose
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
State hoisting trong Jetpack Compose là gì và tại sao quan trọng?

## Question (EN)
Explain state hoisting in Jetpack Compose and why it's important.

## Đáp án chi tiết (VI)
State hoisting nghĩa là chuyển state từ composable con lên composable cha, làm cho composable con trở nên stateless. Composable stateless nhận state qua tham số và callback để cập nhật state, giúp tái sử dụng trên nhiều màn hình. Ví dụ hoist state của TextField lên cha để nhiều composable có thể đọc. Điều này cải thiện khả năng test, tái sử dụng, và làm data flow một chiều rõ ràng hơn.

## Detailed Answer (EN)
State hoisting means moving state from a child composable to its parent, making the child stateless. A stateless composable receives state as a parameter and callbacks for state updates, making it reusable across different screens. This improves testability, reusability, and makes data flow unidirectional and predictable.
