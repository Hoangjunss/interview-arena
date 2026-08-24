---
id: mutation-side-effects-onmutate-onsuccess-onerror-onsettled-hoat-dong-ra-sao
position: backend
technology: react-query
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mutation side effects: onMutate, onSuccess, onError, onSettled hoạt động ra sao?

## Question (EN)
What are the mutation lifecycle callbacks in React Query?

## Đáp án chi tiết (VI)
$7a

## Detailed Answer (EN)
useMutation provides lifecycle callbacks at both the mutation level and per-call level: onMutate — fires before the mutation function; receives the variables; used for optimistic updates (update cache optimistically, return rollback context); onSuccess — fires when mutation succeeds; receives data, variables, and context; typically used to invalidate related queries; onError — fires when mutation fails; receives error, variables, and context (from onMutate); used to rollback optimistic updates; onSettled — fires on both success and error; used for cleanup. Two levels of callbacks: mutation-level (defined in useMutation options — run for all invocations); call-level (passed to mutate() or mutateAsync() — run only for that specific call). Execution order: onMutate → mutation function → onSuccess/onError → onSettled (at both levels, mutation-level runs before call-level).
