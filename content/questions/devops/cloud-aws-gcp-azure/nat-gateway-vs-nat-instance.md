---
id: nat-gateway-vs-nat-instance
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [vpc, networking, cost]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
NAT Gateway và NAT Instance khác nhau như thế nào? Đánh đổi giữa chúng là gì?

## Question (EN)
How do NAT Gateway and NAT Instance differ? What are the trade-offs between them?

## Đáp án chi tiết (VI)
Cả hai đều cho phép instance trong **private subnet** truy cập internet (outbound only) mà không lộ IP nội bộ, nhưng khác nhau về vận hành:

| Tiêu chí | NAT Gateway (managed) | NAT Instance (EC2 tự quản lý) |
|---|---|---|
| Vận hành | AWS quản lý hoàn toàn, không cần patch | Tự quản lý như 1 EC2 bình thường |
| High Availability | HA trong 1 AZ (built-in); cần 1 NAT GW/AZ để HA đa AZ | Tự dựng HA (Auto Scaling + script failover), phức tạp |
| Băng thông | Tự động scale tới 100 Gbps | Giới hạn theo instance type đã chọn |
| Chi phí | Phí theo giờ + phí per-GB xử lý (khá cao ở scale lớn) | Chỉ trả tiền EC2 instance — rẻ hơn ở tải thấp |
| Security Group | Không áp dụng SG trực tiếp (dùng NACL) | Có thể áp SG linh hoạt, dễ custom rule |
| Use case | Mặc định khuyến nghị cho production | Traffic thấp, muốn tiết kiệm, hoặc cần custom logic (proxy, packet inspection) |

**Ví dụ chi phí thực tế:** NAT Gateway ~$0.045/giờ + $0.045/GB xử lý (tùy region) — với traffic outbound lớn (ví dụ service gọi API bên thứ 3 liên tục, pull image Docker lớn), chi phí NAT Gateway có thể vượt xa chi phí compute. Một pattern tối ưu chi phí: dùng **VPC Endpoint (Gateway/Interface)** cho traffic tới AWS service (S3, DynamoDB, ECR...) để traffic đó **không đi qua NAT Gateway** (miễn phí hoặc rẻ hơn nhiều với Gateway Endpoint).

**Terraform ví dụ tối ưu — thêm S3 Gateway Endpoint để giảm traffic qua NAT:**
```hcl
resource "aws_vpc_endpoint" "s3" {
  vpc_id       = aws_vpc.main.id
  service_name = "com.amazonaws.ap-southeast-1.s3"
  route_table_ids = [aws_route_table.private.id]
}
```

**Khi nào vẫn cân nhắc NAT Instance:** môi trường dev/test cần tiết kiệm chi phí tối đa, hoặc cần logic custom (ví dụ traffic shaping, proxy filter domain) mà NAT Gateway không hỗ trợ — nhưng đánh đổi là phải tự chịu trách nhiệm vận hành, patching, và nó là **single point of failure** nếu không tự dựng HA.

**Gotcha:** NAT Instance mặc định EC2 có **source/destination check** bật — phải **tắt** check này (`disable_source_dest_check`) thì NAT Instance mới forward được traffic hộ instance khác, đây là lỗi cấu hình rất phổ biến khi tự dựng NAT Instance.

## Detailed Answer (EN)
Both let instances in a **private subnet** reach the internet (outbound only) without exposing their internal IPs, but differ operationally:

| Criteria | NAT Gateway (managed) | NAT Instance (self-managed EC2) |
|---|---|---|
| Operations | Fully managed by AWS, no patching needed | Self-managed like any regular EC2 instance |
| High Availability | Built-in HA within an AZ; need 1 NAT GW per AZ for multi-AZ HA | Must build your own HA (Auto Scaling + failover scripts), complex |
| Bandwidth | Auto-scales up to 100 Gbps | Limited by the chosen instance type |
| Cost | Hourly + per-GB processed fee (can get expensive at scale) | Only pay for the EC2 instance — cheaper at low traffic |
| Security Group | No direct SG (uses NACL) | Can apply SGs flexibly, easy to customize rules |
| Use case | Recommended default for production | Low traffic, cost-sensitive, or needs custom logic (proxy, packet inspection) |

**Real cost example:** NAT Gateway costs roughly $0.045/hour + $0.045/GB processed (region-dependent) — for heavy outbound traffic (e.g. a service constantly calling a third-party API, or pulling large Docker images), NAT Gateway costs can dwarf compute costs. A common cost-optimization pattern: use a **VPC Endpoint (Gateway/Interface)** for traffic to AWS services (S3, DynamoDB, ECR, etc.) so that traffic **bypasses the NAT Gateway entirely** (free or much cheaper via a Gateway Endpoint).

**Terraform example — adding an S3 Gateway Endpoint to reduce NAT traffic:**
```hcl
resource "aws_vpc_endpoint" "s3" {
  vpc_id       = aws_vpc.main.id
  service_name = "com.amazonaws.ap-southeast-1.s3"
  route_table_ids = [aws_route_table.private.id]
}
```

**When NAT Instance might still make sense:** dev/test environments needing maximum cost savings, or custom logic (e.g. traffic shaping, domain-filtering proxy) that NAT Gateway doesn't support — but the trade-off is you're responsible for operations, patching, and it becomes a **single point of failure** unless you build HA yourself.

**Pitfall:** EC2 instances have **source/destination check** enabled by default — you must **disable** this (`disable_source_dest_check`) for a NAT Instance to forward traffic on behalf of other instances; this is a very common misconfiguration when self-hosting a NAT Instance.
