---
id: kubelet-role
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, architecture, node]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
kubelet là gì và nó đóng vai trò gì trên một worker node? Điều gì xảy ra với các Pod nếu kubelet trên node đó bị crash?

## Question (EN)
What is kubelet and what role does it play on a worker node? What happens to the Pods on a node if its kubelet crashes?

## Đáp án chi tiết (VI)
**kubelet** là agent chạy như một process/systemd service trên **mỗi worker node** (không chạy trong Pod như hầu hết component khác). Nó là cầu nối giữa control plane và container runtime thực tế.

**Trách nhiệm chính**:
1. **Watch apiserver**: liên tục theo dõi (watch) danh sách PodSpec được gán cho node của mình.
2. **Điều khiển container runtime**: gọi container runtime (containerd/CRI-O) qua chuẩn **CRI (Container Runtime Interface)** để pull image, tạo/xóa container theo đúng PodSpec.
3. **Chạy probe**: thực thi liveness/readiness/startup probe định kỳ, xử lý kết quả (restart container, cập nhật Endpoints).
4. **Báo cáo trạng thái**: gửi `NodeStatus` (CPU, memory, disk pressure, điều kiện Ready) và `PodStatus` ngược về apiserver mỗi khoảng thời gian (mặc định 10s) — đây là cơ sở để scheduler và controller-manager ra quyết định.
5. **Quản lý volume**: mount/unmount volume theo yêu cầu của Pod (qua CSI).
6. **cAdvisor tích hợp sẵn**: thu thập metric CPU/memory container, expose qua `/metrics/cadvisor` cho Prometheus scrape hoặc cho `kubectl top`.

**Nếu kubelet crash trên một node**:
- Các **Pod đang chạy vẫn tiếp tục chạy bình thường** — vì container runtime (containerd) hoạt động độc lập, không phụ thuộc kubelet để giữ container sống.
- Tuy nhiên: **không ai theo dõi/probe/report trạng thái** của các Pod đó nữa. Sau khoảng thời gian `node-monitor-grace-period` (mặc định 40s) không nhận heartbeat, node-controller trên control plane đánh dấu node là `NotReady`.
- Sau `pod-eviction-timeout` (mặc định 5 phút) node vẫn `NotReady`, control plane coi Pod trên node đó là "mất", và nếu Pod thuộc Deployment/ReplicaSet, controller sẽ **tạo Pod thay thế trên node khác** — trong khi Pod cũ trên node hỏng vẫn có thể đang chạy ngầm (nếu node chỉ là kubelet chết chứ không phải node chết thật) → nguy cơ **chạy trùng 2 bản** cho tới khi kubelet phục hồi hoặc node bị xóa hẳn.
- Đây là lý do tại sao StatefulSet với dữ liệu cần cẩn trọng: Kubernetes **không đảm bảo "at most one"** tuyệt đối trong tình huống network partition/kubelet treo — cần cơ chế fencing riêng (ví dụ etcd lease) cho ứng dụng cực nhạy với split-brain.

## Detailed Answer (EN)
**kubelet** is the agent running as a process/systemd service on **every worker node** (unlike most other components, it does not run inside a Pod). It's the bridge between the control plane and the actual container runtime.

**Main responsibilities**:
1. **Watch the apiserver**: continuously watches the list of PodSpecs assigned to its node.
2. **Drive the container runtime**: calls the container runtime (containerd/CRI-O) via the **CRI (Container Runtime Interface)** standard to pull images and create/destroy containers matching the PodSpec.
3. **Run probes**: periodically executes liveness/readiness/startup probes and acts on the results (restarting containers, updating Endpoints).
4. **Report status**: sends `NodeStatus` (CPU, memory, disk pressure, Ready condition) and `PodStatus` back to the apiserver on an interval (default 10s) — this is what the scheduler and controller-manager base their decisions on.
5. **Manage volumes**: mounts/unmounts volumes as required by Pods (via CSI).
6. **Built-in cAdvisor**: collects container CPU/memory metrics, exposed via `/metrics/cadvisor` for Prometheus scraping or `kubectl top`.

**If kubelet crashes on a node**:
- **Already-running Pods keep running normally** — the container runtime (containerd) operates independently and doesn't need kubelet to keep containers alive.
- However: **nothing is watching/probing/reporting** the status of those Pods anymore. After `node-monitor-grace-period` (default 40s) with no heartbeat, the node-controller on the control plane marks the node `NotReady`.
- After `pod-eviction-timeout` (default 5 minutes) with the node still `NotReady`, the control plane considers Pods on that node "lost", and if they belong to a Deployment/ReplicaSet, the controller **creates replacement Pods on another node** — while the old Pods on the broken node might still be running silently (if it's only kubelet that died, not the whole node) → risking **duplicate running instances** until kubelet recovers or the node is fully removed.
- This is exactly why StatefulSets with data need extra care: Kubernetes does **not** guarantee a strict "at most one" instance in a network-partition/hung-kubelet scenario — extremely split-brain-sensitive applications need their own fencing mechanism (e.g. an etcd lease).
