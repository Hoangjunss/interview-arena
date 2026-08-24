---
id: su-khac-biet-giua-updateone-va-replaceone
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa `updateOne` và `replaceOne`?

## Question (EN)
What is the difference between `updateOne` and `replaceOne`?

## Đáp án chi tiết (VI)
- **`updateOne`**: chỉ sửa *một phần* document qua các toán tử như `$set`, `$inc`, `$push`. Field nào không nhắc tới thì giữ nguyên.\
- **`replaceOne`**: thay *toàn bộ* nội dung document bằng document mới (vẫn giữ nguyên `_id`). Quên field nào là field đó *mất*.\
\
Liên hệ HTTP cho dễ nhớ: `updateOne` giống **PATCH** (sửa vài field), `replaceOne` giống **PUT** (ghi đè toàn bộ).

## Detailed Answer (EN)
- **`updateOne`**: changes only *part* of a document via operators like `$set`, `$inc`, `$push`. Fields you don't mention stay as they are.\
- **`replaceOne`**: replaces the *entire* document with a new one (keeping the same `_id`). Any field you omit is *lost*.\
\
An HTTP analogy: `updateOne` is like **PATCH** (edit a few fields), `replaceOne` is like **PUT** (full overwrite).
