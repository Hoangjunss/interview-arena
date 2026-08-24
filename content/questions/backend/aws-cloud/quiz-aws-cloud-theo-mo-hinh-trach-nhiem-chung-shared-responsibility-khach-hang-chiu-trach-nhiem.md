---
id: quiz-aws-cloud-theo-mo-hinh-trach-nhiem-chung-shared-responsibility-khach-hang-chiu-trach-nhiem
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Theo mô hình trách nhiệm chung (shared responsibility), khách hàng chịu trách nhiệm phần nào?

## Đáp án trắc nghiệm
- [x] Bảo mật những gì chạy trong đám mây
- [ ] Không phần nào — nhà cung cấp lo toàn bộ bảo mật
- [ ] Bảo mật vật lý của trung tâm dữ liệu
- [ ] Bảo trì phần cứng máy chủ và thiết bị mạng

## Giải thích (VI)
Nhà cung cấp lo bảo mật CỦA đám mây (hạ tầng vật lý, phần cứng, ảo hóa). Khách hàng lo bảo mật TRONG đám mây : phân quyền IAM, cấu hình bucket và security group, mã hóa dữ liệu, vá hệ điều hành trên máy ảo, quản lý khóa truy cập.

### Giải thích các phương án:
- **Bảo mật những gì chạy trong đám mây** (Đúng): Cấu hình, phân quyền, mã hóa dữ liệu, bản vá hệ điều hành trên máy ảo.
- **Không phần nào — nhà cung cấp lo toàn bộ bảo mật** (Sai): Đa số sự cố lộ dữ liệu trên cloud đến từ cấu hình sai của khách hàng.
- **Bảo mật vật lý của trung tâm dữ liệu** (Sai): Đây là phần của nhà cung cấp.
- **Bảo trì phần cứng máy chủ và thiết bị mạng** (Sai): Nhà cung cấp lo phần hạ tầng vật lý.
