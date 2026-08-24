---
id: crashloopbackoff-debugging
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, debugging, troubleshooting]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi thấy Pod ở trạng thái `CrashLoopBackOff`, bạn sẽ debug theo quy trình như thế nào? Liệt kê các nguyên nhân phổ biến nhất.

## Question (EN)
When you see a Pod in `CrashLoopBackOff`, what's your debugging process? List the most common root causes.

## Đáp án chi tiết (VI)
`CrashLoopBackOff` **không phải là lỗi**, mà là **trạng thái mô tả** container liên tục restart và kubelet đang áp dụng exponential backoff (10s, 20s, 40s... tối đa 5 phút) trước lần restart tiếp theo để tránh restart loop quá nhanh gây tốn tài nguyên.

**Quy trình debug chuẩn**:
```bash
# Bước 1: xem tổng quan — Restart Count, Last State, Reason
kubectl get pod <pod>
kubectl describe pod <pod>
# chú ý các field: Last State (Reason: Error/OOMKilled), Exit Code, Events

# Bước 2: xem log LẦN CHẠY TRƯỚC (quan trọng nhất — container hiện tại có thể chưa kịp log gì)
kubectl logs <pod> --previous
kubectl logs <pod> --previous -c <container>   # nếu multi-container

# Bước 3: nếu log không đủ, exec vào thử chạy tay (chỉ được nếu container còn sống đủ lâu)
kubectl exec -it <pod> -- sh

# Bước 4: kiểm tra resource — có bị OOMKilled không
kubectl get pod <pod> -o jsonpath='{.status.containerStatuses[0].lastState.terminated.reason}'
# "OOMKilled" => tăng memory limits hoặc fix memory leak

# Bước 5: kiểm tra readiness/liveness probe config có quá khắt khe không
kubectl get pod <pod> -o yaml | grep -A10 livenessProbe
```

**Các nguyên nhân phổ biến nhất, xếp theo tần suất gặp thực tế**:

| Nguyên nhân | Dấu hiệu nhận biết | Cách fix |
|---|---|---|
| **App crash ngay khi start** (lỗi code, thiếu env var, sai config, exception unhandled ở main) | `logs --previous` có stack trace rõ ràng, Exit Code khác 0 | Fix code/config, đảm bảo required env var được inject |
| **OOMKilled** (Exit Code 137) | `lastState.terminated.reason: OOMKilled`, log thường trống hoặc cắt cụt | Tăng `resources.limits.memory`, hoặc fix memory leak trong app |
| **Liveness probe fail liên tục** | `describe pod` có event "Liveness probe failed", app vẫn log bình thường nhưng bị kill | Tăng `initialDelaySeconds`/`failureThreshold`, hoặc endpoint probe bị lỗi/quá chậm |
| **Sai lệnh khởi động** (`command`/`args` sai, hoặc entrypoint image không tồn tại) | Exit Code 127 (command not found) hoặc 126 | Kiểm tra lại `command`/`args`, test image local bằng `docker run` |
| **Thiếu dependency lúc startup** (DB/service phụ thuộc chưa sẵn sàng, app không retry mà exit thẳng) | Log báo "connection refused" rồi process exit | Thêm `initContainer` chờ dependency, hoặc thêm retry logic trong app thay vì fail-fast |
| **Container không phải long-running process** (image dành cho CLI/batch nhưng chạy như Deployment) | Container start → chạy lệnh → exit 0 ngay → bị coi là crash vì Deployment kỳ vọng process chạy mãi | Dùng Job/CronJob thay vì Deployment cho tác vụ một lần |
| **Permission denied** (chạy non-root nhưng cần ghi file ở path không có quyền) | Log "permission denied" khi ghi file/log | Set `securityContext.runAsUser` đúng, hoặc mount `emptyDir` writable |

**Mẹo hay bị hỏi thêm**: nếu container fail **quá nhanh** (dưới 1 giây), `kubectl logs` đôi khi race-condition không kịp lấy log — dùng `kubectl logs <pod> --previous --timestamps` và tăng terminationGracePeriod tạm thời, hoặc set tạm `command: ["sleep", "3600"]` để vào exec debug môi trường runtime (biến môi trường, file mount, network) mà không bị crash loop che mất.

## Detailed Answer (EN)
`CrashLoopBackOff` is **not an error itself** — it's a **status description**: the container keeps restarting and kubelet is applying exponential backoff (10s, 20s, 40s... up to 5 minutes) before the next restart attempt to avoid wasting resources on a rapid restart loop.

**Standard debugging process**:
```bash
# Step 1: overview — Restart Count, Last State, Reason
kubectl get pod <pod>
kubectl describe pod <pod>
# check: Last State (Reason: Error/OOMKilled), Exit Code, Events

# Step 2: check logs from the PREVIOUS run (most important — the current instance may not have logged anything yet)
kubectl logs <pod> --previous
kubectl logs <pod> --previous -c <container>   # if multi-container

# Step 3: if logs aren't enough, try exec'ing in (only works if the container stays up long enough)
kubectl exec -it <pod> -- sh

# Step 4: check for OOM
kubectl get pod <pod> -o jsonpath='{.status.containerStatuses[0].lastState.terminated.reason}'
# "OOMKilled" => raise memory limits or fix a memory leak

# Step 5: check whether the readiness/liveness probe config is too strict
kubectl get pod <pod> -o yaml | grep -A10 livenessProbe
```

**Most common root causes, ranked by real-world frequency**:

| Cause | Tell-tale sign | Fix |
|---|---|---|
| **App crashes on startup** (code bug, missing env var, bad config, unhandled exception in main) | `logs --previous` shows a clear stack trace, non-zero exit code | Fix code/config, ensure required env vars are injected |
| **OOMKilled** (exit code 137) | `lastState.terminated.reason: OOMKilled`, logs often empty or truncated | Raise `resources.limits.memory`, or fix the app's memory leak |
| **Liveness probe repeatedly failing** | `describe pod` shows "Liveness probe failed" events, app logs look normal but it keeps getting killed | Increase `initialDelaySeconds`/`failureThreshold`, or fix a broken/too-slow probe endpoint |
| **Wrong startup command** (bad `command`/`args`, or entrypoint doesn't exist in the image) | Exit code 127 (command not found) or 126 | Double-check `command`/`args`, test the image locally with `docker run` |
| **Missing dependency at startup** (a DB/upstream service isn't ready yet, app exits instead of retrying) | Logs show "connection refused" then the process exits | Add an `initContainer` to wait for the dependency, or add retry logic instead of failing fast |
| **Container isn't a long-running process** (image built for a CLI/batch job but run as a Deployment) | Container starts → runs a command → exits 0 immediately → treated as a crash because a Deployment expects a persistent process | Use a Job/CronJob instead of a Deployment for one-off tasks |
| **Permission denied** (running as non-root but needs to write to a path it can't) | Logs show "permission denied" on file/log writes | Set `securityContext.runAsUser` correctly, or mount a writable `emptyDir` |

**A point often probed further**: if a container fails **very fast** (under a second), `kubectl logs` can sometimes race and miss the output — use `kubectl logs <pod> --previous --timestamps`, or temporarily override `command: ["sleep", "3600"]` to exec in and inspect the runtime environment (env vars, mounted files, network) without the crash loop obscuring things.
