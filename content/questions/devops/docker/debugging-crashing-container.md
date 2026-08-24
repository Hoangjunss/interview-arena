---
id: debugging-crashing-container
position: devops
technology: docker
level: mid
tags: [docker, debugging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một container liên tục bị restart (crash loop). Bạn sẽ debug theo các bước nào?

## Question (EN)
A container keeps restarting (crash loop). Walk through the steps you'd take to debug it.

## Đáp án chi tiết (VI)
Quy trình debug có hệ thống, từ thông tin rẻ nhất tới sâu nhất:

**Bước 1 — Xem trạng thái và exit code:**
```bash
docker ps -a
# STATUS: "Restarting (1) 5 seconds ago" hoặc "Exited (137) 2 minutes ago"
```
Exit code cho biết nguyên nhân sơ bộ:
| Exit code | Ý nghĩa thường gặp |
|---|---|
| 0 | Thoát bình thường (nhưng nếu có `restart: always`, có thể vẫn bị restart lại) |
| 1 | Lỗi ứng dụng tổng quát (unhandled exception) |
| 126 | Command không có quyền thực thi |
| 127 | Command không tồn tại (sai path trong CMD/ENTRYPOINT) |
| 137 | Bị SIGKILL — thường do **OOM kill** hoặc `docker kill` |
| 139 | Segmentation fault (SIGSEGV) |
| 143 | Bị SIGTERM (thoát "sạch" theo graceful shutdown) |

**Bước 2 — Xem log:**
```bash
docker logs my-app --tail 100
docker logs my-app --since 10m
```
Đa số nguyên nhân crash (lỗi config, thiếu env var, kết nối DB fail, exception ứng dụng) sẽ hiện rõ ở đây.

**Bước 3 — Kiểm tra OOM:**
```bash
docker inspect my-app --format='{{.State.OOMKilled}}'
```
Nếu `true`, nguyên nhân là memory limit quá thấp hoặc app bị memory leak — cần tăng `--memory` hoặc profile ứng dụng.

**Bước 4 — Chạy tạm không có `-d`, không restart policy, để thấy lỗi trực tiếp:**
```bash
docker run --rm -it myapp:latest
```
Nếu container tự exit ngay, output trực tiếp trên terminal thường rõ ràng hơn `docker logs` (đặc biệt khi entrypoint bị lỗi trước khi app kịp log ra đâu đó).

**Bước 5 — Ghi đè entrypoint để vào shell debug (khi cần kiểm tra file/permission bên trong):**
```bash
docker run --rm -it --entrypoint sh myapp:latest
# rồi tự chạy lệnh khởi động thật để xem lỗi chi tiết
```
Hữu ích khi lỗi nằm ở entrypoint script (thiếu quyền exec, sai shebang, biến môi trường thiếu).

**Bước 6 — Kiểm tra healthcheck (nếu có) đang gây restart do orchestrator, không phải app crash thật:**
```bash
docker inspect --format='{{json .State.Health}}' my-app | jq
```
Nếu app thực ra chạy ổn nhưng healthcheck endpoint sai path/timeout quá ngắn, orchestrator (Swarm/K8s) có thể liên tục restart dù app không hề lỗi.

**Bước 7 — Kiểm tra tài nguyên host và resource limit:**
```bash
docker stats my-app
docker events --filter container=my-app   # xem lịch sử event: die, oom, restart...
```

**Bước 8 — Nếu image dùng `distroless`/`scratch` không có shell để exec vào:**
- Dùng `docker cp` để lấy file config/log ra máy host kiểm tra.
- Build tạm một image debug dựa trên cùng base nhưng thêm shell/curl, chạy song song để so sánh.
- Dùng `docker debug` (Docker Desktop) hoặc mount cùng filesystem qua container debug khác.

**Ví dụ tình huống thực tế:** container Node.js liên tục exit code 1 sau ~3s. `docker logs` cho thấy `Error: connect ECONNREFUSED db:5432` — nguyên nhân do thiếu `depends_on` + healthcheck cho `db` trong Compose, app cố connect DB ngay khi start trong lúc Postgres còn đang khởi tạo. Fix: thêm retry logic + `condition: service_healthy`.

## Detailed Answer (EN)
A systematic debugging process, from cheapest information to deepest:

**Step 1 — Check status and exit code:**
```bash
docker ps -a
# STATUS: "Restarting (1) 5 seconds ago" or "Exited (137) 2 minutes ago"
```
The exit code gives a rough cause:
| Exit code | Common meaning |
|---|---|
| 0 | Normal exit (but with `restart: always`, it may still be restarted) |
| 1 | General application error (unhandled exception) |
| 126 | Command found but not executable |
| 127 | Command not found (wrong path in CMD/ENTRYPOINT) |
| 137 | Killed by SIGKILL — usually an **OOM kill** or manual `docker kill` |
| 139 | Segmentation fault (SIGSEGV) |
| 143 | Terminated by SIGTERM (clean graceful shutdown) |

**Step 2 — Check logs:**
```bash
docker logs my-app --tail 100
docker logs my-app --since 10m
```
Most crash causes (config errors, missing env vars, failed DB connections, application exceptions) show up here.

**Step 3 — Check for OOM:**
```bash
docker inspect my-app --format='{{.State.OOMKilled}}'
```
If `true`, the cause is a memory limit set too low or an app memory leak — raise `--memory` or profile the app.

**Step 4 — Run it in the foreground without `-d` or a restart policy to see the error directly:**
```bash
docker run --rm -it myapp:latest
```
If the container exits immediately, direct terminal output is often clearer than `docker logs` (especially when the entrypoint fails before the app can log anywhere).

**Step 5 — Override the entrypoint to get a debug shell (to inspect files/permissions inside):**
```bash
docker run --rm -it --entrypoint sh myapp:latest
# then manually run the real startup command to see the detailed error
```
Useful when the failure is in the entrypoint script itself (missing execute permission, wrong shebang, missing env var).

**Step 6 — Check whether a healthcheck is causing restarts by the orchestrator, not a real app crash:**
```bash
docker inspect --format='{{json .State.Health}}' my-app | jq
```
If the app is actually running fine but the healthcheck endpoint has the wrong path or too short a timeout, the orchestrator (Swarm/K8s) may keep restarting it even though nothing is actually broken.

**Step 7 — Check host resources and resource limits:**
```bash
docker stats my-app
docker events --filter container=my-app   # view event history: die, oom, restart...
```

**Step 8 — If the image is `distroless`/`scratch` with no shell to exec into:**
- Use `docker cp` to pull config/log files out to the host for inspection.
- Build a temporary debug image on the same base but with a shell/curl added, run it side by side for comparison.
- Use `docker debug` (Docker Desktop) or mount the same filesystem from another debug container.

**Real-world example:** a Node.js container kept exiting with code 1 after ~3s. `docker logs` showed `Error: connect ECONNREFUSED db:5432` — caused by missing `depends_on` + healthcheck for `db` in Compose, so the app tried to connect immediately on start while Postgres was still initializing. Fix: add retry logic + `condition: service_healthy`.
