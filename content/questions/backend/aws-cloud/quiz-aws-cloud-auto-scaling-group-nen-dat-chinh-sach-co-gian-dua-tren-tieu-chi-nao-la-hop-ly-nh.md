---
id: quiz-aws-cloud-auto-scaling-group-nen-dat-chinh-sach-co-gian-dua-tren-tieu-chi-nao-la-hop-ly-nh
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Auto Scaling Group nên đặt chính sách co giãn dựa trên tiêu chí nào là hợp lý nhất cho một API web?

## Đáp án trắc nghiệm
- [x] Chỉ số phản ánh tải thật của ứng dụng
- [ ] Số kết nối đang mở tới cơ sở dữ liệu
- [ ] Lịch cố định theo giờ hành chính mỗi ngày
- [ ] Dung lượng ổ đĩa còn trống trên mỗi máy

## Giải thích (VI)
Dựa trên chỉ số phản ánh tải thật : số yêu cầu trên mỗi máy hoặc CPU trung bình, thường dùng chính sách bám mục tiêu (target tracking). Có thể kết hợp co giãn theo lịch cho các mốc tải biết trước như giờ mở bán.

### Giải thích các phương án:
- **Chỉ số phản ánh tải thật của ứng dụng** (Đúng): Bám sát nhu cầu thực tế hơn là các chỉ số gián tiếp.
- **Số kết nối đang mở tới cơ sở dữ liệu** (Sai): Là chỉ số hệ quả và dễ gây co giãn sai hướng.
- **Lịch cố định theo giờ hành chính mỗi ngày** (Sai): Hữu ích khi tải rất đều nhưng không xử lý được đột biến.
- **Dung lượng ổ đĩa còn trống trên mỗi máy** (Sai): Gần như không liên quan tới tải của API.
