---
id: null-object-pattern-la-gi-no-giup-loai-bo-viec-kiem-tra-null-ra-sao
position: backend
technology: behavioral
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Null Object pattern là gì? Nó giúp loại bỏ việc kiểm tra null ra sao?

## Question (EN)
What is the Null Object pattern? How does it eliminate null checks?

## Đáp án chi tiết (VI)
**Vấn đề**: code rải rác `if (obj != null) obj.doSomething()` gây rối, dễ quên, và dẫn tới NullPointerException.\
\
**Ý tưởng**: thay vì trả `null` khi \\"không có gì\\

## Detailed Answer (EN)
**Problem**: scattered `if (obj != null) obj.doSomething()` is noisy, easy to forget, and leads to NullPointerExceptions.\
\
**Idea**: instead of returning `null` for \\"nothing\\
