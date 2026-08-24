---
id: network-segmentation-basics
position: devops
technology: security-devsecops
level: junior
tags: [network-security, zero-trust, kubernetes]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Network segmentation là gì và tại sao "một khi đã vào được mạng nội bộ thì tin tưởng mọi thứ" (trust nội bộ mặc định) lại là mô hình bảo mật nguy hiểm? Zero-trust khác gì so với mô hình truyền thống?

## Question (EN)
What is network segmentation, and why is the "once inside the internal network, trust everything" model dangerous? How does zero-trust differ from the traditional model?

## Đáp án chi tiết (VI)
**Network segmentation** là chia hạ tầng mạng thành các vùng (zone/segment) nhỏ hơn, mỗi vùng có mức độ tin cậy và kiểm soát truy cập riêng, thay vì để toàn bộ hệ thống nằm trong một mạng phẳng (flat network) nơi mọi máy có thể giao tiếp tự do với nhau.

**Mô hình truyền thống ("castle-and-moat"):**
- Firewall chỉ kiểm soát traffic ra/vào ở biên (perimeter) — bên trong mạng nội bộ, mọi service/máy chủ mặc định tin tưởng lẫn nhau.
- **Vấn đề chí mạng**: nếu kẻ tấn công xâm nhập được MỘT máy trong mạng (VD: qua phishing, hoặc một service có lỗ hổng public-facing), chúng có thể **di chuyển ngang (lateral movement)** tự do đến mọi hệ thống khác — database, hệ thống quản lý nội bộ, secret store — vì không có rào cản nào bên trong.
- Đây là nguyên nhân khiến nhiều sự cố nhỏ ban đầu (một web server bị deface) leo thang thành rò rỉ toàn bộ dữ liệu khách hàng.

**Zero-trust: "never trust, always verify":**
- Không có khái niệm "mạng nội bộ đáng tin cậy" — mọi request, dù xuất phát từ đâu (kể cả cùng datacenter), đều phải được xác thực (authentication) và ủy quyền (authorization) tường minh.
- Áp dụng nguyên tắc least privilege ở mức network: service A chỉ được phép gọi đúng service B nó cần, trên đúng port cần, không hơn.

**Ví dụ segmentation trong Kubernetes bằng NetworkPolicy:**
```yaml
# Mặc định: deny tất cả traffic đến/đi trong namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: payment
spec:
  podSelector: {}
  policyTypes: [Ingress, Egress]
---
# Chỉ cho phép service "api" gọi đến service "payment-db" trên port 5432
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-api-to-db
  namespace: payment
spec:
  podSelector:
    matchLabels: { app: payment-db }
  ingress:
    - from:
        - podSelector: { matchLabels: { app: api } }
      ports:
        - protocol: TCP
          port: 5432
```
Nếu không có 2 policy này, mặc định trong K8s mọi Pod trong cluster có thể gọi mọi Pod khác — kể cả Pod của team khác trong namespace khác, nếu không có NetworkPolicy nào được set.

**So sánh:**

| Tiêu chí | Castle-and-moat | Zero-trust |
|---|---|---|
| Tin cậy mặc định trong mạng nội bộ | Có | Không |
| Kiểm soát truy cập | Chỉ ở biên (firewall/VPN) | Ở mọi điểm giao tiếp (mTLS, policy) |
| Chống lateral movement | Yếu | Mạnh (mỗi kết nối đều bị chặn nếu không được whitelist) |
| Độ phức tạp triển khai | Thấp | Cao hơn, cần identity-aware proxy/service mesh |

**Pitfall thường gặp ở team mới bắt đầu:** triển khai "default-deny" NetworkPolicy đột ngột trên cluster production đang chạy mà không audit trước traffic pattern thực tế — dễ gây outage vì các service phụ thuộc ngầm (DNS, metrics scraper, sidecar) bị chặn nhầm. Nên bắt đầu ở môi trường staging, dùng công cụ như Cilium Hubble để quan sát traffic thực tế trước khi viết policy.

## Detailed Answer (EN)
**Network segmentation** divides infrastructure into smaller zones/segments, each with its own trust level and access control, instead of leaving the whole system on one flat network where every machine can freely talk to every other machine.

**Traditional model ("castle-and-moat"):**
- A firewall controls only ingress/egress traffic at the perimeter — inside the internal network, every service/host implicitly trusts every other.
- **The fatal flaw**: if an attacker compromises just ONE machine on the network (e.g., via phishing, or a vulnerable public-facing service), they can **move laterally** freely to any other system — databases, internal admin tools, secret stores — because there's no internal barrier.
- This is why a small initial incident (a defaced web server) often escalates into a full customer-data breach.

**Zero-trust: "never trust, always verify":**
- There is no concept of a "trusted internal network" — every request, regardless of origin (even within the same datacenter), must be explicitly authenticated and authorized.
- Applies least privilege at the network level: service A may call only the exact service B it needs, on the exact port needed, nothing more.

**Segmentation example in Kubernetes with NetworkPolicy:**
```yaml
# Default: deny all ingress/egress traffic in the namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: payment
spec:
  podSelector: {}
  policyTypes: [Ingress, Egress]
---
# Only allow the "api" service to reach "payment-db" on port 5432
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-api-to-db
  namespace: payment
spec:
  podSelector:
    matchLabels: { app: payment-db }
  ingress:
    - from:
        - podSelector: { matchLabels: { app: api } }
      ports:
        - protocol: TCP
          port: 5432
```
Without these two policies, Kubernetes' default is that every Pod in the cluster can reach every other Pod — including a different team's Pod in a different namespace — unless some NetworkPolicy is set.

**Comparison:**

| Criteria | Castle-and-moat | Zero-trust |
|---|---|---|
| Default trust inside the network | Yes | No |
| Access control point | Perimeter only (firewall/VPN) | Every communication point (mTLS, policy) |
| Resistance to lateral movement | Weak | Strong (every connection is blocked unless explicitly allowed) |
| Deployment complexity | Low | Higher — needs identity-aware proxy/service mesh |

**Common pitfall for teams just starting out:** suddenly rolling out a "default-deny" NetworkPolicy on a running production cluster without first auditing real traffic patterns — this often causes outages when implicit dependencies (DNS, metrics scrapers, sidecars) get blocked unintentionally. Start in staging and use a tool like Cilium Hubble to observe actual traffic before writing policies.
