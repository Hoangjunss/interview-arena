---
id: quiz-aws-cloud-security-group-trong-vpc-hoat-dong-the-nao
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Security group trong VPC hoạt động thế nào?

## Đáp án trắc nghiệm
- [ ] Chỉ lọc lưu lượng đi ra, không lọc lưu lượng vào
- [ ] Áp dụng cho toàn bộ VPC, không gắn riêng từng tài nguyên
- [x] Có trạng thái, chỉ có luật cho phép
- [ ] Không trạng thái, có cả luật cho phép và từ chối

## Giải thích (VI)
Có trạng thái (stateful) — cho phép kết nối vào thì trả lời tự động đi ra được, không cần luật riêng. Chỉ có luật cho phép , không có luật từ chối. Gắn ở cấp tài nguyên (EC2, RDS, load balancer), không phải cấp subnet.

### Giải thích các phương án:
- **Chỉ lọc lưu lượng đi ra, không lọc lưu lượng vào** (Sai): Lọc được cả hai chiều.
- **Áp dụng cho toàn bộ VPC, không gắn riêng từng tài nguyên** (Sai): Security group gắn vào từng tài nguyên như EC2 hay RDS.
- **Có trạng thái, chỉ có luật cho phép** (Đúng): Trả lời cho kết nối đã được phép sẽ tự động đi ra được.
- **Không trạng thái, có cả luật cho phép và từ chối** (Sai): Đó là network ACL, hoạt động ở cấp subnet.
