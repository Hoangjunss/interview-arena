---
id: quiz-security-cho-upload-anh-kiem-tra-content-type-do-client-gui-co-du-khong
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cho upload ảnh, kiểm tra Content-Type do client gửi có đủ không?

## Đáp án trắc nghiệm
- [x] Không, client khai gì cũng được nên phải kiểm nội dung
- [ ] Không, nhưng chỉ cần đổi tên tệp sau khi lưu lại là an toàn
- [ ] Đủ nếu kèm kiểm tra phần mở rộng của tên tệp
- [ ] Đủ, vì trình duyệt tự đặt Content-Type theo tệp được chọn

## Giải thích (VI)
Không đủ. Content-Type và tên tệp đều do client khai. Phải kiểm nội dung thật (magic bytes / thư viện đọc ảnh), giới hạn kích thước, tự sinh tên tệp mới, và lưu ngoài thư mục web root.

### Giải thích các phương án:
- **Không, client khai gì cũng được nên phải kiểm nội dung** (Đúng): Kiểm magic bytes, giới hạn kích thước, và không tin tên tệp gửi lên.
- **Không, nhưng chỉ cần đổi tên tệp sau khi lưu lại là an toàn** (Sai): Đổi tên giúp ích nhưng chưa xử lý nội dung tệp độc hại.
- **Đủ nếu kèm kiểm tra phần mở rộng của tên tệp** (Sai): Cả hai đều do client khai nên đều giả mạo được.
- **Đủ, vì trình duyệt tự đặt Content-Type theo tệp được chọn** (Sai): Kẻ tấn công không dùng trình duyệt mà gửi request tự tạo.
