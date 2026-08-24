---
id: sau-khi-code-xong-bai-nen-test-nhung-case-nao
position: backend
technology: edge-cases
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sau khi code xong bài, nên test những case nào?

## Question (EN)
What cases should you test after coding a solution?

## Đáp án chi tiết (VI)
Nên test theo nhóm: input rỗng hoặc nhỏ nhất; case bình thường; duplicate; giá trị âm/zero nếu đề cho phép; boundary như target ở đầu/cuối; case không có đáp án; case tất cả phần tử giống nhau; case lớn để kiểm complexity. Với string, test empty string, một ký tự, unicode nếu relevant. Với graph, test disconnected graph và cycle. Quan trọng là test bằng tay qua từng dòng code với ít nhất một ví dụ, vì nhiều lỗi interview là off-by-one, update pointer sai, hoặc quên reset state.

## Detailed Answer (EN)
Test empty or smallest input, normal cases, duplicates, negative/zero values if allowed, boundaries, no-answer cases, all-same values, and large cases for complexity. For strings, include empty and single-character cases; for graphs, include disconnected graphs and cycles. Walk through at least one case line by line to catch off-by-one and pointer mistakes.
