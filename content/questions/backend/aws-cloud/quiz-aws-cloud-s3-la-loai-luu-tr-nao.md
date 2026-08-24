---
id: quiz-aws-cloud-s3-la-loai-luu-tr-nao
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
S3 là loại lưu trữ nào?

## Đáp án trắc nghiệm
- [x] Lưu trữ đối tượng, truy cập qua API
- [ ] Hệ thống tệp chia sẻ giữa nhiều máy
- [ ] Cơ sở dữ liệu quan hệ có quản lý
- [ ] Lưu trữ khối gắn vào máy ảo

## Giải thích (VI)
Lưu trữ đối tượng (object storage): mỗi tệp là một object có khóa, nội dung và metadata, truy cập qua API HTTP chứ không mount như ổ đĩa. Phù hợp cho ảnh, video, bản sao lưu, tệp tĩnh, dữ liệu thô.

### Giải thích các phương án:
- **Lưu trữ đối tượng, truy cập qua API** (Đúng): Mỗi tệp là một object có khóa và metadata, không phải hệ thống tệp.
- **Hệ thống tệp chia sẻ giữa nhiều máy** (Sai): Đó là EFS.
- **Cơ sở dữ liệu quan hệ có quản lý** (Sai): Đó là RDS.
- **Lưu trữ khối gắn vào máy ảo** (Sai): Đó là EBS.
