---
id: persistentvolume-and-pvc
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, storage, persistence]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PersistentVolume, PersistentVolumeClaim và StorageClass liên hệ với nhau như thế nào? Giải thích dynamic provisioning hoạt động ra sao.

## Question (EN)
How do PersistentVolume, PersistentVolumeClaim, and StorageClass relate to each other? Explain how dynamic provisioning works.

## Đáp án chi tiết (VI)
Ba khái niệm này tách biệt "ai cấp phát storage" khỏi "ai dùng storage", theo mô hình giống Service/Endpoint:

- **PersistentVolume (PV)**: đại diện cho một **ổ đĩa vật lý/network storage thực tế** (EBS volume, NFS share, Ceph...) — là **cluster-scoped**, không thuộc namespace nào.
- **PersistentVolumeClaim (PVC)**: là **yêu cầu storage** của một Pod/namespace — "tôi cần 10Gi, ReadWriteOnce, class ssd" — là **namespace-scoped**.
- **StorageClass**: định nghĩa **loại storage** và **provisioner** nào sẽ tự động tạo PV khi có PVC khớp (dynamic provisioning), thay vì admin phải tạo PV thủ công.

**Luồng dynamic provisioning** (cách phổ biến nhất hiện nay, khác với static provisioning thời kỳ đầu K8s):
```
Pod tạo → mount PVC → PVC chưa có PV khớp → 
StorageClass.provisioner (VD: ebs.csi.aws.com) được gọi →
Tạo PV thật (gọi API cloud tạo ổ đĩa) → 
PV bind với PVC → Pod mount thành công
```

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
volumeBindingMode: WaitForFirstConsumer   # quan trọng — xem giải thích bên dưới
reclaimPolicy: Delete

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-pvc
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 20Gi
```

**Điểm hay bị hỏi sâu**:
1. **`volumeBindingMode: WaitForFirstConsumer` vs `Immediate`**: `Immediate` tạo PV ngay khi PVC được tạo, **không quan tâm Pod sẽ chạy ở node/zone nào** — dễ gây lỗi "PV ở zone A nhưng Pod bị scheduler đặt ở zone B" (với storage zone-bound như EBS). `WaitForFirstConsumer` trì hoãn việc tạo PV cho tới khi Pod dùng PVC đó **đã được schedule**, đảm bảo PV được tạo đúng zone với Pod — đây là default nên dùng cho hầu hết trường hợp cloud.
2. **`reclaimPolicy`**: `Delete` (mặc định với dynamic provisioning) — xóa PVC sẽ xóa luôn PV và ổ đĩa thật (mất data vĩnh viễn); `Retain` — xóa PVC, PV chuyển sang trạng thái `Released`, dữ liệu còn nguyên nhưng phải admin can thiệp thủ công mới tái sử dụng được. Production critical data nên cân nhắc `Retain` + backup riêng thay vì phó mặc `Delete`.
3. **AccessMode không phải "read-only vs read-write"** như tên gợi ý — nó mô tả **có bao nhiêu node được mount cùng lúc**: `ReadWriteOnce` (1 node, nhưng nhiều Pod trên cùng node đó vẫn mount được — hay bị hiểu nhầm là "1 Pod"), `ReadOnlyMany` (nhiều node, chỉ đọc), `ReadWriteMany` (nhiều node, đọc-ghi — chỉ storage backend hỗ trợ NFS/CephFS/EFS mới làm được, EBS/GCE PD không hỗ trợ).
4. **StatefulSet dùng PV như thế nào**: mỗi Pod trong StatefulSet có PVC riêng (qua `volumeClaimTemplates`), tự động bind vào PV riêng — khác với Deployment nếu bạn cố gắn 1 PVC ReadWriteOnce cho nhiều replicas sẽ chỉ Pod đầu tiên mount được, các Pod sau bị `Pending` (`FailedAttachVolume`).

## Detailed Answer (EN)
These three concepts decouple "who provisions storage" from "who consumes storage", similar to the Service/Endpoint model:

- **PersistentVolume (PV)**: represents an **actual physical/network storage volume** (an EBS volume, an NFS share, Ceph, ...) — it's **cluster-scoped**, belonging to no namespace.
- **PersistentVolumeClaim (PVC)**: a **request for storage** made by a Pod/namespace — "I need 10Gi, ReadWriteOnce, ssd class" — it's **namespace-scoped**.
- **StorageClass**: defines a **kind of storage** and which **provisioner** automatically creates a PV when a matching PVC appears (dynamic provisioning), instead of an admin manually creating PVs.

**The dynamic provisioning flow** (the common approach today, vs. the manual/static provisioning of early Kubernetes):
```
Pod created → mounts a PVC → no matching PV exists yet →
StorageClass.provisioner (e.g. ebs.csi.aws.com) is invoked →
a real PV is created (calls the cloud API to provision a disk) →
the PV binds to the PVC → the Pod mounts successfully
```

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
volumeBindingMode: WaitForFirstConsumer   # important — see explanation below
reclaimPolicy: Delete

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-pvc
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 20Gi
```

**Points commonly probed further**:
1. **`volumeBindingMode: WaitForFirstConsumer` vs `Immediate`**: `Immediate` provisions the PV as soon as the PVC is created, **without knowing which node/zone the Pod will land on** — easily causing "PV in zone A but the scheduler placed the Pod in zone B" (with zone-bound storage like EBS). `WaitForFirstConsumer` delays PV creation until the Pod using that PVC has **already been scheduled**, guaranteeing the PV is provisioned in the right zone — this is the recommended default for most cloud scenarios.
2. **`reclaimPolicy`**: `Delete` (the dynamic-provisioning default) — deleting the PVC also deletes the PV and the real disk (permanent data loss); `Retain` — deleting the PVC leaves the PV in a `Released` state, data intact, but requires manual admin action to reuse. For critical production data, consider `Retain` plus a separate backup strategy rather than defaulting to `Delete`.
3. **AccessMode isn't "read-only vs. read-write"** as the name might suggest — it describes **how many nodes can mount it simultaneously**: `ReadWriteOnce` (one node, though multiple Pods on that same node can still mount it — a common misconception is that it means "one Pod"), `ReadOnlyMany` (many nodes, read-only), `ReadWriteMany` (many nodes, read-write — only supported by NFS/CephFS/EFS-style backends; EBS/GCE PD don't support it).
4. **How StatefulSets use PVs**: each Pod in a StatefulSet gets its own PVC (via `volumeClaimTemplates`), auto-bound to its own PV — unlike a Deployment where if you try attaching one `ReadWriteOnce` PVC to multiple replicas, only the first Pod mounts successfully; the rest get stuck `Pending` (`FailedAttachVolume`).
