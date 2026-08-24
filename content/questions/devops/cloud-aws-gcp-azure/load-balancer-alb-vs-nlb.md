---
id: load-balancer-alb-vs-nlb
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [load-balancer, networking, aws]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ALB (Application Load Balancer) và NLB (Network Load Balancer) khác nhau như thế nào? Khi nào dùng loại nào?

## Question (EN)
How do ALB (Application Load Balancer) and NLB (Network Load Balancer) differ? When should you use each?

## Đáp án chi tiết (VI)
| Đặc điểm | ALB | NLB |
|---|---|---|
| Tầng OSI | Layer 7 (HTTP/HTTPS/gRPC) | Layer 4 (TCP/UDP/TLS) |
| Routing | Theo path, host header, header, query string | Theo IP/port, không hiểu nội dung request |
| Hiệu năng | Đủ dùng cho hầu hết web app | **Cực thấp latency**, throughput rất cao, chịu triệu request/giây |
| Static IP | Không (dùng DNS name) | Có (Elastic IP cố định mỗi AZ) |
| Use case điển hình | Web app, microservices routing theo path (`/api/*`, `/admin/*`) | Gaming, IoT, traffic cần static IP whitelist, hoặc traffic TCP thuần không phải HTTP |
| WebSocket | Hỗ trợ | Hỗ trợ (tốt hơn cho low-latency) |
| Sticky session | Có (cookie-based) | Có (theo source IP) |

**Ví dụ routing theo path với ALB (Terraform rút gọn):**
```hcl
resource "aws_lb_listener_rule" "api" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 10
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}
```

**Khi nào chọn NLB thay vì ALB:**
- Cần **static IP** để đối tác whitelist firewall.
- Traffic không phải HTTP (ví dụ giao thức nhắn tin nội bộ qua TCP thuần).
- Cần latency cực thấp và throughput cực cao (NLB xử lý ở network layer, gần như không thêm overhead).
- Cần preserve source IP của client tới tận backend (NLB giữ nguyên, ALB cần đọc header `X-Forwarded-For`).

**Gotcha:** nhầm lẫn phổ biến là dùng NLB cho web app thông thường rồi mất khả năng routing theo path/host — muốn có cả routing layer 7 lẫn static IP thì phải kết hợp NLB (frontend) → ALB (backend) qua target group loại `alb`, một kiến trúc khá phổ biến khi cần cả hai.

## Detailed Answer (EN)
| Feature | ALB | NLB |
|---|---|---|
| OSI layer | Layer 7 (HTTP/HTTPS/gRPC) | Layer 4 (TCP/UDP/TLS) |
| Routing | By path, host header, headers, query string | By IP/port, doesn't inspect request content |
| Performance | Sufficient for most web apps | **Ultra-low latency**, very high throughput, handles millions of requests/sec |
| Static IP | No (DNS name) | Yes (Elastic IP fixed per AZ) |
| Typical use case | Web apps, microservice routing by path (`/api/*`, `/admin/*`) | Gaming, IoT, traffic requiring static IP allowlisting, or pure TCP (non-HTTP) traffic |
| WebSocket | Supported | Supported (better for low-latency) |
| Sticky sessions | Yes (cookie-based) | Yes (source-IP based) |

**Example path-based routing with ALB (abbreviated Terraform):**
```hcl
resource "aws_lb_listener_rule" "api" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 10
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}
```

**When to choose NLB over ALB:**
- You need a **static IP** for a partner to allowlist on their firewall.
- Traffic isn't HTTP (e.g. an internal messaging protocol over raw TCP).
- You need ultra-low latency and very high throughput (NLB operates at the network layer with near-zero added overhead).
- You need to preserve the client's real source IP all the way to the backend (NLB preserves it natively; ALB requires reading the `X-Forwarded-For` header).

**Pitfall:** a common mistake is using NLB for a typical web app and losing path/host-based routing — if you need both L7 routing and a static IP, chain NLB (frontend) → ALB (backend) via an `alb`-type target group, a fairly common architecture when both are required.
