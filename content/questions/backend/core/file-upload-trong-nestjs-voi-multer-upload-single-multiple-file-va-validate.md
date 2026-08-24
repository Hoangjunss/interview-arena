---
id: file-upload-trong-nestjs-voi-multer-upload-single-multiple-file-va-validate
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File upload trong NestJS với Multer — upload single, multiple file và validate?

## Question (EN)
File upload in NestJS with Multer — single, multiple files and validation?

## Đáp án chi tiết (VI)
NestJS tích hợp Multer qua `@nestjs/platform-express` để xử lý `multipart/form-data`. Không cần install thêm gì với Express adapter.\
\
Upload single file: dùng `@UseInterceptors(FileInterceptor('fieldName', options))` và `@UploadedFile()` decorator. Options quan trọng: `storage` — `diskStorage()` lưu disk hoặc `memoryStorage()` lưu buffer (dùng khi upload S3), `fileFilter` để reject file không hợp lệ, `limits.fileSize` giới hạn kích thước.\
\
Upload multiple files: `FilesInterceptor('fieldName', maxCount)` với `@UploadedFiles()`. `ParseFilePipe` với validators `MaxFileSizeValidator` và `FileTypeValidator` là cách clean nhất để validate. Upload S3: dùng `memoryStorage()` để lấy `file.buffer`, gọi AWS SDK `s3.putObject()` với buffer và `file.mimetype`. Luôn generate tên file ngẫu nhiên để tránh xung đột và directory traversal.

## Detailed Answer (EN)
NestJS integrates Multer via `@nestjs/platform-express` to handle `multipart/form-data`. No additional installation is needed with the Express adapter.\
\
Single file upload: use `@UseInterceptors(FileInterceptor('fieldName', options))` and the `@UploadedFile()` decorator. Key options: `storage` — `diskStorage()` saves to disk or `memoryStorage()` keeps it as a buffer (use when uploading to S3), `fileFilter` to reject invalid files, `limits.fileSize` to cap file size.\
\
Multiple file upload: `FilesInterceptor('fieldName', maxCount)` with `@UploadedFiles()`. `ParseFilePipe` with `MaxFileSizeValidator` and `FileTypeValidator` is the cleanest validation approach. S3 upload: use `memoryStorage()` to get `file.buffer`, then call AWS SDK `s3.putObject()` with the buffer and `file.mimetype`. Always generate random filenames to avoid conflicts and directory traversal.
