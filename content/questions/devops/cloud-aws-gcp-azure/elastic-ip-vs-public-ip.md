---
id: elastic-ip-vs-public-ip
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [networking, ec2, aws]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Elastic IP khác gì với Public IP tự động cấp cho EC2? Khi nào cần dùng Elastic IP?

## Question (EN)
How does an Elastic IP differ from the auto-assigned Public IP on EC2? When do you need an Elastic IP?

## Đáp án chi tiết (VI)
| Đặc điểm | Public IP (tự động) | Elastic IP |
|---|---|---|
| Tính cố định | **Thay đổi** mỗi khi stop/start instance | **Cố định** cho tới khi bạn giải phóng (release) |
| Chi phí | Miễn phí khi instance đang chạy | Miễn phí khi đang gắn vào instance running; **tính phí nếu không gắn** hoặc gắn vào instance stopped |
| Số lượng | 1 IP/instance, tự động cấp nếu subnet cho phép | Đăng ký thủ công, có thể gắn/gỡ linh hoạt giữa các instance |
| Use case | Instance tạm thời, test, không cần IP cố định | Cần domain/DNS trỏ cố định, cần whitelist IP ở firewall đối tác |

**Vấn đề thực tế Elastic IP giải quyết:** giả sử EC2 instance bị crash, bạn cần thay bằng instance mới nhanh chóng. Nếu dùng Public IP tự động, IP mới sẽ khác — mọi DNS record, whitelist firewall của đối tác trỏ IP cũ đều phải cập nhật lại tay, gây downtime. Với Elastic IP, bạn chỉ cần **re-associate** IP đó sang instance mới, DNS/whitelist không đổi.

**Ví dụ (AWS CLI):**
```bash
# Cấp Elastic IP
aws ec2 allocate-address --domain vpc

# Gắn vào instance
aws ec2 associate-address --instance-id i-0abcd1234 --allocation-id eipalloc-0123456789

# Khi instance cũ chết, gắn sang instance mới
aws ec2 associate-address --instance-id i-0newinstance --allocation-id eipalloc-0123456789
```

**Gotcha:** AWS tính phí (hourly) cho Elastic IP **không được gắn vào bất kỳ resource nào đang chạy** — nhiều team quên release Elastic IP dư thừa sau khi xóa instance, tích lũy thành chi phí nhỏ nhưng dai dẳng trong billing.

## Detailed Answer (EN)
| Feature | Auto-assigned Public IP | Elastic IP |
|---|---|---|
| Persistence | **Changes** every time the instance is stopped/started | **Fixed** until you explicitly release it |
| Cost | Free while the instance is running | Free while attached to a running instance; **billed** if unattached or attached to a stopped instance |
| Quantity | 1 per instance, auto-assigned if the subnet allows it | Manually allocated, can be attached/detached flexibly between instances |
| Use case | Temporary/test instances, no need for a fixed IP | Need a domain/DNS pointing to a fixed IP, need to be allowlisted on a partner's firewall |

**Real-world problem Elastic IP solves:** suppose an EC2 instance crashes and you need to quickly replace it with a new one. With an auto-assigned Public IP, the new instance gets a different IP — every DNS record and partner firewall allowlist pointing at the old IP must be manually updated, causing downtime. With an Elastic IP, you simply **re-associate** it to the new instance; DNS and allowlists stay unchanged.

**Example (AWS CLI):**
```bash
# Allocate an Elastic IP
aws ec2 allocate-address --domain vpc

# Attach to an instance
aws ec2 associate-address --instance-id i-0abcd1234 --allocation-id eipalloc-0123456789

# When the old instance dies, re-attach to a new one
aws ec2 associate-address --instance-id i-0newinstance --allocation-id eipalloc-0123456789
```

**Pitfall:** AWS charges (hourly) for an Elastic IP that is **not attached to any running resource** — teams often forget to release leftover Elastic IPs after deleting an instance, quietly accumulating small but persistent charges on the bill.
