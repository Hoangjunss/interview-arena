---
id: layer4-vs-layer7-load-balancing
position: devops
technology: linux-networking-ops
level: senior
tags: [load-balancing, networking, architecture, scaling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh load balancing ở Layer 4 và Layer 7. Khi nào bạn sẽ chọn kiến trúc L4 trước L7 (ví dụ AWS NLB đứng trước ALB) thay vì chỉ dùng L7 đơn thuần?

## Question (EN)
Compare Layer 4 and Layer 7 load balancing. When would you choose an L4-in-front-of-L7 architecture (e.g. AWS NLB in front of ALB) instead of a pure L7 setup?

## Đáp án chi tiết (VI)
**Load balancing Layer 4 (transport layer)**: cân bằng tải dựa trên thông tin IP/TCP/UDP (source IP, dest IP, port) mà **không đọc nội dung** của request (payload/HTTP header). LB chỉ forward gói tin (thường bằng NAT hoặc direct routing) tới backend đã chọn, dựa trên thuật toán như round-robin hoặc hash theo 5-tuple (`src_ip, src_port, dst_ip, dst_port, protocol`).

**Load balancing Layer 7 (application layer)**: LB đóng vai trò **proxy đầy đủ**, terminate kết nối TCP từ client, đọc và hiểu nội dung HTTP (header, path, cookie, method), sau đó **mở kết nối TCP mới riêng** tới backend đã chọn. Vì hiểu được nội dung, L7 LB có thể routing theo path (`/api` → service A), theo header, sticky session theo cookie, retry logic, hay circuit breaking.

| Tiêu chí | L4 | L7 |
|---|---|---|
| Hiểu nội dung request | Không | Có |
| Hiệu năng/throughput | Rất cao (ít CPU, không cần buffer nội dung) | Thấp hơn L4 (parse HTTP, giữ 2 kết nối TCP riêng biệt cho mỗi request) |
| Routing thông minh (path/header) | Không | Có |
| TLS termination | Thường không (passthrough) | Có |
| Chịu tải connection spike | Tốt hơn (ít state phải giữ) | Cần nhiều tài nguyên hơn khi connection tăng đột biến |
| Ví dụ | AWS NLB, LVS/IPVS, HAProxy tcp mode | AWS ALB, Nginx (http), Envoy, HAProxy http mode |

**Vì sao đặt L4 (NLB) trước L7 (ALB)** thay vì để L7 nhận trực tiếp traffic từ internet — các lý do thực tế trong kiến trúc lớn:

1. **Static IP / Elastic IP cho whitelist**: NLB hỗ trợ gán IP tĩnh cố định cho mỗi AZ — cần thiết khi đối tác/khách hàng yêu cầu **IP whitelist cố định** để mở firewall, điều mà ALB (chỉ có DNS name, IP thay đổi) không đáp ứng được trực tiếp.

2. **Chịu được DDoS/connection flood tốt hơn**: NLB hoạt động ở L4, không cần terminate TLS hay giữ state HTTP, nên có thể xử lý hàng triệu kết nối/giây với chi phí tài nguyên thấp hơn nhiều so với để L7 chịu trực tiếp — dùng như lớp "hấp thụ" traffic bùng nổ trước khi vào L7 xử lý logic phức tạp hơn.

3. **Preserve source IP dễ dàng hơn ở một số kiến trúc**: NLB có thể giữ nguyên source IP của client tới tận backend (tùy chế độ), quan trọng khi ứng dụng cần biết IP thật của client (rate limiting theo IP, geo-blocking) mà không phải parse `X-Forwarded-For` (vốn có thể bị giả mạo nếu không cấu hình đúng trust boundary).

4. **Hỗ trợ protocol không phải HTTP**: NLB xử lý được TCP/UDP thuần (ví dụ gRPC streaming dài, MQTT, custom TCP protocol), trong khi một số ALB/L7 LB tối ưu chủ yếu cho HTTP/HTTPS request-response ngắn.

5. **Multi-tenancy/cross-account traffic**: NLB hỗ trợ PrivateLink để expose service qua nhiều account/VPC an toàn hơn so với expose trực tiếp ALB.

**Đánh đổi khi thêm lớp L4 trước L7**: thêm 1 hop network (latency nhỏ tăng thêm), thêm 1 điểm cấu hình/monitoring, và **mất khả năng routing thông minh ở lớp ngoài cùng** — routing theo path/header chỉ có thể xảy ra ở lớp L7 phía sau, nên với hệ thống đơn giản (1 domain, ít route phức tạp, không cần whitelist IP tĩnh, traffic không quá lớn) thì dùng thẳng L7 (ALB/Nginx) là đủ và đơn giản hơn để vận hành.

**Câu trả lời tóm gọn cho interviewer**: chọn L4-trước-L7 khi cần **static IP, khả năng chịu tải connection cực lớn, hoặc hỗ trợ non-HTTP protocol**; giữ thuần L7 khi ưu tiên **routing linh hoạt và đơn giản vận hành**, và hệ thống chưa cần các yêu cầu đặc thù ở trên.

## Detailed Answer (EN)
**Layer 4 (transport layer) load balancing**: distributes traffic based on IP/TCP/UDP information (source IP, destination IP, port) **without reading request content** (payload/HTTP headers). The LB simply forwards packets (usually via NAT or direct routing) to a chosen backend, using algorithms like round-robin or a hash of the 5-tuple (`src_ip, src_port, dst_ip, dst_port, protocol`).

**Layer 7 (application layer) load balancing**: the LB acts as a **full proxy** — it terminates the client's TCP connection, reads and understands HTTP content (headers, path, cookies, method), and then **opens a separate new TCP connection** to the chosen backend. Because it understands the content, an L7 LB can do path-based routing (`/api` → service A), header-based routing, cookie-based sticky sessions, retry logic, and circuit breaking.

| Criterion | L4 | L7 |
|---|---|---|
| Understands request content | No | Yes |
| Performance/throughput | Very high (low CPU, no content buffering) | Lower than L4 (parses HTTP, keeps two separate TCP connections per request) |
| Smart routing (path/header) | No | Yes |
| TLS termination | Usually not (passthrough) | Yes |
| Handling connection spikes | Better (less state to keep) | Needs more resources under connection bursts |
| Examples | AWS NLB, LVS/IPVS, HAProxy TCP mode | AWS ALB, Nginx (http), Envoy, HAProxy HTTP mode |

**Why put L4 (NLB) in front of L7 (ALB)** instead of letting L7 receive internet traffic directly — real reasons seen in large-scale architectures:

1. **Static/Elastic IP for whitelisting**: NLB supports assigning a fixed static IP per AZ — necessary when a partner/client requires a **fixed IP to whitelist** through their firewall, something ALB (only a DNS name, changing IPs) can't directly satisfy.

2. **Better resilience against DDoS/connection floods**: an NLB operates at L4, without terminating TLS or holding HTTP state, so it can handle millions of connections/second at much lower resource cost than exposing L7 directly — used as an "absorption" layer for traffic bursts before more complex L7 logic kicks in.

3. **Easier source IP preservation in some architectures**: NLB can preserve the client's real source IP all the way to the backend (depending on mode) — important when an application needs the real client IP (per-IP rate limiting, geo-blocking) without relying on `X-Forwarded-For`, which can be spoofed if the trust boundary isn't configured correctly.

4. **Support for non-HTTP protocols**: NLB handles raw TCP/UDP (e.g. long-lived gRPC streams, MQTT, custom TCP protocols), whereas some ALB/L7 LBs are optimized primarily for short HTTP request-response cycles.

5. **Multi-tenancy/cross-account traffic**: NLB supports PrivateLink, exposing a service across multiple accounts/VPCs more safely than exposing an ALB directly.

**Trade-offs of adding an L4 layer in front of L7**: one extra network hop (small added latency), one more component to configure/monitor, and **losing smart routing at the outermost layer** — path/header-based routing can only happen at the L7 layer behind it. So for simpler systems (single domain, few complex routes, no need for static IP whitelisting, moderate traffic), a straightforward L7 setup (ALB/Nginx) is simpler to operate and entirely sufficient.

**Interview-ready summary**: choose L4-in-front-of-L7 when you need **static IPs, resilience against massive connection load, or non-HTTP protocol support**; stick with pure L7 when you prioritize **flexible routing and operational simplicity**, and the system doesn't yet need those specific requirements above.
