---
id: consistent-hashing-la-gi-va-giai-quyet-van-de-gi
position: system-design
technology: distributed-systems
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consistent hashing là gì và giải quyết vấn đề gì?

## Question (EN)
What is consistent hashing and what problem does it solve?

## Đáp án chi tiết (VI)
Vấn đề với **hash chia dư (modulo)** (`hash(key) % N`): khi số node `N` thay đổi (thêm/bớt server), **gần như mọi key bị ánh xạ lại** sang node khác → cache trống hàng loạt, phải di chuyển lượng dữ liệu khổng lồ. Rất tệ khi cluster co giãn thường xuyên.\
\
**Consistent hashing** đặt cả **key và node** lên một **vòng băm (hash ring)**. Mỗi key thuộc về node **kế tiếp theo chiều kim đồng hồ** trên vòng. Khi thêm/bớt một node, **chỉ các key nằm giữa node đó và node liền trước** bị ánh xạ lại — trung bình chỉ khoảng **1/N** số key phải di chuyển, phần còn lại giữ nguyên.\
\
**Virtual node** (mỗi node vật lý xuất hiện nhiều điểm trên vòng) giúp **cân bằng tải** đều hơn và giảm lệch khi node có sức chứa khác nhau.\
\
Ứng dụng: **distributed cache** (Memcached client), **database phân tán** (Cassandra, DynamoDB) để phân bổ partition, và **load balancer** cần giữ client về đúng node. Đây là công cụ nền tảng để cluster **co giãn mượt** mà không phải xáo trộn toàn bộ.

## Detailed Answer (EN)
The problem with **simple modulo hashing** (`hash(key) % N`): when the node count `N` changes (add/remove a server), **almost every key is remapped** to a different node → mass cache misses and huge data movement. Terrible when the cluster scales frequently.\
\
**Consistent hashing** places both **keys and nodes** on a **hash ring**. Each key belongs to the **next node clockwise** on the ring. When a node is added/removed, **only the keys between that node and its predecessor** are remapped — on average only about **1/N** of keys move, the rest stay put.\
\
**Virtual nodes** (each physical node appearing at many points on the ring) give more **even load balancing** and reduce skew when nodes have different capacities.\
\
Applications: **distributed caches** (Memcached clients), **distributed databases** (Cassandra, DynamoDB) for partition placement, and **load balancers** needing to pin clients to the right node. It is a foundational tool for letting a cluster **scale smoothly** without reshuffling everything.
