---
id: zero-trust-architecture-mtls-microservices
position: devops
technology: security-devsecops
level: senior
tags: [zero-trust, mtls, service-mesh, kubernetes]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn được giao thiết kế kiến trúc zero-trust cho một hệ thống microservices gồm 50+ service chạy trên Kubernetes multi-cluster. Trình bày các lớp kiểm soát cần có và đánh đổi giữa bảo mật với độ phức tạp vận hành.

## Question (EN)
You're tasked with designing a zero-trust architecture for a microservices system with 50+ services running on multi-cluster Kubernetes. Describe the control layers needed and the trade-offs between security and operational complexity.

## Đáp án chi tiết (VI)
Zero-trust ở quy mô 50+ service không phải là bật một tính năng, mà là một tập hợp control phối hợp ở nhiều lớp. Nguyên tắc xuyên suốt: **không tin bất kỳ traffic nào chỉ vì nó xuất phát từ "bên trong" mạng/cluster.**

**Lớp 1 — Identity cho mọi service (nền tảng của mọi thứ khác):**
- Mỗi service cần một **identity mật mã học (cryptographic identity)**, không phải chỉ IP hay tên DNS (dễ giả mạo/spoof).
- SPIFFE/SPIRE là chuẩn phổ biến: cấp SVID (SPIFFE Verifiable Identity Document) dạng X.509 cert ngắn hạn cho mỗi workload, tự động xoay vòng.
```
spiffe://prod.internal/ns/payment/sa/payment-service
```
- Trong Istio/Linkerd, identity này được cấp tự động qua sidecar, không cần service tự quản lý cert.

**Lớp 2 — mTLS bắt buộc cho mọi giao tiếp service-to-service:**
```yaml
# Istio PeerAuthentication - bắt buộc mTLS toàn mesh, không cho phép plaintext
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT
```
- Đảm bảo: (1) mã hoá traffic ngay cả trong cùng cluster, (2) xác thực lẫn nhau — không chỉ client xác thực server mà server cũng xác thực client bằng cert.
- **Không đủ nếu chỉ dừng ở đây** — mTLS chỉ trả lời "ai đang gọi", chưa trả lời "có được phép gọi không".

**Lớp 3 — Authorization chi tiết theo từng cặp service (không chỉ network-level):**
```yaml
# Istio AuthorizationPolicy - chỉ order-service được gọi payment-service, chỉ trên path cụ thể
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: payment-service-policy
  namespace: payment
spec:
  selector:
    matchLabels: { app: payment-service }
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/orders/sa/order-service"]
      to:
        - operation:
            paths: ["/api/v1/charge"]
            methods: ["POST"]
```
Kết hợp với `NetworkPolicy` ở tầng L3/L4 tạo phòng thủ 2 lớp — dù kẻ tấn công vượt qua được network policy (VD: exploit được 1 pod trong cùng namespace), authorization policy ở L7 vẫn chặn nếu identity không đúng.

**Lớp 4 — Cross-cluster identity federation (đặc thù multi-cluster):**
- Với multi-cluster, mỗi cluster có thể có root CA riêng — cần **trust domain federation** (Istio multi-cluster mesh, hoặc SPIRE federation) để service ở cluster A tin cậy được cert cấp bởi cluster B, mà không cần dùng chung 1 CA root duy nhất (single point of failure).
- Trade-off: shared root CA đơn giản hơn để vận hành nhưng nếu CA đó bị compromise, toàn bộ mọi cluster đều bị ảnh hưởng; federation phức tạp hơn nhưng giới hạn blast radius.

**Lớp 5 — Observability để phát hiện vi phạm zero-trust:**
- Cilium Hubble / Istio telemetry để xem **traffic nào bị deny** theo thời gian thực — không chỉ enforce mà phải quan sát được việc enforce có đúng không.
- Cảnh báo khi có pattern bất thường: một service đột nhiên cố gọi đến service nó chưa từng gọi trước đây (dấu hiệu compromise/lateral movement).

**Đánh đổi giữa bảo mật và độ phức tạp vận hành — đây là phần quan trọng senior cần nói rõ:**

| Vấn đề | Chi phí vận hành | Cách giảm thiểu |
|---|---|---|
| Sidecar mesh (Istio) thêm latency + resource | Mỗi Pod cõng thêm 1 container Envoy, tăng CPU/memory cluster-wide | Cân nhắc ambient mesh (sidecar-less, VD Istio Ambient) cho service ít nhạy cảm, chỉ dùng sidecar cho service critical |
| AuthorizationPolicy viết tay cho 50+ service dễ sai sót, khó maintain | Một policy sai có thể chặn nhầm traffic hợp lệ → outage | Sinh policy tự động từ service dependency graph đã quan sát được (observability-driven), review qua PR như code |
| Debug traffic bị deny khó hơn nhiều so với network phẳng | Thời gian MTTR tăng khi có sự cố network | Đầu tư sớm vào dashboard hiển thị rõ "request bị deny bởi policy nào, lý do gì" |
| Rollout zero-trust đột ngột dễ gây outage diện rộng | Rủi ro kinh doanh | Rollout theo giai đoạn: audit mode trước (log nhưng không block) vài tuần, review log, rồi mới chuyển enforce mode theo từng namespace |

**Kết luận khi trình bày phỏng vấn:** zero-trust không phải "tất cả hoặc không gì cả" — nên rollout tăng dần theo mức độ nhạy cảm của service (payment/PII trước, service nội bộ ít rủi ro sau), luôn có observability đi trước enforcement, và chấp nhận đầu tư vận hành cao hơn đáng kể so với mô hình truyền thống để đổi lấy giảm blast radius khi có sự cố.

## Detailed Answer (EN)
Zero-trust at a 50+ service scale isn't a single feature flip — it's a coordinated set of controls across multiple layers. The guiding principle: **never trust traffic just because it originates "inside" the network/cluster.**

**Layer 1 — Identity for every service (the foundation everything else builds on):**
- Every service needs a **cryptographic identity**, not just an IP or DNS name (both easily spoofed).
- SPIFFE/SPIRE is the common standard: it issues short-lived X.509-based SVIDs (SPIFFE Verifiable Identity Documents) per workload, auto-rotated.
```
spiffe://prod.internal/ns/payment/sa/payment-service
```
- In Istio/Linkerd, this identity is issued automatically via the sidecar — services don't manage their own certs.

**Layer 2 — Mandatory mTLS for every service-to-service call:**
```yaml
# Istio PeerAuthentication - enforce mTLS mesh-wide, no plaintext allowed
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT
```
- This ensures: (1) traffic is encrypted even within the same cluster, (2) mutual authentication — not just client verifying the server, but the server also verifying the client's cert.
- **Not sufficient on its own** — mTLS answers "who's calling", not "are they allowed to call".

**Layer 3 — Fine-grained authorization per service pair (not just network-level):**
```yaml
# Istio AuthorizationPolicy - only order-service may call payment-service, only on a specific path
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: payment-service-policy
  namespace: payment
spec:
  selector:
    matchLabels: { app: payment-service }
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/orders/sa/order-service"]
      to:
        - operation:
            paths: ["/api/v1/charge"]
            methods: ["POST"]
```
Combined with L3/L4 `NetworkPolicy`, this forms two layers of defense — even if an attacker gets past the network policy (e.g., exploiting a pod in the same namespace), the L7 authorization policy still blocks traffic from an unauthorized identity.

**Layer 4 — Cross-cluster identity federation (specific to multi-cluster):**
- In multi-cluster setups, each cluster may have its own root CA — you need **trust domain federation** (Istio multi-cluster mesh, or SPIRE federation) so a service in cluster A trusts a cert issued by cluster B, without relying on one shared root CA (a single point of failure).
- Trade-off: a shared root CA is simpler to operate but a compromise affects every cluster; federation is more complex but limits blast radius.

**Layer 5 — Observability to detect zero-trust violations:**
- Cilium Hubble / Istio telemetry to see **denied traffic in real time** — enforcement without observability is enforcement you can't verify is correct.
- Alert on anomalous patterns: a service suddenly attempting to call a service it's never called before (a sign of compromise/lateral movement).

**Security vs operational complexity trade-offs — the part a senior candidate needs to spell out:**

| Issue | Operational cost | Mitigation |
|---|---|---|
| Sidecar mesh (Istio) adds latency + resource overhead | Every Pod carries an extra Envoy container, raising cluster-wide CPU/memory | Consider a sidecar-less "ambient mesh" (e.g., Istio Ambient) for less-sensitive services, reserving sidecars for critical ones |
| Hand-written AuthorizationPolicies for 50+ services are error-prone and hard to maintain | A wrong policy can block legitimate traffic → outage | Auto-generate policies from an observed service dependency graph (observability-driven), reviewed via PR like code |
| Debugging denied traffic is much harder than on a flat network | MTTR increases during network incidents | Invest early in dashboards showing exactly "which policy denied this request, and why" |
| Rolling out zero-trust abruptly risks wide outages | Business risk | Phased rollout: audit mode first (log but don't block) for a few weeks, review the logs, then switch to enforce mode namespace by namespace |

**Interview takeaway:** zero-trust isn't "all or nothing" — roll it out incrementally by service sensitivity (payment/PII services first, low-risk internal services later), always put observability ahead of enforcement, and accept a meaningfully higher operational investment than the traditional model in exchange for a smaller blast radius during incidents.
