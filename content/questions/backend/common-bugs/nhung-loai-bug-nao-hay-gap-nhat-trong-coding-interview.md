---
id: nhung-loai-bug-nao-hay-gap-nhat-trong-coding-interview
position: backend
technology: common-bugs
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những loại bug nào hay gặp nhất trong coding interview?

## Question (EN)
What kinds of bugs are most common in coding interviews?

## Đáp án chi tiết (VI)
Phần lớn bug interview rơi vào vài nhóm quen thuộc: (1) off-by-one — sai `\u003c` vs `\u003c=`, index `n` thay vì `n-1`, quên phần tử cuối; (2) null/empty — không xử lý mảng rỗng, list rỗng, hoặc node null; (3) quên cập nhật state — không tăng pointer, không reset biến trong vòng lặp dẫn tới infinite loop; (4) integer overflow trong Java/C++ (dùng `left + (right-left)/2` thay vì `(left+right)/2`); (5) mutate input khi không được phép; (6) dùng lại cùng phần tử trong bài cần cặp phân biệt. Biết trước danh sách này giúp bạn tự kiểm khi dry-run nhanh hơn.

## Detailed Answer (EN)
Most interview bugs fall into a few buckets: off-by-one (\u003c vs \u003c=, index n instead of n-1), null/empty handling, forgetting to update state (no pointer increment, no reset, infinite loops), integer overflow in Java/C++ (use left + (right-left)/2), mutating input when not allowed, and reusing the same element in pair problems. Knowing this list lets you self-check faster during a dry run.
