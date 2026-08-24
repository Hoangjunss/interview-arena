---
id: quiz-aws-cloud-d-lieu-nhat-ky-can-gi-5-nam-nhung-gan-nhu-khong-bao-gio-truy-cap-lai-lop-luu-tr
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dữ liệu nhật ký cần giữ 5 năm nhưng gần như không bao giờ truy cập lại. Lớp lưu trữ S3 nào hợp lý nhất?

## Đáp án trắc nghiệm
- [ ] S3 Standard cho truy cập thường
- [ ] S3 Standard-IA cho truy cập thưa
- [x] S3 Glacier Deep Archive
- [ ] S3 One Zone-IA giá rẻ hơn

## Giải thích (VI)
Dùng lớp archive (Glacier Flexible Retrieval hoặc Deep Archive tùy mức độ chấp nhận chờ khi lấy ra). Cách làm chuẩn là đặt lifecycle policy tự chuyển object sang lớp lạnh dần theo tuổi, thay vì chọn tay từng tệp.

### Giải thích các phương án:
- **S3 Standard cho truy cập thường** (Sai): Đắt nhất cho dữ liệu gần như không đọc.
- **S3 Standard-IA cho truy cập thưa** (Sai): Rẻ hơn Standard nhưng vẫn đắt hơn nhiều so với archive cho dữ liệu 5 năm.
- **S3 Glacier Deep Archive** (Đúng): Chi phí lưu rẻ nhất, đổi lại phí và thời gian khi cần lấy ra.
- **S3 One Zone-IA giá rẻ hơn** (Sai): Rẻ hơn nhưng chỉ nằm ở một AZ, rủi ro cho dữ liệu phải giữ lâu.
