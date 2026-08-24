---
id: persistentvolume-persistentvolumeclaim-va-storageclass-khac-nhau-the-nao
position: backend
technology: workloads-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PersistentVolume, PersistentVolumeClaim và StorageClass khác nhau thế nào?

## Question (EN)
How are PersistentVolume, PersistentVolumeClaim and StorageClass different?

## Đáp án chi tiết (VI)
PersistentVolume là storage resource trong cluster. PersistentVolumeClaim là yêu cầu storage từ workload. StorageClass định nghĩa cách provision storage động như disk type, reclaim policy hoặc provisioner.\
\
Ví dụ PVC:\
```yaml\
apiVersion: v1\
kind: PersistentVolumeClaim\
metadata:\
  name: data\
spec:\
  accessModes: [\\"ReadWriteOnce\\"]\
  resources:\
    requests:\
      storage: 10Gi\
```\
Stateful app cần backup, restore, resize và migration strategy. PVC chỉ cấp storage, không tự giải quyết durability của dữ liệu.

## Detailed Answer (EN)
A PersistentVolume is a storage resource in the cluster. A PersistentVolumeClaim is a workload request for storage. A StorageClass defines how dynamic storage is provisioned, such as disk type, reclaim policy or provisioner.\
\
PVC example:\
```yaml\
apiVersion: v1\
kind: PersistentVolumeClaim\
metadata:\
  name: data\
spec:\
  accessModes: [\\"ReadWriteOnce\\"]\
  resources:\
    requests:\
      storage: 10Gi\
```\
A stateful app needs backup, restore, resize and migration strategy. A PVC only provides storage; it does not make data durable by itself.
