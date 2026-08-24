---
id: cho-ec2-o-private-subnet-ra-internet-nat-gateway-va-nat-instance-khac-nhau-ra-sa
position: backend
technology: networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cho EC2 ở private subnet ra internet: NAT Gateway và NAT instance khác nhau ra sao?

## Question (EN)
To give an EC2 instance in a private subnet internet access: how do a NAT Gateway and a NAT instance differ?

## Đáp án chi tiết (VI)
Instance trong private subnet không có route trực tiếp ra internet. Để nó **gọi ra ngoài** (tải update, gọi API) mà **không nhận kết nối vào**, traffic phải đi qua một NAT đặt ở public subnet. Có hai cách:\
\
**NAT Gateway** — dịch vụ managed của AWS:\
- AWS lo scaling (tự co giãn tới hàng chục Gbps), tính sẵn sàng và vá lỗi.\
- **Có độ dự phòng trong một AZ**, nhưng gắn với một AZ duy nhất → muốn chịu lỗi thì tạo NAT Gateway ở **mỗi AZ**.\
- Tính phí theo giờ + theo GB xử lý. Không thể dùng làm bastion, không gắn Security Group.\
\
**NAT instance** — một EC2 do bạn tự vận hành, bật IP forwarding:\
- Bạn tự chịu patch, tự scale, tự lo HA (là single point of failure nếu chỉ có một).\
- Rẻ hơn ở lưu lượng nhỏ và **linh hoạt hơn**: gắn được Security Group, kiêm bastion, tùy biến port forwarding.\
\
**Chốt:** production gần như luôn chọn **NAT Gateway** vì đỡ vận hành và bền hơn; NAT instance chỉ hợp cho môi trường dev/lab, chi phí cực thấp, hoặc khi cần một tính năng đặc thù NAT Gateway không có.

## Detailed Answer (EN)
$7c
