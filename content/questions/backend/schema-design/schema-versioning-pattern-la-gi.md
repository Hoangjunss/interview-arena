---
id: schema-versioning-pattern-la-gi
position: backend
technology: schema-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Schema versioning pattern là gì?

## Question (EN)
What is the schema versioning pattern?

## Đáp án chi tiết (VI)
Đây là pattern thêm một field như `schemaVersion: 2` vào mỗi document để xử lý việc cấu trúc dữ liệu thay đổi theo thời gian.\
\
Thay vì chạy migration trên hàng triệu bản ghi (dễ gây downtime), app *kiểm tra `schemaVersion` lúc đọc*: nếu là bản cũ thì map sang cấu trúc mới ngay trong code (RAM), và lưu lại dạng mới khi user có thao tác update. Nhờ vậy đổi cấu trúc mà không cần downtime, chi phí migration được rải dần.

## Detailed Answer (EN)
This pattern adds a field like `schemaVersion: 2` to each document to handle the data shape changing over time.\
\
Instead of migrating millions of records at once (risking downtime), the app *checks `schemaVersion` on read*: if it's an old version, it maps it to the new shape in code (in RAM), and persists the new shape when the user updates the document. This lets you change structure with no downtime, spreading the migration cost over time.
