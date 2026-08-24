---
id: cach-handle-file-upload-trong-node-js
position: backend
technology: node.js-deep
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách handle file upload trong Node.js?

## Question (EN)
How do you handle file uploads in Node.js?

## Đáp án chi tiết (VI)
Để xử lý file upload trong Express, thư viện phổ biến nhất là multer hoạt động như một middleware, cấu hình bằng `const upload = multer({ dest: 'uploads/' })` rồi gắn vào route cụ thể như `app.post('/upload', upload.single('file'), handler)`.\
\
Khi nhận file cần validate kỹ hai thứ: kích thước file (giới hạn bằng option `limits: { fileSize: 5 * 1024 * 1024 }` cho 5MB) và loại file qua mimetype để chặn file độc hại.\
\
Trong môi trường production, không nên lưu file vào server local mà upload thẳng lên cloud storage như AWS S3 hoặc Google Cloud Storage để đảm bảo scalability và reliability. Với file lớn hàng trăm MB trở lên, nên dùng stream upload thay vì đọc toàn bộ file vào memory để tránh crash server.

## Detailed Answer (EN)
For file uploads in Express, multer is the most popular middleware. Configure it: `const upload = multer({ dest: 'uploads/' })` and attach to a specific route: `app.post('/upload', upload.single('file'), handler)`. Always validate two things: file size (use `limits: { fileSize: 5 * 1024 * 1024 }` for 5MB) and file type via mimetype to block malicious uploads. In production, do not save to local disk — upload directly to cloud storage like AWS S3 or Google Cloud Storage for scalability and reliability. For large files (hundreds of MB+), use streaming uploads instead of reading the whole file into memory to prevent server crashes.
