---
id: etcd-role-in-kubernetes
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, etcd, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
etcd đóng vai trò gì trong Kubernetes? Tại sao người ta nói "mất etcd là mất cả cluster"?

## Question (EN)
What role does etcd play in Kubernetes? Why is it said that "losing etcd means losing the whole cluster"?

## Đáp án chi tiết (VI)
**etcd** là một **distributed key-value store** dùng thuật toán đồng thuận **Raft** để đảm bảo tính nhất quán giữa nhiều node. Trong Kubernetes, etcd là **nguồn sự thật duy nhất (single source of truth)** — lưu trữ **toàn bộ trạng thái mong muốn và thực tế** của cluster:
- Mọi object: Pod, Deployment, Service, ConfigMap, Secret, Node status...
- Không có database nào khác — Kubernetes **không dùng** MySQL/PostgreSQL để lưu state, chỉ dùng etcd.

**Vì sao "mất etcd = mất cluster"**:
1. **kube-apiserver là stateless** — nó không tự lưu trữ gì, mọi read/write đều pass-through etcd. Etcd chết → apiserver không trả lời được request nào (kể cả `kubectl get pods` cũng fail).
2. **Control plane mất khả năng ra quyết định**: scheduler, controller-manager đều dựa vào dữ liệu đọc từ etcd (qua apiserver) để biết desired state — mất etcd nghĩa là mất luôn "trí nhớ" của cluster.
3. **Điều đáng chú ý**: Pod **đang chạy** trên worker node vẫn tiếp tục chạy bình thường trong thời gian ngắn (container runtime không phụ thuộc etcd), nhưng **không ai có thể tạo Pod mới, scale, update, hay tự phục hồi** khi có sự cố — cluster về cơ bản bị "đóng băng" ở trạng thái cuối cùng đã ghi nhận.
4. Nếu dữ liệu etcd bị mất vĩnh viễn (không có backup) → toàn bộ định nghĩa resource (YAML) biến mất, phải build lại cluster từ đầu bằng cách apply lại toàn bộ manifest thủ công (nếu còn lưu trong Git — đây là lý do GitOps quan trọng).

**Best practice vận hành etcd trong production**:
- Chạy **cluster etcd lẻ node** (3, 5 node) để chịu được lỗi theo Raft (chịu được `(n-1)/2` node chết) — **không bao giờ chạy 1 node etcd** cho production.
- **Backup định kỳ** bằng `etcdctl snapshot save`, lưu snapshot ở nơi khác cluster (S3, object storage).
- Bật **encryption at rest** để Secret không bị đọc trực tiếp nếu ai đó truy cập được file etcd.
- Theo dõi latency/disk I/O của etcd sát sao — etcd rất nhạy với disk chậm (khuyến nghị SSD, latency < 10ms), disk chậm gây timeout Raft, toàn cluster trở nên "flaky" (Pod tạo chậm, apiserver timeout).
- Trên managed Kubernetes (EKS, GKE, AKS) etcd do cloud provider quản lý — bạn không truy cập trực tiếp nhưng vẫn cần hiểu để debug các lỗi liên quan API server timeout.

```bash
# ví dụ backup thủ công trên self-managed cluster
ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key
```

## Detailed Answer (EN)
**etcd** is a **distributed key-value store** using the **Raft** consensus algorithm to keep multiple nodes consistent. In Kubernetes, etcd is the **single source of truth** — it stores the **entire desired and actual state** of the cluster:
- Every object: Pods, Deployments, Services, ConfigMaps, Secrets, Node status, ...
- There is no other database — Kubernetes does **not** use MySQL/PostgreSQL for state; only etcd.

**Why "losing etcd means losing the cluster"**:
1. **kube-apiserver is stateless** — it stores nothing itself; every read/write passes through to etcd. If etcd dies, the apiserver can't answer any request (even `kubectl get pods` fails).
2. **The control plane loses its ability to make decisions**: the scheduler and controller-manager both rely on data read from etcd (via the apiserver) to know the desired state — losing etcd means losing the cluster's "memory".
3. **Notably**: Pods **already running** on worker nodes keep running fine for a while (the container runtime doesn't depend on etcd), but **nobody can create new Pods, scale, update, or self-heal** during the outage — the cluster is essentially "frozen" at its last recorded state.
4. If etcd data is lost permanently (no backup) → every resource definition (YAML) disappears, and the cluster must be rebuilt from scratch by re-applying all manifests manually (if still stored in Git — this is exactly why GitOps matters).

**Production etcd operational best practices**:
- Run an **odd-node etcd cluster** (3 or 5 nodes) to tolerate failures per Raft (survives `(n-1)/2` node failures) — **never run a single-node etcd** in production.
- **Back up regularly** with `etcdctl snapshot save`, storing snapshots outside the cluster (S3, object storage).
- Enable **encryption at rest** so Secrets aren't readable directly if someone gains access to etcd's data files.
- Watch etcd's latency/disk I/O closely — etcd is very sensitive to slow disks (SSD recommended, latency < 10ms); slow disk causes Raft timeouts, making the whole cluster "flaky" (slow Pod creation, apiserver timeouts).
- On managed Kubernetes (EKS, GKE, AKS), etcd is managed by the cloud provider — you don't access it directly but still need to understand it to debug apiserver-timeout-related issues.

```bash
# example manual backup on a self-managed cluster
ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key
```
