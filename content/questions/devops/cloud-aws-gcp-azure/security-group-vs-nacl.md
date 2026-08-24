---
id: security-group-vs-nacl
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [networking, security, vpc]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Security Group và Network ACL trong AWS. Tại sao cần cả hai?

## Question (EN)
Differentiate Security Group and Network ACL in AWS. Why do you need both?

## Đáp án chi tiết (VI)
| Đặc điểm | Security Group (SG) | Network ACL (NACL) |
|---|---|---|
| Phạm vi áp dụng | Gắn vào **instance/ENI** | Gắn vào **subnet** |
| Trạng thái | **Stateful** — traffic trả về tự động được phép | **Stateless** — phải khai báo rule cả 2 chiều (inbound/outbound) |
| Loại rule | Chỉ **Allow** | **Allow** và **Deny** |
| Thứ tự xử lý rule | Không có thứ tự, đánh giá tất cả rule | Có **số thứ tự (rule number)**, xử lý từ nhỏ đến lớn, dừng ở rule đầu tiên khớp |
| Mặc định | Deny tất cả inbound, allow tất cả outbound | Allow tất cả (default NACL) |

**Ví dụ minh họa sự khác biệt "stateful vs stateless":**
Nếu client bên ngoài gửi request đến EC2 qua port 443:
- Với **SG**: chỉ cần rule inbound cho phép port 443, response trả về tự động được allow (không cần rule outbound riêng).
- Với **NACL**: cần rule inbound cho phép port 443 **VÀ** rule outbound cho phép **ephemeral port** (thường 1024-65535) để response đi ra được — quên rule outbound này là lỗi rất phổ biến khiến "connection timeout" dù SG đã đúng.

**Tại sao cần cả hai (defense in depth):**
- SG bảo vệ ở mức instance, linh hoạt, dễ quản lý theo ứng dụng.
- NACL bảo vệ ở mức subnet, hữu ích để **block nhanh một dải IP xấu** (ví dụ IP đang tấn công) áp dụng ngay cho cả subnet mà không cần sửa từng SG — vì NACL hỗ trợ explicit Deny còn SG thì không.

**Gotcha:** đa số production workload chỉ cần tùy chỉnh SG, để NACL ở default (allow all) — over-engineering NACL rule phức tạp dễ gây lỗi khó debug vì tính chất stateless và thứ tự rule.

## Detailed Answer (EN)
| Feature | Security Group (SG) | Network ACL (NACL) |
|---|---|---|
| Applies to | **Instance/ENI** level | **Subnet** level |
| State | **Stateful** — return traffic automatically allowed | **Stateless** — must declare rules for both directions |
| Rule types | **Allow** only | **Allow** and **Deny** |
| Rule evaluation | No order, all rules evaluated | **Numbered rules**, evaluated in ascending order, stops at first match |
| Default | Deny all inbound, allow all outbound | Allow all (default NACL) |

**Illustrating "stateful vs stateless":**
If an external client sends a request to an EC2 instance on port 443:
- With **SG**: only an inbound rule allowing port 443 is needed; the response is automatically allowed back out (no separate outbound rule needed).
- With **NACL**: you need an inbound rule for port 443 **AND** an outbound rule allowing the **ephemeral port range** (typically 1024-65535) so the response can leave — forgetting this outbound rule is a very common cause of "connection timeout" even when the SG is correctly configured.

**Why you need both (defense in depth):**
- SGs protect at the instance level, flexible and easy to manage per application.
- NACLs protect at the subnet level, useful for **quickly blocking a malicious IP range** (e.g. during an attack) applied instantly to the entire subnet without touching individual SGs — because NACLs support explicit Deny while SGs don't.

**Pitfall:** most production workloads only need to customize SGs and leave NACLs at default (allow all) — over-engineering complex NACL rules is a common source of hard-to-debug issues due to statelessness and rule ordering.
