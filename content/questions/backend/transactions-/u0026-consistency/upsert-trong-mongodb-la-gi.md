---
id: upsert-trong-mongodb-la-gi
position: backend
technology: transactions-\u0026-consistency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Upsert trong MongoDB là gì?

## Question (EN)
What is an upsert in MongoDB?

## Đáp án chi tiết (VI)
Upsert (\\"update + insert\\") là một tùy chọn của lệnh update, vd `updateOne(filter, update, { upsert: true })`.\
\
Cơ chế: nếu có document khớp `filter` → **update** nó; nếu không có → **insert** một document mới ghép từ giá trị trong `filter` và các toán tử `update`. Rất tiện cho đồng bộ dữ liệu hoặc tăng/đếm counter (\\"nếu chưa có thì tạo, có rồi thì cộng dồn\\").

## Detailed Answer (EN)
Upsert (\\"update + insert\\") is an option on update commands, e.g. `updateOne(filter, update, { upsert: true })`.\
\
Mechanism: if a document matches the `filter` → it **updates** it; if none matches → it **inserts** a new document built from the `filter` values and the `update` operators. Very handy for data sync or counters (\\"create if missing, otherwise increment\\").
