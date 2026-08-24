---
id: kubernetes-networking-cni
position: devops
technology: kubernetes
level: senior
tags: [kubernetes, networking, cni]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích mô hình mạng của Kubernetes (Kubernetes networking model) và vai trò của CNI plugin. Khi Pod A gọi Pod B khác node, gói tin đi qua những bước nào, và sự khác biệt giữa overlay network (VXLAN) và BGP-based routing (như Calico) ảnh hưởng gì tới hiệu năng/khả năng debug?

## Question (EN)
Explain the Kubernetes networking model and the role of a CNI plugin. When Pod A calls Pod B on a different node, what path does the packet take, and how does the difference between an overlay network (VXLAN) and BGP-based routing (like Calico) affect performance/debuggability?

## Đáp án chi tiết (VI)
**Kubernetes networking model** đặt ra 3 yêu cầu cơ bản (không quy định cách triển khai — đó là việc của CNI plugin):
1. Mọi Pod có **IP riêng, duy nhất trong cluster** (flat network) — không có NAT giữa Pod với Pod.
2. Pod trên bất kỳ node nào cũng **gọi trực tiếp được** Pod trên node khác bằng IP đó, không cần NAT.
3. Node có thể giao tiếp trực tiếp với mọi Pod (và ngược lại) không NAT.

**CNI (Container Network Interface)** là chuẩn interface để kubelet gọi plugin mạng (Calico, Cilium, Flannel, AWS VPC CNI...) thực hiện: cấp IP cho Pod, tạo veth pair nối Pod vào network namespace của node, thiết lập route để thỏa 3 yêu cầu trên.

**Luồng gói tin khi Pod A (node 1) gọi Pod B (node 2) qua Service ClusterIP**:
1. Pod A gửi packet tới ClusterIP:port của Service.
2. Packet đi qua `veth` của Pod A vào network namespace của node 1.
3. **kube-proxy** (đã cấu hình sẵn iptables/IPVS rule từ trước) chặn packet, **DNAT** ClusterIP → Pod IP thực của 1 backend Pod được chọn (round-robin/random tùy chế độ).
4. Packet giờ mang đích là **Pod IP thật của Pod B** — tùy CNI mà được xử lý khác nhau để tới được node 2:
   - **Overlay (VXLAN/Flannel)**: packet gốc được **đóng gói (encapsulate)** trong 1 UDP packet mới (VXLAN header), gửi qua network vật lý tới node 2, node 2 **giải đóng gói (decapsulate)** rồi route vào đúng veth của Pod B.
   - **BGP-based (Calico không dùng overlay)**: mỗi node quảng bá route "Pod CIDR của tôi nằm ở IP node này" qua BGP, router/switch vật lý (hoặc route table cloud VPC) biết cách route thẳng packet gốc tới node 2 **không cần encapsulate** — packet đi native trên mạng vật lý.
5. Tới node 2, packet được route vào veth của Pod B, Pod B nhận và xử lý.

**So sánh ảnh hưởng thực tế — trọng tâm câu hỏi senior**:

| | Overlay (VXLAN) | BGP-based (Calico no-overlay/AWS VPC CNI) |
|---|---|---|
| **Hiệu năng** | Overhead do encapsulate/decapsulate (thêm ~50 byte header, giảm MTU hiệu dụng nếu không cấu hình MTU đúng → fragment ngầm gây latency) | Không overhead encapsulate, tốc độ gần bằng native network |
| **Khả năng debug** | Packet capture (`tcpdump`) trên node **thấy 2 lớp**: outer VXLAN packet và inner Pod packet — khó phân tích hơn, cần decapsulate thủ công hoặc tool hỗ trợ VXLAN-aware | `tcpdump` thấy trực tiếp Pod IP thật trên interface vật lý — dễ trace, tương thích tốt với công cụ network truyền thống (firewall, IDS theo IP) |
| **Yêu cầu hạ tầng** | Không cần hạ tầng mạng vật lý hỗ trợ gì đặc biệt — chạy được trên bất kỳ network nào miễn IP node thông nhau | Cần router/switch hỗ trợ BGP (on-prem) hoặc route table của cloud VPC hỗ trợ được (cloud thường giới hạn số route/instance — VD AWS giới hạn số IP/ENI) |
| **Khả năng mở rộng CIDR** | Linh hoạt, Pod CIDR độc lập với mạng vật lý | Bị ràng buộc bởi giới hạn route table/IP pool của cloud provider |

**Vấn đề MTU kinh điển với overlay**: nếu network vật lý có MTU 1500 mà không giảm MTU trong Pod xuống 1450 (trừ hao VXLAN header 50 byte), packet lớn bị fragment ở tầng IP, gây **tăng latency âm thầm và packet loss khó chẩn đoán** — dấu hiệu điển hình: connection nhỏ (health check, DNS) hoạt động bình thường nhưng transfer file lớn/response payload lớn bị treo hoặc chậm bất thường. Đây là câu hỏi debug thực tế rất hay gặp ở môi trường production dùng Flannel/VXLAN.

**Network Policy và CNI**: `NetworkPolicy` là object của Kubernetes nhưng **việc enforce hoàn toàn phụ thuộc CNI có hỗ trợ hay không** — Flannel mặc định (backend vxlan) **không hỗ trợ NetworkPolicy**, tạo NetworkPolicy nhưng traffic vẫn đi qua bình thường (silent no-op, rất dễ gây lỗ hổng bảo mật tưởng đã chặn mà chưa chặn). Calico/Cilium hỗ trợ đầy đủ NetworkPolicy (và mở rộng hơn với CiliumNetworkPolicy ở Layer 7).

## Detailed Answer (EN)
The **Kubernetes networking model** sets three fundamental requirements (it doesn't dictate implementation — that's the CNI plugin's job):
1. Every Pod gets its **own unique IP within the cluster** (a flat network) — no NAT between Pods.
2. A Pod on any node can **call another Pod on a different node directly** by that IP, with no NAT.
3. A node can talk directly to any Pod (and vice versa) with no NAT.

**CNI (Container Network Interface)** is the standard interface kubelet uses to call a network plugin (Calico, Cilium, Flannel, AWS VPC CNI, ...) to: assign an IP to a Pod, create a veth pair connecting the Pod into the node's network namespace, and set up routes satisfying the three requirements above.

**Packet path when Pod A (node 1) calls Pod B (node 2) via a ClusterIP Service**:
1. Pod A sends a packet to the Service's ClusterIP:port.
2. The packet travels through Pod A's `veth` into node 1's network namespace.
3. **kube-proxy** (with pre-configured iptables/IPVS rules) intercepts it and **DNATs** the ClusterIP → a chosen backend Pod's real IP (round-robin/random depending on mode).
4. The packet now targets **Pod B's real IP** — how it reaches node 2 depends on the CNI:
   - **Overlay (VXLAN/Flannel)**: the original packet is **encapsulated** inside a new UDP packet (a VXLAN header), sent over the physical network to node 2, which **decapsulates** it and routes it into Pod B's veth.
   - **BGP-based (Calico's no-overlay mode)**: each node advertises via BGP "my Pod CIDR lives at this node IP", so physical routers/switches (or the cloud VPC's route table) know how to route the original packet straight to node 2 **without encapsulation** — the packet travels natively on the physical network.
5. Arriving at node 2, the packet is routed into Pod B's veth, and Pod B receives it.

**Real-world comparison — the crux of this senior-level question**:

| | Overlay (VXLAN) | BGP-based (Calico no-overlay/AWS VPC CNI) |
|---|---|---|
| **Performance** | Encapsulate/decapsulate overhead (~50 extra header bytes, reduces effective MTU if not configured properly → silent fragmentation causing latency) | No encapsulation overhead, near-native network speed |
| **Debuggability** | `tcpdump` on the node sees **two layers**: the outer VXLAN packet and the inner Pod packet — harder to analyze, needs manual decapsulation or VXLAN-aware tooling | `tcpdump` sees the real Pod IP directly on the physical interface — easy to trace, plays well with traditional network tools (firewalls, IP-based IDS) |
| **Infrastructure requirements** | No special physical network support needed — works on any network as long as node IPs can reach each other | Requires BGP-capable routers/switches (on-prem) or a cloud VPC route table that can support it (cloud providers often cap routes/IPs per instance — e.g. AWS limits IPs per ENI) |
| **CIDR scalability** | Flexible, Pod CIDR is independent of the physical network | Constrained by the cloud provider's route table/IP pool limits |

**The classic MTU problem with overlays**: if the physical network has an MTU of 1500 and Pod MTU isn't reduced to ~1450 (accounting for the VXLAN header's 50 bytes), large packets get fragmented at the IP layer, causing **silent latency increases and hard-to-diagnose packet loss** — a telltale sign: small connections (health checks, DNS) work fine but large file transfers/large response payloads hang or slow down unexpectedly. This is a very common real-world debugging scenario in production environments using Flannel/VXLAN.

**NetworkPolicy and CNI**: `NetworkPolicy` is a Kubernetes object, but **whether it's actually enforced depends entirely on the CNI's support** — Flannel's default (vxlan backend) **does not support NetworkPolicy** at all — you can create a NetworkPolicy but traffic still flows through unaffected (a silent no-op, easily creating a false sense of security). Calico/Cilium fully support NetworkPolicy (and extend it further with CiliumNetworkPolicy at Layer 7).
