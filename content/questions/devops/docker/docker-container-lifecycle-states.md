---
id: docker-container-lifecycle-states
position: devops
technology: docker
level: junior
tags: [docker, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mô tả vòng đời (lifecycle) của một Docker container, từ lúc tạo tới lúc bị xóa. Các trạng thái chính là gì?

## Question (EN)
Describe a Docker container's lifecycle, from creation to removal. What are the main states?

## Đáp án chi tiết (VI)
Một container đi qua các trạng thái chính sau (`docker ps -a` cột `STATUS` phản ánh các trạng thái này):

| Trạng thái | Lệnh liên quan | Ý nghĩa |
|---|---|---|
| **Created** | `docker create` | Container đã được tạo (allocate filesystem, network) nhưng **chưa chạy** process |
| **Running** | `docker start` / `docker run` | Process chính (PID 1) đang chạy |
| **Paused** | `docker pause` | Tất cả process trong container bị "đóng băng" bằng cgroup freezer, không nhận CPU time nhưng vẫn giữ nguyên state trong RAM |
| **Stopped/Exited** | `docker stop` (SIGTERM → SIGKILL sau timeout) hoặc process tự thoát | Process chính đã kết thúc, container vẫn tồn tại trên đĩa (writable layer còn đó) |
| **Removed** | `docker rm` | Container và writable layer bị xóa hẳn, không thể khôi phục |

Sơ đồ luồng cơ bản:
```
docker create → [Created] --start--> [Running] --pause--> [Paused] --unpause--> [Running]
                                         |
                                    stop/kill/exit
                                         v
                                     [Exited] --rm--> [Removed]
```

Ví dụ minh họa:
```bash
docker create --name c1 nginx        # trạng thái: Created
docker start c1                      # trạng thái: Running
docker pause c1                      # trạng thái: Paused
docker unpause c1                    # trạng thái: Running
docker stop c1                       # SIGTERM, chờ tối đa 10s, rồi SIGKILL nếu chưa thoát -> Exited
docker start c1                      # có thể start lại container đã exit (giữ nguyên writable layer)
docker rm c1                         # xóa hẳn
```

**Khác biệt quan trọng cần nêu khi phỏng vấn:**
- `docker stop` gửi **SIGTERM trước, đợi grace period (mặc định 10s, chỉnh bằng `-t`)**, rồi mới gửi **SIGKILL** nếu process chưa thoát — khác với `docker kill` gửi SIGKILL (hoặc signal tùy chọn) ngay lập tức.
- Container `Exited` **không mất dữ liệu ghi vào writable layer** — chỉ mất khi bị `docker rm`. Đây là điểm hay bị nhầm với việc dừng container là "reset" container.
- Container với `restart: always`/`unless-stopped` (trong Compose) hoặc `--restart` flag sẽ **tự động chuyển lại Running** nếu bị exit ngoài ý muốn (crash) hoặc khi Docker daemon khởi động lại — nhưng `docker stop` thủ công thì sẽ **không** bị tự restart lại cho tới khi có `docker start` tường minh (trừ policy `always` thì có auto-start khi daemon khởi động lại).
- Có một trạng thái ẩn là **Dead** — xảy ra khi container gặp lỗi nghiêm trọng khi cố dừng (ví dụ storage driver lỗi), không thể start lại, chỉ có thể `docker rm -f`.

## Detailed Answer (EN)
A container goes through the following main states (reflected in `docker ps -a`'s `STATUS` column):

| State | Related command | Meaning |
|---|---|---|
| **Created** | `docker create` | Container has been created (filesystem, network allocated) but **hasn't started** any process |
| **Running** | `docker start` / `docker run` | The main process (PID 1) is running |
| **Paused** | `docker pause` | All processes in the container are "frozen" via the cgroup freezer — no CPU time, but state stays in RAM |
| **Stopped/Exited** | `docker stop` (SIGTERM → SIGKILL after timeout) or the process exits on its own | Main process has ended; the container still exists on disk (writable layer intact) |
| **Removed** | `docker rm` | Container and writable layer are permanently deleted, unrecoverable |

Basic flow diagram:
```
docker create → [Created] --start--> [Running] --pause--> [Paused] --unpause--> [Running]
                                         |
                                    stop/kill/exit
                                         v
                                     [Exited] --rm--> [Removed]
```

Example:
```bash
docker create --name c1 nginx        # state: Created
docker start c1                      # state: Running
docker pause c1                      # state: Paused
docker unpause c1                    # state: Running
docker stop c1                       # SIGTERM, wait up to 10s, then SIGKILL if not exited -> Exited
docker start c1                      # you can restart an exited container (writable layer preserved)
docker rm c1                         # permanently removed
```

**Important distinctions to mention in an interview:**
- `docker stop` sends **SIGTERM first, waits a grace period (default 10s, configurable via `-t`)**, then sends **SIGKILL** if the process hasn't exited — unlike `docker kill`, which sends SIGKILL (or a chosen signal) immediately.
- An `Exited` container **does not lose data written to the writable layer** — it's only lost on `docker rm`. This is often mistaken for stopping "resetting" the container.
- A container with `restart: always`/`unless-stopped` (in Compose) or the `--restart` flag will **automatically go back to Running** if it exits unexpectedly (crash) or when the Docker daemon restarts — but a manual `docker stop` will **not** be auto-restarted until an explicit `docker start` (except the `always` policy, which does auto-start on daemon restart).
- There's a hidden state called **Dead** — occurs when a container hits a fatal error while trying to stop (e.g., a storage driver failure); it can't be restarted, only removed with `docker rm -f`.
