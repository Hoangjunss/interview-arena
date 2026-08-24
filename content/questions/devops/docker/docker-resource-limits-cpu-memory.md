---
id: docker-resource-limits-cpu-memory
position: devops
technology: docker
level: mid
tags: [docker, resource-management]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao giới hạn CPU và memory cho một container? Điều gì xảy ra nếu container vượt quá memory limit?

## Question (EN)
How do you limit CPU and memory for a container? What happens if a container exceeds its memory limit?

## Đáp án chi tiết (VI)
Docker dùng **cgroups (control groups)** của Linux kernel để giới hạn tài nguyên container có thể dùng.

**Giới hạn memory:**
```bash
docker run -d --memory=512m --memory-swap=512m myapp
```
- `--memory`: giới hạn RAM tối đa (bao gồm cả page cache của container).
- `--memory-swap`: tổng RAM + swap tối đa. Đặt bằng `--memory` để **tắt hẳn swap** cho container (khuyến nghị cho production vì swap làm chậm ứng dụng khó đoán được).
- `--memory-reservation`: soft limit — khi host thiếu RAM, kernel cố gắng ép container về mức này, nhưng không cứng như `--memory`.

**Giới hạn CPU:**
```bash
docker run -d --cpus=1.5 myapp              # tối đa 1.5 core
docker run -d --cpu-shares=512 myapp        # trọng số tương đối khi cạnh tranh CPU (mặc định 1024)
docker run -d --cpuset-cpus="0,1" myapp     # pin container vào core 0 và 1 cụ thể
```
- `--cpus`: giới hạn **cứng** (hard cap) — container không bao giờ dùng quá X core dù host còn rảnh.
- `--cpu-shares`: chỉ có ý nghĩa **khi có tranh chấp CPU** giữa nhiều container; nếu host rảnh, container vẫn có thể dùng 100% CPU dù share thấp.

Trong Docker Compose:
```yaml
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: "1.5"
          memory: 512M
        reservations:
          cpus: "0.5"
          memory: 256M
```

**Điều gì xảy ra khi vượt memory limit — OOM Kill:**
Khi container cố cấp phát vượt `--memory`, **Linux OOM Killer** (Out-Of-Memory Killer) sẽ can thiệp và **kill process** đang chiếm nhiều memory nhất trong cgroup đó (thường chính là process chính của app) bằng `SIGKILL` — **không graceful**, không có cơ hội cleanup.

```bash
docker inspect <container> --format='{{.State.OOMKilled}}'   # true nếu bị OOM kill
docker ps -a   # STATUS hiện "Exited (137)" — exit code 137 = 128 + SIGKILL(9)
```

**Lưu ý quan trọng khi debug OOM:**
- Exit code **137** gần như luôn là dấu hiệu của OOM kill (128 + signal 9) — nhưng cũng có thể do `docker kill` gửi SIGKILL thủ công, nên cần check `OOMKilled: true` để chắc chắn.
- JVM/Node.js cần **cấu hình heap size phù hợp với container limit**, không phải theo RAM vật lý của host — nếu không set `-Xmx` cho JVM hoặc `--max-old-space-size` cho Node phù hợp với `--memory`, ứng dụng có thể nghĩ nó có nhiều RAM hơn thực tế (đọc `/proc/meminfo` của host trong container cũ không hỗ trợ cgroup-awareness) và bị OOM kill liên tục dù chưa dùng hết heap logic của nó.
- Không set resource limit hoàn toàn ("no limit") là rủi ro lớn trong production multi-tenant — một container bị memory leak có thể ăn hết RAM host, kéo theo **các container khác trên cùng host cũng bị OOM kill** ("noisy neighbor" problem).

**CPU throttling (khác OOM):** nếu vượt `--cpus`, container **không bị kill**, chỉ bị **throttle** (giới hạn CPU time trong mỗi chu kỳ CFS scheduler), khiến ứng dụng chạy chậm lại nhưng vẫn sống — kiểm tra bằng:
```bash
docker stats myapp   # xem % CPU, memory usage real-time
```

## Detailed Answer (EN)
Docker uses the Linux kernel's **cgroups (control groups)** to limit the resources a container can use.

**Memory limits:**
```bash
docker run -d --memory=512m --memory-swap=512m myapp
```
- `--memory`: max RAM allowed (includes the container's page cache).
- `--memory-swap`: total RAM + swap allowed. Set equal to `--memory` to **fully disable swap** for the container (recommended in production, since swap causes unpredictable slowdowns).
- `--memory-reservation`: a soft limit — when the host runs low on RAM, the kernel tries to push the container toward this level, but it isn't enforced as strictly as `--memory`.

**CPU limits:**
```bash
docker run -d --cpus=1.5 myapp              # max 1.5 cores
docker run -d --cpu-shares=512 myapp        # relative weight during CPU contention (default 1024)
docker run -d --cpuset-cpus="0,1" myapp     # pin the container to specific cores 0 and 1
```
- `--cpus`: a **hard cap** — the container never uses more than X cores even if the host is idle.
- `--cpu-shares`: only matters **when there's CPU contention** among multiple containers; if the host is idle, the container can still use 100% CPU regardless of a low share value.

In Docker Compose:
```yaml
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: "1.5"
          memory: 512M
        reservations:
          cpus: "0.5"
          memory: 256M
```

**What happens when memory limit is exceeded — OOM Kill:**
When a container tries to allocate memory beyond `--memory`, the **Linux OOM Killer** (Out-Of-Memory Killer) steps in and **kills the process** consuming the most memory in that cgroup (usually the app's main process) with `SIGKILL` — **not graceful**, no chance to clean up.

```bash
docker inspect <container> --format='{{.State.OOMKilled}}'   # true if OOM-killed
docker ps -a   # STATUS shows "Exited (137)" — exit code 137 = 128 + SIGKILL(9)
```

**Important notes when debugging OOM:**
- Exit code **137** is almost always a sign of an OOM kill (128 + signal 9) — though it can also result from a manual `docker kill` sending SIGKILL, so check `OOMKilled: true` to be sure.
- JVM/Node.js need **heap sizes configured relative to the container limit**, not the host's physical RAM — if you don't set `-Xmx` for the JVM or `--max-old-space-size` for Node to match `--memory`, the app may think it has more RAM than it actually does (older runtimes reading the host's `/proc/meminfo` without cgroup-awareness), leading to repeated OOM kills even though its logical heap isn't full.
- Running with no resource limits at all is a major risk in multi-tenant production — a container with a memory leak can eat all of the host's RAM, causing **other containers on the same host to be OOM-killed too** (the "noisy neighbor" problem).

**CPU throttling (different from OOM):** if a container exceeds `--cpus`, it's **not killed**, only **throttled** (its CPU time per CFS scheduler period is capped), slowing it down but keeping it alive — check with:
```bash
docker stats myapp   # real-time CPU %, memory usage
```
