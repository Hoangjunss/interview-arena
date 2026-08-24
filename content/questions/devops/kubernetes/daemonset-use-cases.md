---
id: daemonset-use-cases
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, daemonset, workloads]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DaemonSet dùng để làm gì và cho ví dụ thực tế về khi nào bạn sẽ chọn DaemonSet thay vì Deployment?

## Question (EN)
What is a DaemonSet used for, and give a real example of when you'd choose a DaemonSet over a Deployment?

## Đáp án chi tiết (VI)
**DaemonSet** đảm bảo **đúng một bản sao của Pod chạy trên mỗi node** (hoặc mỗi node thỏa điều kiện selector/toleration) trong cluster. Khi có node mới join, DaemonSet tự động schedule một Pod lên đó; khi node bị xóa khỏi cluster, Pod tương ứng cũng bị dọn theo — không cần bạn set số replicas thủ công.

So với Deployment (chỉ quan tâm "đủ N Pod chạy ở đâu đó"), DaemonSet quan tâm **vị trí** — mỗi node một bản.

**Các use case kinh điển**:
- **Log collector**: Fluentd/Fluent Bit/Filebeat chạy trên mỗi node để đọc log từ `/var/log` hoặc container runtime và đẩy về hệ thống tập trung (ELK, Loki).
- **Monitoring agent**: node-exporter (Prometheus) cần đọc metric hệ điều hành của từng node (CPU, disk, network).
- **Network plugin (CNI)**: Calico, Cilium, Flannel cần một agent trên mỗi node để thiết lập routing/iptables.
- **Storage plugin**: CSI node driver (ví dụ `ebs-csi-node`) cần chạy trên mọi node để mount volume cục bộ.
- **Security agent**: Falco, antivirus agent giám sát syscall trên từng node.

Ví dụ manifest node-exporter:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-exporter
spec:
  selector:
    matchLabels:
      app: node-exporter
  template:
    metadata:
      labels:
        app: node-exporter
    spec:
      hostNetwork: true
      hostPID: true
      tolerations:
        - operator: Exists   # chạy được cả trên node có taint (ví dụ control-plane)
      containers:
        - name: node-exporter
          image: prom/node-exporter:v1.7.0
          ports:
            - containerPort: 9100
```

**Lưu ý**: mặc định DaemonSet **không** được schedule lên node có taint (ví dụ control-plane node có taint `node-role.kubernetes.io/control-plane:NoSchedule`) — muốn agent giám sát chạy cả trên control-plane, phải thêm `tolerations`. Đây cũng là lỗi phổ biến: "tại sao monitoring agent không thấy metric của master node?" → thiếu toleration.

**Update strategy**: giống Deployment, DaemonSet hỗ trợ `updateStrategy.type: RollingUpdate` (mặc định, tự động thay Pod cũ theo `maxUnavailable`) hoặc `OnDelete` (chỉ tạo Pod version mới sau khi bạn xóa Pod cũ thủ công — dùng khi cần kiểm soát tuyệt đối thời điểm restart agent, ví dụ tránh mất log đang buffer). Vì DaemonSet chạy trên toàn bộ node, cần đặt `resources.requests/limits` chặt chẽ — một agent "ăn" 500m CPU tưởng nhỏ nhưng nhân với 200 node là 100 core bị chiếm dụng.

## Detailed Answer (EN)
A **DaemonSet** guarantees **exactly one copy of a Pod runs on every node** (or every node matching a selector/toleration) in the cluster. When a new node joins, the DaemonSet automatically schedules a Pod onto it; when a node is removed, its Pod is cleaned up too — you never manually set a replica count.

Unlike a Deployment (which only cares that "N Pods are running somewhere"), a DaemonSet cares about **placement** — one copy per node.

**Classic use cases**:
- **Log collectors**: Fluentd/Fluent Bit/Filebeat running on every node to read logs from `/var/log` or the container runtime and ship them to a central system (ELK, Loki).
- **Monitoring agents**: Prometheus node-exporter needs to read each node's OS-level metrics (CPU, disk, network).
- **CNI network plugins**: Calico, Cilium, Flannel need an agent on every node to set up routing/iptables.
- **Storage plugins**: CSI node drivers (e.g. `ebs-csi-node`) need to run on every node to mount local volumes.
- **Security agents**: Falco, antivirus agents monitoring syscalls per node.

Example node-exporter manifest:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-exporter
spec:
  selector:
    matchLabels:
      app: node-exporter
  template:
    metadata:
      labels:
        app: node-exporter
    spec:
      hostNetwork: true
      hostPID: true
      tolerations:
        - operator: Exists   # allows scheduling even on tainted nodes (e.g. control-plane)
      containers:
        - name: node-exporter
          image: prom/node-exporter:v1.7.0
          ports:
            - containerPort: 9100
```

**Gotcha**: by default a DaemonSet is **not** scheduled onto tainted nodes (e.g. control-plane nodes carry `node-role.kubernetes.io/control-plane:NoSchedule`) — to get a monitoring agent onto the control-plane too, you must add `tolerations`. This is a common "why doesn't my monitoring agent see metrics from the master node?" bug caused by a missing toleration.

**Update strategy**: like Deployments, DaemonSets support `updateStrategy.type: RollingUpdate` (default — automatically replaces old Pods according to `maxUnavailable`) or `OnDelete` (a new-version Pod is only created after you manually delete the old one — useful when you need tight control over exactly when an agent restarts, e.g. to avoid losing buffered logs). Because a DaemonSet runs on every node, set tight `resources.requests/limits` — an agent that "only" uses 500m CPU looks trivial until you multiply it by 200 nodes and realize it's consuming 100 cores cluster-wide.
