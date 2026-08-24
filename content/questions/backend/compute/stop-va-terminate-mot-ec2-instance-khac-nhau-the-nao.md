---
id: stop-va-terminate-mot-ec2-instance-khac-nhau-the-nao
position: backend
technology: compute
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Stop và Terminate một EC2 instance khác nhau thế nào?

## Question (EN)
What is the difference between stopping and terminating an EC2 instance?

## Đáp án chi tiết (VI)
**Stop** là tạm dừng, **Terminate** là xóa vĩnh viễn.\
\
**Stop** (chỉ áp dụng cho instance dùng EBS làm root):\
- Instance tắt như tắt máy tính; **root EBS volume được giữ lại**, nên dữ liệu trên đó còn nguyên khi start lại.\
- Không tính phí compute khi dừng, nhưng **vẫn trả phí lưu trữ EBS**.\
- Khi start lại thường đổi sang host vật lý khác: **public IP (auto-assign) thay đổi**, dữ liệu trên **instance store bị mất**, private IP giữ nguyên.\
\
**Terminate:**\
- Instance bị xóa hẳn, không thể start lại — muốn dùng lại phải launch instance mới.\
- Root EBS volume mặc định bị xóa theo (`DeleteOnTermination = true`), trừ khi bạn đã tắt cờ này.\
- Elastic IP bị gỡ liên kết (disassociate) nhưng **vẫn được cấp cho tài khoản** (vẫn tính phí khi không gắn) — không tự release; instance store mất hoàn toàn.\
\
**Hình dung:** Stop giống tắt laptop rồi bật lại — ổ cứng còn đó. Terminate giống vứt bỏ máy — mọi thứ không được sao lưu ngoài đều biến mất. Muốn giữ dữ liệu trước khi terminate thì tạo snapshot/AMI.

## Detailed Answer (EN)
$86
