---
id: backtracking-khi-nao-dung-va-sao-phan-biet-voi-dp
position: backend
technology: backtracking
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Backtracking — Khi nào dùng và sao phân biệt với DP?

## Question (EN)
When to use Backtracking and how to distinguish from DP?

## Đáp án chi tiết (VI)
**Backtracking** = thử mọi khả năng có hệ thống, đụng ràng buộc thì quay lại đầu thử khả năng khác.\
\
**Khi nào dùng:**\
- Cần liệt kê **tất cả nghiệm** (subsets, permutations, combinations)\
- Cần tìm 1 nghiệm thoả điều kiện (N-Queens, Sudoku, Word Search)\
- Có thể prune (cắt nhánh) sớm khi đụng ràng buộc\
\
**Pattern chung:**\
```ts\
function backtrack(state: State, choices: Choice[]) {\
  if (isGoal(state)) {\
    saveResult(state)\
    return\
  }\
  for (const choice of choices) {\
    if (!isValid(choice, state)) continue  // PRUNE\
    apply(choice, state)\
    backtrack(state, nextChoices(state))\
    undo(choice, state)  // quan trọng: quay lui\
  }\
}\
```\
\
**Backtracking vs DP:**\
- **DP** = optimize, không liệt kê. Có overlapping subproblems → memoize\
- **Backtracking** = liệt kê, không optimize. Không có overlapping → không cache được\
\
Nếu sub-problem overlap → DP. Nếu mỗi sub-problem unique (vì state phụ thuộc path đi) → Backtracking.

## Detailed Answer (EN)
Backtracking systematically tries all possibilities, undoing on dead-ends. Use for enumerating all solutions (subsets, permutations, N-Queens). Key difference from DP: backtracking solves unique non-overlapping subproblems via state-path; DP solves overlapping subproblems via memo.
