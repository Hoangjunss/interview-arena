---
id: runtime-field-dung-khi-nao
position: backend
technology: mapping
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Runtime field dùng khi nào?

## Question (EN)
When do you use a runtime field?

## Đáp án chi tiết (VI)
Khi cần một field **tính lúc query** mà không muốn reindex: thêm field mới cho dữ liệu cũ, sửa gấp một mapping sai, hoặc thử nghiệm trước khi quyết định index thật.\
\
```json\
\\"runtime\\": {\
  \\"profit\\": {\
    \\"type\\": \\"double\\

## Detailed Answer (EN)
When you need a field **computed at query time** without reindexing: adding a field to old data, patching a wrong mapping urgently, or experimenting before committing to a real field.\
\
```json\
\\"runtime\\": {\
  \\"profit\\": {\
    \\"type\\": \\"double\\
