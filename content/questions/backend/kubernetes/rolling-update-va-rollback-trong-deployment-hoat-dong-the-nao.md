---
id: rolling-update-va-rollback-trong-deployment-hoat-dong-the-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rolling update và rollback trong Deployment hoạt động thế nào?

## Question (EN)
How do rolling updates and rollbacks work in a Deployment?

## Đáp án chi tiết (VI)
**Rolling update** (chiến lược mặc định): Deployment thay pod cũ bằng pod mới **từng phần**, không downtime.\
\
- Điều khiển bằng `maxUnavailable` (tối đa bao nhiêu pod được thiếu) và `maxSurge` (tối đa bao nhiêu pod dư tạm thời).\
- Deployment tạo ReplicaSet mới, tăng dần pod mới trong khi giảm pod cũ; nếu pod mới không **ready** (readiness probe) thì dừng lại.\
\
**Rollback**: Deployment giữ lịch sử ReplicaSet → `kubectl rollout undo` quay về phiên bản trước khi bản mới lỗi. `kubectl rollout status`/`history` để theo dõi.\
\
Chiến lược thay thế: `Recreate` (tắt hết pod cũ rồi mới bật mới — có downtime, dùng khi không chạy song song 2 version được).

## Detailed Answer (EN)
A **rolling update** (the default strategy) replaces old pods with new ones **incrementally**, with no downtime.\
\
- Controlled by `maxUnavailable` (how many pods may be missing) and `maxSurge` (how many extra pods may exist temporarily).\
- The Deployment creates a new ReplicaSet, ramping up new pods while ramping down old ones; it halts if new pods are not **ready** (readiness probe).\
\
**Rollback**: the Deployment keeps ReplicaSet history → `kubectl rollout undo` reverts to the previous revision when a new one is bad. Use `kubectl rollout status`/`history` to track.\
\
Alternative strategy: `Recreate` (kill all old pods, then start new ones — has downtime, used when two versions cannot run at once).
