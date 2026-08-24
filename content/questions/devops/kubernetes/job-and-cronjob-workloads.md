---
id: job-and-cronjob-workloads
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, workloads, batch]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Job và CronJob khác Deployment ở đâu? Giải thích các field quan trọng (`backoffLimit`, `completions`, `parallelism`, `concurrencyPolicy`) và một gotcha thường gặp với CronJob.

## Question (EN)
How do Job and CronJob differ from a Deployment? Explain the important fields (`backoffLimit`, `completions`, `parallelism`, `concurrencyPolicy`) and a common CronJob gotcha.

## Đáp án chi tiết (VI)
**Deployment** kỳ vọng Pod chạy **mãi mãi** (long-running process) — nếu Pod exit (kể cả exit 0), Deployment coi đó là bất thường và tạo lại. **Job** thì ngược lại: kỳ vọng Pod **chạy xong rồi kết thúc thành công (exit 0)**, dùng cho tác vụ một lần (migration DB, xử lý batch, gửi report).

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
spec:
  backoffLimit: 3          # retry tối đa 3 lần nếu Pod fail trước khi đánh dấu Job Failed
  activeDeadlineSeconds: 600  # timeout toàn Job sau 10 phút
  completions: 1            # cần đúng 1 Pod chạy thành công
  parallelism: 1            # chạy tối đa 1 Pod cùng lúc
  template:
    spec:
      restartPolicy: Never   # hoặc OnFailure — Job KHÔNG được dùng Always
      containers:
        - name: migrate
          image: myrepo/migrate:1.0
```

**Giải thích field quan trọng**:
- **`backoffLimit`**: số lần retry tối đa khi Pod fail, có exponential backoff giữa các lần — vượt quá thì Job chuyển `Failed`.
- **`completions`**: cần bao nhiêu Pod **chạy thành công** để Job coi là hoàn tất (dùng cho xử lý song song nhiều item độc lập, VD 100 file cần xử lý → `completions: 100`).
- **`parallelism`**: số Pod được phép chạy **đồng thời** tại 1 thời điểm (VD `completions: 100, parallelism: 10` → xử lý 10 item cùng lúc cho tới khi đủ 100).
- **`restartPolicy`**: Job chỉ chấp nhận `Never` hoặc `OnFailure` — `Never` tạo Pod mới khi fail (giữ lại Pod cũ để xem log), `OnFailure` restart container ngay trong cùng Pod.

**CronJob** = Job + lịch chạy theo cú pháp cron:
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-report
spec:
  schedule: "0 2 * * *"      # 2h sáng mỗi ngày (theo giờ kube-controller-manager, thường UTC)
  concurrencyPolicy: Forbid  # xem giải thích bên dưới
  startingDeadlineSeconds: 100
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 3
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: report
              image: myrepo/report:1.0
```

**`concurrencyPolicy`** — 3 giá trị, hay bị hỏi khi job chạy lâu hơn chu kỳ:
- **`Allow`** (mặc định): cho phép nhiều Job chạy chồng lên nhau nếu lần trước chưa xong khi tới lịch tiếp theo.
- **`Forbid`**: bỏ qua lần chạy mới nếu lần trước **vẫn đang chạy**.
- **`Replace`**: hủy Job đang chạy, thay bằng Job mới.

**Gotcha thường gặp**:
1. **Múi giờ**: `schedule` mặc định tính theo **UTC** của kube-controller-manager (không phải múi giờ node hay locale user) — dễ gây lệch giờ chạy thực tế nếu team không để ý (Kubernetes 1.27+ hỗ trợ `timeZone` field để chỉ định rõ, nên dùng thay vì tự tính offset).
2. **Job không tự dọn Pod đã hoàn thành**: Pod của Job `Completed` vẫn tồn tại trong cluster (để xem log) cho tới khi bị xóa thủ công hoặc Job bị xóa — tích lũy hàng nghìn CronJob chạy lâu ngày mà không set `successfulJobsHistoryLimit`/`ttlSecondsAfterFinished` sẽ làm **phình etcd** và làm chậm `kubectl get pods` toàn namespace.
3. **`Forbid` không đảm bảo "at most once" tuyệt đối**: nếu kube-controller-manager bị restart đúng lúc, có khả năng nhỏ 2 Job chạy chồng — job cần tự thiết kế **idempotent** (an toàn khi chạy trùng), không nên dựa hoàn toàn vào `concurrencyPolicy` cho tác vụ có side-effect quan trọng như tính tiền/gửi email.
4. Nên set `ttlSecondsAfterFinished` (feature từ 1.23 ổn định) trên `jobTemplate` để tự động dọn Job/Pod sau X giây hoàn thành, thay vì dựa vào `*JobsHistoryLimit` (chỉ giới hạn số Job giữ lại, không tự xóa theo thời gian).

## Detailed Answer (EN)
A **Deployment** expects Pods to run **forever** (a long-running process) — if a Pod exits (even with exit 0), the Deployment treats it as abnormal and recreates it. A **Job** is the opposite: it expects the Pod to **run to completion and succeed (exit 0)**, used for one-off tasks (DB migrations, batch processing, report generation).

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
spec:
  backoffLimit: 3          # retry up to 3 times if the Pod fails before marking the Job Failed
  activeDeadlineSeconds: 600  # whole-Job timeout after 10 minutes
  completions: 1            # needs exactly 1 successful Pod
  parallelism: 1            # at most 1 Pod running at a time
  template:
    spec:
      restartPolicy: Never   # or OnFailure — a Job cannot use Always
      containers:
        - name: migrate
          image: myrepo/migrate:1.0
```

**Key field explanations**:
- **`backoffLimit`**: max retry count when a Pod fails, with exponential backoff between attempts — exceed it and the Job becomes `Failed`.
- **`completions`**: how many Pods must **succeed** for the Job to be considered done (useful for processing many independent items in parallel, e.g. 100 files to process → `completions: 100`).
- **`parallelism`**: how many Pods may run **concurrently** at once (e.g. `completions: 100, parallelism: 10` → process 10 items at a time until 100 are done).
- **`restartPolicy`**: a Job only accepts `Never` or `OnFailure` — `Never` creates a new Pod on failure (keeping the old one around for log inspection), `OnFailure` restarts the container within the same Pod.

**CronJob** = Job + a cron schedule:
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-report
spec:
  schedule: "0 2 * * *"      # 2am daily (per kube-controller-manager's clock, usually UTC)
  concurrencyPolicy: Forbid  # explained below
  startingDeadlineSeconds: 100
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 3
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: report
              image: myrepo/report:1.0
```

**`concurrencyPolicy`** — three values, commonly asked about when jobs run longer than their schedule interval:
- **`Allow`** (default): lets multiple Job runs overlap if the previous one hasn't finished by the next scheduled time.
- **`Forbid`**: skips the new run if the previous one is **still running**.
- **`Replace`**: cancels the currently-running Job, replacing it with the new one.

**Common gotchas**:
1. **Time zone**: `schedule` is evaluated in the kube-controller-manager's **UTC** clock by default (not the node's or the user's local time zone) — easy to misjudge actual run times if a team isn't careful (Kubernetes 1.27+ supports a `timeZone` field to specify it explicitly — prefer that over manually computing offsets).
2. **A Job doesn't auto-clean its completed Pods**: `Completed` Job Pods stay in the cluster (for log inspection) until manually deleted or the Job itself is deleted — accumulating thousands of long-running CronJobs without `successfulJobsHistoryLimit`/`ttlSecondsAfterFinished` will **bloat etcd** and slow down `kubectl get pods` across the namespace.
3. **`Forbid` does not guarantee strict "at most once"**: if kube-controller-manager restarts at the wrong moment, there's a small chance two Job runs overlap — jobs should be designed to be **idempotent** (safe to run twice), never relying entirely on `concurrencyPolicy` for tasks with important side effects like billing or sending emails.
4. Prefer setting `ttlSecondsAfterFinished` (stable since 1.23) on the `jobTemplate` to auto-clean Jobs/Pods X seconds after completion, rather than relying on `*JobsHistoryLimit` (which only caps how many Jobs are kept, not a time-based cleanup).
