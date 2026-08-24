---
id: quiz-aws-cloud-kieu-mua-ec2-nao-re-nhat-nhung-co-the-bi-thu-hoi-may-gia-chung
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểu mua EC2 nào rẻ nhất nhưng có thể bị thu hồi máy giữa chừng?

## Đáp án trắc nghiệm
- [ ] Reserved Instance
- [ ] On-Demand
- [ ] Dedicated Host
- [x] Spot Instance

## Giải thích (VI)
Spot Instance — dùng năng lực dư của AWS nên rẻ hơn On-Demand rất nhiều, đổi lại có thể bị thu hồi khi AWS cần lại (có thông báo trước vài phút). Phù hợp cho việc chịu được gián đoạn: xử lý theo lô, render, huấn luyện mô hình, môi trường kiểm thử.

### Giải thích các phương án:
- **Reserved Instance** (Sai): Cam kết dài hạn để lấy chiết khấu, không bị thu hồi.
- **On-Demand** (Sai): Trả theo giờ dùng, không bị thu hồi, nhưng đắt nhất.
- **Dedicated Host** (Sai): Máy chủ vật lý riêng, đắt nhất trong các lựa chọn.
- **Spot Instance** (Đúng): Dùng năng lực dư nên rất rẻ, đổi lại có thể bị thu hồi khi AWS cần.
