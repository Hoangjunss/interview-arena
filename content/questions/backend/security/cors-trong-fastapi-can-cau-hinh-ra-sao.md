---
id: cors-trong-fastapi-can-cau-hinh-ra-sao
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CORS trong FastAPI cần cấu hình ra sao?

## Question (EN)
How should CORS be configured in FastAPI?

## Đáp án chi tiết (VI)
CORS được cấu hình bằng `CORSMiddleware`. Không nên dùng wildcard origin cùng credentials trong production; hãy whitelist domain cụ thể theo môi trường.\
\
Ví dụ:\
```python\
app.add_middleware(\
    CORSMiddleware,\
    allow_origins=[\\"https://app.example.com\\"],\
    allow_credentials=True,\
    allow_methods=[\\"GET\\

## Detailed Answer (EN)
CORS is configured with `CORSMiddleware`. Do not use wildcard origins with credentials in production; whitelist concrete domains per environment.\
\
Example:\
```python\
app.add_middleware(\
    CORSMiddleware,\
    allow_origins=[\\"https://app.example.com\\"],\
    allow_credentials=True,\
    allow_methods=[\\"GET\\
