---
id: vpc-peering-vs-transit-gateway
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [vpc, networking, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
VPC Peering và Transit Gateway khác nhau như thế nào? Khi nào Peering không còn phù hợp và cần chuyển sang Transit Gateway?

## Question (EN)
How do VPC Peering and Transit Gateway differ? When does Peering stop being suitable and you need to move to Transit Gateway?

## Đáp án chi tiết (VI)
**VPC Peering:** kết nối **point-to-point** giữa 2 VPC (cùng hoặc khác account/region), cho phép traffic đi qua như thể cùng mạng, dùng private IP.

**Transit Gateway (TGW):** một **hub trung tâm** kết nối nhiều VPC, VPN, Direct Connect lại với nhau — thay vì phải tạo peering riêng lẻ giữa từng cặp VPC.

**Vấn đề của Peering khi số lượng VPC tăng:**
- Peering **không bắc cầu (non-transitive)**: nếu VPC-A peer với VPC-B, và VPC-B peer với VPC-C, thì VPC-A **không** tự động thấy VPC-C — phải tạo peering riêng A-C.
- Với N VPC cần kết nối full-mesh, cần **N(N-1)/2 peering connection** — với 10 VPC là 45 connection, quản lý route table cực kỳ phức tạp và dễ lỗi.

**Transit Gateway giải quyết bằng mô hình hub-and-spoke:**
```
        VPC-A          VPC-B
           \            /
            \          /
          Transit Gateway (hub)
            /          \
           /            \
        VPC-C      On-prem (VPN/Direct Connect)
```
Mỗi VPC chỉ cần 1 attachment tới TGW — N VPC chỉ cần N attachment thay vì N(N-1)/2 connection.

**Bảng so sánh:**
| Tiêu chí | VPC Peering | Transit Gateway |
|---|---|---|
| Mô hình | Point-to-point | Hub-and-spoke |
| Transitive routing | Không | Có |
| Số kết nối cần với N VPC | N(N-1)/2 | N |
| Chi phí | Miễn phí (chỉ tính data transfer) | Phí theo attachment + data processing |
| Băng thông | Không giới hạn cứng | Có giới hạn per-attachment (~50 Gbps mỗi VPC attachment) |
| Route table | Quản lý thủ công từng peering | Centralized route table trên TGW, dễ segment (route domain riêng cho từng nhóm VPC) |
| On-premise connectivity | Không hỗ trợ trực tiếp | Tích hợp thẳng với Direct Connect/VPN |

**Khi nào chuyển từ Peering sang TGW:**
- Số lượng VPC cần kết nối > 4-5 và có xu hướng tăng (kiến trúc microservices nhiều team, mỗi team 1 VPC).
- Cần **network segmentation** rõ ràng (ví dụ VPC prod không được thấy VPC dev) — TGW route table hỗ trợ điều này tốt hơn nhiều so với việc tự quản lý peering + route table riêng lẻ.
- Cần kết nối on-premise (VPN/Direct Connect) chia sẻ cho nhiều VPC cùng lúc.

**Gotcha:** nhiều đội chuyển sang TGW nhưng quên rằng TGW **tính phí theo GB xử lý qua nó** (khác Peering miễn phí phần này) — với traffic nội bộ rất lớn giữa 2 VPC cố định, đôi khi giữ nguyên 1 Peering connection riêng cho cặp đó lại rẻ hơn so với route qua TGW.

## Detailed Answer (EN)
**VPC Peering:** a **point-to-point** connection between two VPCs (same or different account/region), letting traffic flow as if on the same network, using private IPs.

**Transit Gateway (TGW):** a **central hub** connecting multiple VPCs, VPNs, and Direct Connect links — instead of creating individual peering connections between every pair of VPCs.

**Peering's problem as the VPC count grows:**
- Peering is **non-transitive**: if VPC-A peers with VPC-B, and VPC-B peers with VPC-C, VPC-A does **not** automatically reach VPC-C — a separate A-C peering is required.
- For N VPCs needing full-mesh connectivity, you need **N(N-1)/2 peering connections** — 45 connections for 10 VPCs, making route table management extremely complex and error-prone.

**Transit Gateway solves this with a hub-and-spoke model:**
```
        VPC-A          VPC-B
           \            /
            \          /
          Transit Gateway (hub)
            /          \
           /            \
        VPC-C      On-prem (VPN/Direct Connect)
```
Each VPC only needs one attachment to the TGW — N VPCs need only N attachments instead of N(N-1)/2 connections.

**Comparison:**
| Criteria | VPC Peering | Transit Gateway |
|---|---|---|
| Model | Point-to-point | Hub-and-spoke |
| Transitive routing | No | Yes |
| Connections needed for N VPCs | N(N-1)/2 | N |
| Cost | Free (only data transfer billed) | Billed per attachment + data processing |
| Bandwidth | No hard limit | Per-attachment limit (~50 Gbps per VPC attachment) |
| Route table | Manually managed per peering | Centralized route table on TGW, easier to segment (separate route domains per VPC group) |
| On-premise connectivity | No direct support | Integrates directly with Direct Connect/VPN |

**When to move from Peering to TGW:**
- The number of VPCs needing connectivity exceeds 4-5 and keeps growing (microservices architecture with many teams, each with its own VPC).
- Clear **network segmentation** is needed (e.g. prod VPC must not see dev VPC) — TGW route tables handle this far better than manually managing separate peerings + route tables.
- On-premise connectivity (VPN/Direct Connect) needs to be shared across multiple VPCs at once.

**Pitfall:** many teams migrate to TGW but forget it **bills per GB processed through it** (unlike Peering, which doesn't charge for this) — for very high-volume traffic between a fixed pair of VPCs, keeping a dedicated Peering connection for that pair can sometimes be cheaper than routing through TGW.
