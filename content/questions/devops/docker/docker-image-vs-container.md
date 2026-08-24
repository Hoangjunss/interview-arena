---
id: docker-image-vs-container
position: devops
technology: docker
level: junior
tags: [docker, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa Docker image và Docker container là gì?

## Question (EN)
What is the difference between a Docker image and a Docker container?

## Đáp án chi tiết (VI)
**Docker image** là một bản đóng gói tĩnh, **chỉ đọc (read-only)**, gồm nhiều lớp (layer) xếp chồng lên nhau: filesystem của ứng dụng, thư viện, biến môi trường, entrypoint/cmd mặc định... Image được build từ Dockerfile và lưu trong registry (Docker Hub, ECR, Harbor...). Image **không chạy** — nó chỉ là "khuôn mẫu".

**Docker container** là một **instance đang chạy** (hoặc đã dừng) được tạo ra từ image đó. Khi `docker run` một image, Docker sinh ra:
- Một **writable layer** mỏng nằm trên các layer read-only của image (copy-on-write) — mọi thay đổi file trong lúc chạy (ghi log, tạo file tạm...) đều nằm ở lớp này.
- Một **network namespace**, **PID namespace**, **mount namespace** riêng (cô lập bằng Linux namespaces + cgroups).
- Một process gốc (PID 1) chạy entrypoint/cmd của image.

Mối quan hệ: **1 image → N container**. Nhiều container có thể chạy từ cùng một image mà không đụng nhau, vì mỗi container có writable layer riêng.

Ví dụ minh họa:
```bash
docker build -t myapp:1.0 .        # tạo image myapp:1.0 (chỉ đọc)
docker run -d --name c1 myapp:1.0  # container 1, writable layer riêng
docker run -d --name c2 myapp:1.0  # container 2, writable layer riêng, độc lập với c1
docker ps -a                        # liệt kê container (running + exited)
docker images                       # liệt kê image
```

**Điểm dễ nhầm / edge case:**
- `docker commit` có thể biến trạng thái hiện tại của container thành một image mới — nhưng đây là anti-pattern trong production vì mất tính reproducible (nên dùng Dockerfile).
- Xóa image (`docker rmi`) khi vẫn còn container tham chiếu tới nó sẽ báo lỗi "image is being used by stopped container" — phải `docker rm` container trước.
- Dữ liệu ghi vào writable layer sẽ **mất khi container bị xóa** (`docker rm`), không phải khi container dừng (`docker stop`) — đây là lý do cần **volume** cho dữ liệu cần bền vững.
- Container dừng vẫn tồn tại trên đĩa (chiếm dung lượng writable layer) cho tới khi bị `docker rm`; container "chạy" chỉ khác container "dừng" ở chỗ tiến trình PID 1 còn sống hay không.
- `docker diff <container>` cho thấy chính xác những file nào đã bị thêm/sửa/xóa ở writable layer so với image gốc — hữu ích khi debug "container này đã ghi gì ra đĩa".
- Nhiều container chạy chung một image **chia sẻ chung các layer read-only trên đĩa** (Docker dùng content-addressable storage, mỗi layer chỉ lưu một lần) — đây là lý do chạy 10 container từ cùng image không tốn 10 lần dung lượng image, mà chỉ tốn thêm 10 writable layer nhỏ.
- Image tuân theo **OCI Image Spec** (Open Container Initiative) — vì vậy image build bằng Docker có thể chạy được trên containerd, Podman, CRI-O... không bị khóa vào riêng Docker runtime.

So sánh nhanh:

| Khía cạnh | Image | Container |
|---|---|---|
| Trạng thái | Tĩnh, read-only | Động, có writable layer |
| Vòng đời | Tồn tại độc lập trong registry/local | Được tạo từ image, có thể start/stop/rm |
| Lệnh tạo | `docker build` / `docker pull` | `docker create` / `docker run` |
| Lưu trữ | Layer chia sẻ, content-addressable | Layer riêng + writable layer + namespaces |
| Xóa dữ liệu | Không áp dụng | Mất dữ liệu writable layer khi `docker rm` |

## Detailed Answer (EN)
A **Docker image** is a static, **read-only** package made of stacked layers: application filesystem, libraries, env vars, default entrypoint/cmd, etc. It's built from a Dockerfile and stored in a registry (Docker Hub, ECR, Harbor...). An image **does not run** — it is just a template.

A **Docker container** is a **running (or stopped) instance** created from that image. When you `docker run` an image, Docker creates:
- A thin **writable layer** on top of the image's read-only layers (copy-on-write) — any runtime file changes (logs, temp files...) live in this layer.
- Its own **network namespace**, **PID namespace**, **mount namespace** (isolated via Linux namespaces + cgroups).
- A root process (PID 1) running the image's entrypoint/cmd.

Relationship: **1 image → N containers**. Multiple containers can run from the same image without interfering, because each has its own writable layer.

Example:
```bash
docker build -t myapp:1.0 .        # build image myapp:1.0 (read-only)
docker run -d --name c1 myapp:1.0  # container 1, own writable layer
docker run -d --name c2 myapp:1.0  # container 2, own writable layer, independent of c1
docker ps -a                        # list containers (running + exited)
docker images                       # list images
```

**Common pitfalls / edge cases:**
- `docker commit` can turn a container's current state into a new image — this is an anti-pattern in production since it breaks reproducibility (prefer Dockerfile-based builds).
- Removing an image (`docker rmi`) while a stopped container still references it fails with "image is being used by stopped container" — you must `docker rm` the container first.
- Data written to the writable layer is **lost when the container is removed** (`docker rm`), not merely when it's stopped (`docker stop`) — this is exactly why you need a **volume** for data that must survive.
- A stopped container still exists on disk (its writable layer still takes space) until `docker rm`; "running" vs "stopped" only reflects whether the PID 1 process is alive.
- `docker diff <container>` shows exactly which files were added/changed/deleted in the writable layer versus the base image — useful for debugging "what did this container actually write to disk".
- Multiple containers from the same image **share the same read-only layers on disk** (Docker uses content-addressable storage, each layer stored once) — this is why running 10 containers from one image doesn't cost 10x the image size, only 10 small extra writable layers.
- Images follow the **OCI Image Spec** (Open Container Initiative), so an image built with Docker can run on containerd, Podman, CRI-O, etc. — it isn't locked to the Docker runtime specifically.

Quick comparison:

| Aspect | Image | Container |
|---|---|---|
| State | Static, read-only | Dynamic, has a writable layer |
| Lifecycle | Exists independently in registry/local | Created from an image, can be started/stopped/removed |
| Creation command | `docker build` / `docker pull` | `docker create` / `docker run` |
| Storage | Shared, content-addressable layers | Own layers + writable layer + namespaces |
| Data loss | N/A | Writable layer data lost on `docker rm` |
