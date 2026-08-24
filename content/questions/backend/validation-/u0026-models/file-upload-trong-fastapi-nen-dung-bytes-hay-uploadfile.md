---
id: file-upload-trong-fastapi-nen-dung-bytes-hay-uploadfile
position: backend
technology: validation-\u0026-models
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File upload trong FastAPI nên dùng `bytes` hay `UploadFile`?

## Question (EN)
Should FastAPI file uploads use `bytes` or `UploadFile`?

## Đáp án chi tiết (VI)
`bytes` đọc toàn bộ file vào memory, chỉ phù hợp file nhỏ. `UploadFile` dùng spooled file, có metadata như filename/content_type và hỗ trợ async read, phù hợp file lớn hơn.\
\
Ví dụ:\
```python\
@app.post(\\"/avatar\\")\
async def upload_avatar(file: UploadFile):\
    content_type = file.content_type\
    data = await file.read()\
```\
Production cần giới hạn size, validate content type thật, scan nếu cần, lưu object storage và tránh tin filename từ client.

## Detailed Answer (EN)
`bytes` reads the whole file into memory and only fits small files. `UploadFile` uses a spooled file, includes metadata such as filename/content_type and supports async reads, fitting larger files.\
\
Example:\
```python\
@app.post(\\"/avatar\\")\
async def upload_avatar(file: UploadFile):\
    content_type = file.content_type\
    data = await file.read()\
```\
Production needs size limits, real content-type validation, scanning when required, object storage and should not trust client filenames.
