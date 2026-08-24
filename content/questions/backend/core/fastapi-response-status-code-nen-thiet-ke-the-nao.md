---
id: fastapi-response-status-code-nen-thiet-ke-the-nao
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FastAPI response status code nên thiết kế thế nào?

## Question (EN)
How should FastAPI response status codes be designed?

## Đáp án chi tiết (VI)
Status code nên phản ánh kết quả API: 200 cho đọc/update thành công, 201 cho create, 204 cho delete/no content, 400 cho input semantic sai, 401 chưa xác thực, 403 không đủ quyền, 404 không tồn tại, 409 conflict.\
\
Ví dụ:\
```python\
@app.post(\\"/users\\

## Detailed Answer (EN)
Status codes should reflect API outcomes: 200 for successful read/update, 201 for create, 204 for delete/no content, 400 for semantic input errors, 401 unauthenticated, 403 forbidden, 404 missing resource and 409 conflict.\
\
Example:\
```python\
@app.post(\\"/users\\
