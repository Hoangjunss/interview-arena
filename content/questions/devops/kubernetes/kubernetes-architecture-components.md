---
id: kubernetes-architecture-components
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, architecture, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hãy vẽ và giải thích kiến trúc cơ bản của một cluster Kubernetes: control plane gồm những thành phần nào, worker node gồm những thành phần nào, và chúng phối hợp với nhau ra sao khi bạn chạy `kubectl apply`?

## Question (EN)
Describe the basic architecture of a Kubernetes cluster: what components make up the control plane, what components make up a worker node, and how do they cooperate when you run `kubectl apply`?

## Đáp án chi tiết (VI)
Kubernetes cluster gồm hai nhóm node: **control plane** (não bộ, ra quyết định) và **worker node** (nơi Pod thực sự chạy).

**Control plane** gồm:
- **kube-apiserver**: cổng vào duy nhất của cluster — mọi thao tác (kubectl, controller, kubelet) đều đi qua REST API này. Nó xác thực (authentication), phân quyền (RBAC/authorization), rồi ghi/đọc trạng thái vào etcd.
- **etcd**: key-value store phân tán, lưu **toàn bộ trạng thái** của cluster (mọi object: Pod, Service, ConfigMap...). Mất etcd = mất cluster.
- **kube-scheduler**: theo dõi các Pod chưa được gán node (`spec.nodeName` rỗng), chọn node phù hợp nhất dựa trên resource request, affinity, taints/tolerations, rồi ghi quyết định vào etcd qua apiserver.
- **kube-controller-manager**: chạy nhiều control loop (Deployment controller, ReplicaSet controller, Node controller...), liên tục so sánh **desired state** (trong etcd) với **actual state** (báo cáo từ kubelet) và hành động để san bằng khác biệt.
- **cloud-controller-manager** (nếu chạy trên cloud): tích hợp với API của cloud provider (tạo LoadBalancer, gắn PersistentVolume...).

**Worker node** gồm:
- **kubelet**: agent chạy trên mỗi node, nhận PodSpec từ apiserver, ra lệnh cho container runtime tạo container, và liên tục báo cáo trạng thái Pod/node về lại apiserver.
- **kube-proxy**: quản lý rule mạng (iptables/IPVS) để traffic tới một Service được load-balance đúng tới các Pod backend.
- **Container runtime** (containerd, CRI-O): thực sự pull image và chạy container thông qua chuẩn CRI.

**Luồng khi chạy `kubectl apply -f deployment.yaml`**:
1. `kubectl` gửi request tới **kube-apiserver**.
2. apiserver xác thực, authorize (RBAC), validate schema (admission webhook nếu có), rồi ghi Deployment object vào **etcd**.
3. **controller-manager** (Deployment + ReplicaSet controller) phát hiện thay đổi, tạo object ReplicaSet, rồi ReplicaSet controller tạo các Pod object (chưa có node) và ghi vào etcd.
4. **kube-scheduler** thấy Pod chưa có `nodeName`, chọn node phù hợp, patch `nodeName` vào Pod object qua apiserver.
5. **kubelet** trên node đó theo dõi (watch) apiserver, thấy có Pod được gán cho mình, ra lệnh container runtime pull image và start container.
6. kubelet báo trạng thái Pod (Running/Ready) ngược lại apiserver → etcd.

Toàn bộ hệ thống hoạt động theo mô hình **watch + reconcile loop**, không có ai gọi trực tiếp ai — mọi thành phần chỉ giao tiếp qua apiserver, đây là lý do Kubernetes có thể self-heal: nếu bất kỳ thành phần nào crash và restart, nó chỉ cần đọc lại trạng thái từ etcd/apiserver để tiếp tục.

## Detailed Answer (EN)
A Kubernetes cluster has two groups of nodes: the **control plane** (the brain, making decisions) and **worker nodes** (where Pods actually run).

**Control plane components**:
- **kube-apiserver**: the cluster's single entry point — every operation (kubectl, controllers, kubelet) goes through this REST API. It authenticates, authorizes (RBAC), and reads/writes state to etcd.
- **etcd**: a distributed key-value store holding the **entire cluster state** (every object: Pods, Services, ConfigMaps...). Losing etcd means losing the cluster.
- **kube-scheduler**: watches for Pods with no assigned node (`spec.nodeName` empty), picks the best-fit node based on resource requests, affinity, taints/tolerations, and writes the decision back through the apiserver into etcd.
- **kube-controller-manager**: runs many control loops (Deployment controller, ReplicaSet controller, Node controller, ...), continuously comparing **desired state** (in etcd) against **actual state** (reported by kubelets) and acting to close the gap.
- **cloud-controller-manager** (on cloud providers): integrates with the cloud API (provisioning LoadBalancers, attaching PersistentVolumes, etc.).

**Worker node components**:
- **kubelet**: the per-node agent that receives PodSpecs from the apiserver, instructs the container runtime to create containers, and continuously reports Pod/node status back to the apiserver.
- **kube-proxy**: manages network rules (iptables/IPVS) so traffic to a Service gets load-balanced correctly to backend Pods.
- **Container runtime** (containerd, CRI-O): actually pulls images and runs containers via the CRI standard.

**What happens on `kubectl apply -f deployment.yaml`**:
1. `kubectl` sends a request to the **kube-apiserver**.
2. The apiserver authenticates, authorizes (RBAC), validates the schema (admission webhooks if any), then writes the Deployment object to **etcd**.
3. The **controller-manager** (Deployment + ReplicaSet controllers) notices the change, creates a ReplicaSet object, and the ReplicaSet controller creates Pod objects (with no node yet) written to etcd.
4. The **kube-scheduler** sees Pods with no `nodeName`, picks a suitable node, and patches `nodeName` onto the Pod via the apiserver.
5. The **kubelet** on that node, watching the apiserver, sees a Pod assigned to it and tells the container runtime to pull the image and start the container.
6. The kubelet reports Pod status (Running/Ready) back to the apiserver → etcd.

The whole system runs on a **watch + reconcile loop** model — no component calls another directly; everything talks only through the apiserver. This is exactly why Kubernetes can self-heal: if any component crashes and restarts, it just re-reads state from etcd/apiserver to pick up where it left off.
