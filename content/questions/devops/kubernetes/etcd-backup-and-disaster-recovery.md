---
id: etcd-backup-and-disaster-recovery
position: devops
technology: kubernetes
level: senior
tags: [kubernetes, etcd, disaster-recovery]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế chiến lược backup/restore etcd cho một cluster Kubernetes production. Điều gì xảy ra nếu bạn restore snapshot etcd lên một cluster mà quên cập nhật lại chứng chỉ TLS hoặc `member ID`? Và tại sao restore etcd không đồng nghĩa với việc mọi thứ trong cluster hoạt động lại ngay?

## Question (EN)
Design a backup/restore strategy for etcd in a production Kubernetes cluster. What goes wrong if you restore an etcd snapshot without updating TLS certificates or member IDs? Why doesn't restoring etcd mean everything in the cluster immediately works again?

## Đáp án chi tiết (VI)
**Chiến lược backup production-grade**:
1. **Snapshot định kỳ + lưu off-cluster**: dùng `etcdctl snapshot save` chạy qua CronJob (hoặc công cụ như Velero với etcd plugin), đẩy snapshot ra **object storage bên ngoài cluster** (S3, GCS) — backup lưu trong cùng cluster/node vô nghĩa nếu toàn bộ cluster/datacenter down.
2. **Tần suất**: tùy RPO yêu cầu — thường 15-30 phút cho cluster quan trọng, kèm retention policy (giữ 7-30 bản gần nhất + vài bản daily/weekly dài hạn).
3. **Test restore định kỳ** (rất hay bị bỏ qua): backup không test restore = không có backup thật sự — nên có quy trình DR drill định kỳ (hàng quý) restore lên cluster staging để xác nhận snapshot dùng được.
4. **Giám sát tính toàn vẹn**: alert nếu job backup fail hoặc snapshot size bất thường (đột ngột nhỏ hơn nhiều so với trung bình = nghi ngờ dữ liệu thiếu).
5. Với managed Kubernetes (EKS/GKE/AKS), etcd do cloud vendor quản lý — backup etcd không do bạn thực hiện trực tiếp, nhưng vẫn cần backup **resource YAML** qua GitOps hoặc Velero (backup ở tầng Kubernetes object, không phải etcd raw data) làm lớp phòng thủ thứ 2.

```bash
ETCDCTL_API=3 etcdctl snapshot save /backup/snap-$(date +%Y%m%d%H%M).db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key
aws s3 cp /backup/snap-*.db s3://k8s-etcd-backup/prod/
```

**Restore thực tế** — không đơn giản là "chép file đè lên":
```bash
ETCDCTL_API=3 etcdctl snapshot restore /backup/snap-20260101.db \
  --data-dir=/var/lib/etcd-restored \
  --name=etcd-1 \
  --initial-cluster="etcd-1=https://10.0.0.1:2380,etcd-2=https://10.0.0.2:2380,etcd-3=https://10.0.0.3:2380" \
  --initial-cluster-token=etcd-cluster-restore \
  --initial-advertise-peer-urls=https://10.0.0.1:2380
```
Rồi trỏ `--data-dir` mới này trong manifest static Pod của etcd, restart etcd trên **từng member**.

**Vấn đề nếu quên cập nhật TLS/member ID — đúng trọng tâm câu hỏi senior**:
1. **Snapshot restore tạo ra một cluster etcd MỚI về mặt logic** (`initial-cluster-token` khác, cluster ID mới sinh ra) dù dữ liệu là cũ — nếu chỉ restore trên 1 node rồi cố join lại các node etcd khác đang chạy với cluster ID cũ, chúng sẽ **từ chối bắt tay** (cluster ID mismatch) vì Raft coi đây là 2 cluster khác nhau hoàn toàn — phải restore **đồng thời trên tất cả member** với cùng `initial-cluster` config nhất quán.
2. **Chứng chỉnh TLS**: nếu snapshot được restore trên hạ tầng mới (đổi IP node, tái tạo cluster do disaster) mà cert cũ (server cert của etcd) ký cho IP/hostname cũ, apiserver/etcd-member khác sẽ **TLS handshake fail** — cần generate lại cert cho đúng SAN (Subject Alternative Name) khớp địa chỉ mới, hoặc restore đúng luôn cả bộ PKI cũ nếu hạ tầng network y hệt.
3. **`--name` không khớp**: mỗi etcd member có tên duy nhất trong cluster (`--name=etcd-1`) gắn với dữ liệu Raft log — nếu restore mà đặt sai tên hoặc để trùng tên giữa các member, Raft consensus sẽ conflict, cluster etcd **không bao giờ đạt quorum**, mọi request tới apiserver bị treo timeout.

**Vì sao restore etcd không đồng nghĩa cluster hoạt động lại ngay**:
- **kube-controller-manager/scheduler cache reconcile lại từ đầu** — sau khi etcd sống lại với dữ liệu tại thời điểm backup, mọi thay đổi xảy ra **sau** thời điểm đó (Pod mới tạo, Pod bị xóa, scale...) **biến mất khỏi etcd nhưng vẫn tồn tại thực tế trên node** (nếu node chưa bị ảnh hưởng) — gây ra **trạng thái không nhất quán tạm thời**: có Pod chạy thật nhưng etcd "không biết", controller sẽ cố tạo lại Pod tưởng bị thiếu → tạo trùng, hoặc cố xóa resource mà thực tế cần giữ.
- **Token/Secret xoay vòng** (nếu có external secret rotation) tạo sau thời điểm backup **không còn trong etcd đã restore** — ứng dụng dùng Secret mới sẽ fail decrypt/auth cho tới khi đồng bộ lại.
- **CNI/IPAM state**: một số CNI plugin lưu trạng thái cấp phát IP ở nơi khác etcd (hoặc trong etcd riêng của CNI) — restore etcd chính không tự đồng bộ IPAM, có thể gây **trùng IP** giữa Pod cũ (ghost, vẫn chạy) và Pod mới do controller tạo lại.
- Do đó restore etcd trong disaster recovery thực tế luôn cần đi kèm **kiểm tra và reconcile thủ công** giữa trạng thái etcd vừa restore và trạng thái vật lý thực tế của node/Pod/network, không phải một thao tác "restore xong là xong".

## Detailed Answer (EN)
**Production-grade backup strategy**:
1. **Regular snapshots stored off-cluster**: use `etcdctl snapshot save` run via a CronJob (or a tool like Velero with an etcd plugin), pushing snapshots to **object storage outside the cluster** (S3, GCS) — backups stored inside the same cluster/node are useless if the entire cluster/datacenter goes down.
2. **Frequency**: driven by RPO requirements — typically every 15-30 minutes for critical clusters, with a retention policy (keep the last 7-30 snapshots plus some longer-term daily/weekly ones).
3. **Test restores regularly** (very often skipped): a backup that's never restore-tested isn't really a backup — run periodic (quarterly) DR drills restoring onto a staging cluster to confirm the snapshot actually works.
4. **Monitor integrity**: alert if the backup job fails or if a snapshot's size is abnormal (suddenly much smaller than average = suspect missing data).
5. On managed Kubernetes (EKS/GKE/AKS), etcd is managed by the cloud vendor — you don't back up etcd directly, but you should still back up **resource YAML** via GitOps or Velero (backing up at the Kubernetes-object layer, not raw etcd data) as a second line of defense.

```bash
ETCDCTL_API=3 etcdctl snapshot save /backup/snap-$(date +%Y%m%d%H%M).db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key
aws s3 cp /backup/snap-*.db s3://k8s-etcd-backup/prod/
```

**Restoring in practice** — not as simple as "copy the file over":
```bash
ETCDCTL_API=3 etcdctl snapshot restore /backup/snap-20260101.db \
  --data-dir=/var/lib/etcd-restored \
  --name=etcd-1 \
  --initial-cluster="etcd-1=https://10.0.0.1:2380,etcd-2=https://10.0.0.2:2380,etcd-3=https://10.0.0.3:2380" \
  --initial-cluster-token=etcd-cluster-restore \
  --initial-advertise-peer-urls=https://10.0.0.1:2380
```
Then point etcd's static Pod manifest at the new `--data-dir` and restart etcd on **every member**.

**Problems from forgetting TLS/member ID updates — the heart of this senior-level question**:
1. **A snapshot restore creates a logically NEW etcd cluster** (a different `initial-cluster-token`, a freshly generated cluster ID) even though the data is old — if you restore on only one node and then try to rejoin other etcd nodes still running with the old cluster ID, they will **refuse to handshake** (cluster ID mismatch) because Raft treats it as an entirely different cluster — you must restore **simultaneously on every member** with a consistent `initial-cluster` config.
2. **TLS certificates**: if the snapshot is restored onto new infrastructure (changed node IPs, cluster rebuilt after a disaster) but the old cert (etcd's server cert) was signed for the old IPs/hostnames, TLS handshakes between the apiserver/other etcd members will **fail** — you must regenerate certs with the correct SAN (Subject Alternative Names) matching the new addresses, or restore the entire old PKI bundle if the network topology is identical.
3. **Mismatched `--name`**: every etcd member has a unique name in the cluster (`--name=etcd-1`) tied to its Raft log data — restoring with a wrong or duplicate name across members causes Raft consensus conflicts, and the etcd cluster **never reaches quorum**, leaving every apiserver request hanging on timeout.

**Why restoring etcd doesn't mean the cluster is immediately fully working**:
- **kube-controller-manager/scheduler caches must reconcile from scratch** — once etcd comes back with data from the backup's point in time, every change that happened **after** that point (Pods created, Pods deleted, scaling...) has **vanished from etcd but may still physically exist on nodes** (if those nodes weren't affected) — creating a **temporary inconsistent state**: a Pod is actually running but etcd "doesn't know" about it, so controllers try to recreate what they think is a missing Pod → duplicates, or try to delete resources that are actually still needed.
- **Rotated tokens/Secrets** (if external secret rotation is in play) created after the backup point **are no longer in the restored etcd** — apps using the newer Secret will fail decryption/auth until things resync.
- **CNI/IPAM state**: some CNI plugins store IP allocation state somewhere other than the main etcd (or in their own separate etcd) — restoring the main etcd doesn't auto-sync IPAM, potentially causing **IP collisions** between ghost old Pods (still running) and new Pods the controllers recreate.
- As a result, restoring etcd during a real disaster recovery always requires **manual verification and reconciliation** between the just-restored etcd state and the actual physical state of nodes/Pods/network — it's never a "restore and done" operation.
