---
id: file-system-hoat-dong-the-nao-so-sanh-ext4-ntfs-va-apfs
position: backend
technology: memory-\u0026-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File system hoạt động thế nào? So sánh ext4, NTFS và APFS.

## Question (EN)
How does a file system work? Compare ext4, NTFS, and APFS.

## Đáp án chi tiết (VI)
File system quản lý cách data được lưu trên storage: cấu trúc directory tree, metadata (inode: permissions/timestamps/size/data block pointers), free space management, journaling để tránh corruption khi crash.\
\
ext4 (Linux): journaling filesystem, extents thay vì block maps, delayed allocation, dir_index (HTree), max file 16TB, max volume 1EB — workhorse của Linux servers, stable và battle-tested. NTFS (Windows): journaling, Master File Table (MFT), support NTFS permissions/ACL, Alternate Data Streams, compression/encryption built-in, max 16EB — nhưng Linux support read/write NTFS qua ntfs-3g/ntfs3. APFS (Apple): Copy-on-Write (không corrupt khi crash), native encryption, snapshots (Time Machine), clones (copy-on-write files — cp instant), space sharing giữa volumes trong container — optimized cho SSD/Flash.\
\
Thực tế DevOps: Docker image layers dùng overlay2 filesystem; ZFS (FreeBSD/Linux) thêm checksums và RAID tích hợp cho NAS; volume mount giữa host và container cần match permissions.

## Detailed Answer (EN)
$88
