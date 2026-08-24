---
id: quiz-aws-cloud-cloudfront-duoc-dung-de-lam-gi
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CloudFront được dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Phân giải tên miền thành địa chỉ IP
- [ ] Phân tải giữa các máy chủ trong cùng một vùng
- [ ] Lưu trữ tệp tĩnh thay cho S3
- [x] Phân phối nội dung qua mạng biên

## Giải thích (VI)
Là mạng phân phối nội dung (CDN) : lưu bản sao nội dung ở các điểm biên gần người dùng, nên giảm độ trễ và giảm tải cho hạ tầng gốc. Thường đặt trước S3 hoặc trước load balancer.

### Giải thích các phương án:
- **Phân giải tên miền thành địa chỉ IP** (Sai): Đó là Route 53.
- **Phân tải giữa các máy chủ trong cùng một vùng** (Sai): Đó là công việc của load balancer.
- **Lưu trữ tệp tĩnh thay cho S3** (Sai): CloudFront phân phối nội dung, còn nơi lưu vẫn là gốc như S3.
- **Phân phối nội dung qua mạng biên** (Đúng): Cache nội dung ở điểm biên nên giảm độ trễ và giảm tải cho gốc.
