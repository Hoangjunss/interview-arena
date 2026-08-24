---
id: remember-mutablestateof-va-state-hoisting-trong-compose-la-gi
position: backend
technology: jetpack-compose
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
remember, mutableStateOf và state hoisting trong Compose là gì?

## Question (EN)
What are remember, mutableStateOf and state hoisting in Compose?

## Đáp án chi tiết (VI)
- **`mutableStateOf`**: tạo một **state quan sát được**; khi giá trị đổi, mọi composable đọc nó sẽ recompose.\
- **`remember`**: **lưu giữ** một đối tượng qua các lần recomposition (không tạo lại mỗi lần chạy). `remember { mutableStateOf(...) }` là cặp phổ biến để giữ state cục bộ.\
- **`rememberSaveable`**: như `remember` nhưng còn **sống qua xoay màn hình / process death**.\
- **State hoisting**: **đẩy state lên composable cha**, truyền `value` xuống và `onValueChange` (event) lên — biến composable con thành **stateless**, dễ tái dùng và test. Nguyên tắc: state đi xuống, event đi lên (unidirectional data flow).\
\
Hay hỏi: vì sao cần `remember` (không có nó state bị reset mỗi recomposition) và khi nào tách state ra state holder/ViewModel.

## Detailed Answer (EN)
- **`mutableStateOf`**: creates an **observable state**; when its value changes, every composable reading it recomposes.\
- **`remember`**: **retains** an object across recompositions (does not recreate it each run). `remember { mutableStateOf(...) }` is the common pair for local state.\
- **`rememberSaveable`**: like `remember` but also **survives rotation / process death**.\
- **State hoisting**: **lift state to a parent composable**, passing `value` down and `onValueChange` (events) up — making the child **stateless**, reusable and testable. Rule: state flows down, events flow up (unidirectional data flow).\
\
Common ask: why `remember` is needed (without it state resets each recomposition) and when to move state into a state holder/ViewModel.
