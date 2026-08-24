---
id: active-storage-dinh-kem-file-vao-model-nhu-the-nao
position: backend
technology: active-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Active Storage đính kèm file vào model như thế nào?

## Question (EN)
How does Active Storage attach files to a model?

## Đáp án chi tiết (VI)
**Active Storage** là framework tích hợp sẵn để đính kèm file (ảnh, PDF...) và upload lên cloud (S3, GCS, Azure) hoặc disk local. Cần chạy `rails active_storage:install` một lần để tạo các bảng `active_storage_blobs`, `active_storage_attachments`.\
\
Khai báo trên model và attach:\
\
```ruby\
class User \u003c ApplicationRecord\
  has_one_attached :avatar       # 1 file\
  has_many_attached :documents   # nhiều file\
end\
\
user.avatar.attach(params[:avatar])   # gắn file từ form upload\
user.avatar.attached?                 # kiểm tra đã có chưa\
url_for(user.avatar)                  # sinh URL để hiển thị/tải\
```\
\
**Điểm cốt lõi:**\
- File thực nằm ở **storage service** (khai báo trong `config/storage.yml`), DB chỉ giữ metadata (blob) và liên kết (attachment).\
- Với ảnh, dùng **variant** để resize on-the-fly: `user.avatar.variant(resize_to_limit: [100, 100])`.\
- Không cần gem ngoài (paperclip/carrierwave) cho nhu cầu cơ bản.

## Detailed Answer (EN)
**Active Storage** is Rails' built-in framework for attaching files (images, PDFs...) and uploading them to cloud services (S3, GCS, Azure) or local disk. Run `rails active_storage:install` once to create the `active_storage_blobs` and `active_storage_attachments` tables.\
\
Declare it on the model and attach:\
\
```ruby\
class User \u003c ApplicationRecord\
  has_one_attached :avatar       # single file\
  has_many_attached :documents   # multiple files\
end\
\
user.avatar.attach(params[:avatar])   # attach a file from a form upload\
user.avatar.attached?                 # check if present\
url_for(user.avatar)                  # generate a URL to display/download\
```\
\
**Key points:**\
- The actual file lives in a **storage service** (declared in `config/storage.yml`); the DB only holds metadata (blob) and the link (attachment).\
- For images, use a **variant** to resize on the fly: `user.avatar.variant(resize_to_limit: [100, 100])`.\
- No external gem (paperclip/carrierwave) needed for basic use cases.
