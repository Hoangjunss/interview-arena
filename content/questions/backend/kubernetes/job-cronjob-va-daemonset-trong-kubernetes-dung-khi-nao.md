---
id: job-cronjob-va-daemonset-trong-kubernetes-dung-khi-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Job, CronJob và DaemonSet trong Kubernetes dùng khi nào?

## Question (EN)
When do you use a Job, a CronJob and a DaemonSet in Kubernetes?

## Đáp án chi tiết (VI)
Đây là các **workload controller** ngoài Deployment, cho những mẫu chạy khác nhau:\
\
- **Job**: chạy **tới khi hoàn thành (run-to-completion)** rồi dừng — hợp tác vụ **một lần**: migration DB, xử lý batch. Job **retry** cho tới khi đủ số pod thành công; hỗ trợ `completions`/`parallelism`.\
- **CronJob**: tạo **Job theo lịch cron** — hợp tác vụ **định kỳ**: backup hằng đêm, gửi báo cáo, dọn dữ liệu.\
- **DaemonSet**: đảm bảo **mỗi node (hoặc một tập node) chạy đúng một bản pod** — hợp **agent nền toàn cluster**: thu thập log (Fluentd), giám sát (node-exporter), CNI/network plugin.\
\
Khác **Deployment** (số replica tùy ý, chạy lâu dài, stateless): Job/CronJob **kết thúc**, còn DaemonSet **gắn số bản theo số node** thay vì một con số cố định.

## Detailed Answer (EN)
These are **workload controllers** beyond Deployment, for different run patterns:\
\
- **Job**: **runs to completion** then stops — for **one-off** tasks: DB migrations, batch processing. A Job **retries** until the required number of pods succeed; supports `completions`/`parallelism`.\
- **CronJob**: creates a **Job on a cron schedule** — for **periodic** tasks: nightly backups, reports, cleanup.\
- **DaemonSet**: ensures **every node (or a subset) runs exactly one pod** — for **cluster-wide background agents**: log collection (Fluentd), monitoring (node-exporter), CNI/network plugins.\
\
Unlike a **Deployment** (arbitrary replicas, long-running, stateless): Jobs/CronJobs **terminate**, and a DaemonSet **ties replica count to node count** rather than a fixed number.
