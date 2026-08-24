---
id: proxy-pattern-la-gi-cac-loai-proxy-pho-bien
position: backend
technology: structural
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Proxy pattern là gì? Các loại Proxy phổ biến?

## Question (EN)
What is the Proxy pattern? What are the common types of Proxy?

## Đáp án chi tiết (VI)
Proxy cung cấp surrogate object thay thế cho object khác — control access đến object gốc và có thể thêm logic trước/sau. Các loại phổ biến: (1) **Virtual Proxy** (lazy initialization): chỉ tạo object nặng khi thực sự cần — ví dụ lazy load image; (2) **Protection Proxy** (access control): kiểm tra permission trước khi delegate; (3) **Caching Proxy**: cache result của expensive operation; (4) **Logging Proxy**: ghi log mọi request đến object. JavaScript `Proxy` object là triển khai native:\
```javascript\
const handler = {\
  get(obj, prop) {\
    console.log(`Getting ${String(prop)}`)\
    return obj[prop]\
  }\
}\
const proxy = new Proxy(target, handler)\
```\
Trong NestJS, Guards và Interceptors là Proxy pattern. Khác Decorator: Proxy thường quản lý lifecycle của subject; Decorator thêm behavior mà client biết. Dùng khi: cần access control, lazy init, caching, logging mà không sửa class gốc.

## Detailed Answer (EN)
$82
