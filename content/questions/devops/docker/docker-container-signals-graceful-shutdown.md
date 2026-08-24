---
id: docker-container-signals-graceful-shutdown
position: devops
technology: docker
level: senior
tags: [docker, lifecycle]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker xử lý signal khi `docker stop`/`docker restart` như thế nào? Làm sao thiết kế ứng dụng để shutdown graceful đúng cách trong container, tránh mất request/dữ liệu khi rolling deploy?

## Question (EN)
How does Docker handle signals during `docker stop`/`docker restart`? How do you design an application for correct graceful shutdown in a container, avoiding dropped requests/data during rolling deploys?

## Đáp án chi tiết (VI)
**Cơ chế `docker stop`:**
1. Docker gửi **SIGTERM** tới PID 1 của container.
2. Đợi **grace period** (mặc định 10 giây, chỉnh bằng `docker stop -t <seconds>` hoặc `stop_grace_period` trong Compose).
3. Nếu PID 1 chưa thoát sau grace period, Docker gửi **SIGKILL** (không thể bắt/chặn, buộc container dừng ngay lập tức, không kịp cleanup).

`docker kill` bỏ qua toàn bộ quy trình trên, gửi SIGKILL (hoặc signal chỉ định qua `--signal`) ngay lập tức.

**Vấn đề "PID 1 problem" ảnh hưởng trực tiếp tới graceful shutdown:**
Kernel Linux có quy tắc đặc biệt cho PID 1: **tín hiệu như SIGTERM không có default handler tự động** như với process thường — nếu ứng dụng (hoặc shell wrapper) không **tự đăng ký handler cho SIGTERM**, container sẽ không phản ứng gì với SIGTERM, và Docker phải đợi hết grace period rồi SIGKILL — nghĩa là **mọi lần stop/restart/rolling deploy đều mất đúng 10 giây và không có cơ hội cleanup**.

Ví dụ shell form gây lỗi:
```dockerfile
CMD node server.js
```
Lệnh này chạy qua `/bin/sh -c "node server.js"` → `/bin/sh` mới là PID 1, `node` là child process. SIGTERM gửi tới PID 1 (`sh`) **không tự động forward** xuống `node` — Node.js không bao giờ nhận được tín hiệu để tự tắt graceful.

**Cách fix — dùng exec form hoặc init system:**
```dockerfile
# Cách 1: exec form — app trực tiếp là PID 1, nhận signal trực tiếp
CMD ["node", "server.js"]
```
```dockerfile
# Cách 2: dùng tini làm init process — xử lý signal forwarding + reap zombie process
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
```
```bash
docker run --init myapp    # Docker tự chèn tini làm PID 1 mà không cần sửa Dockerfile
```

**Ứng dụng phải tự xử lý SIGTERM để shutdown graceful thật sự:**
```javascript
// Node.js example
const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, draining connections...');
  server.close(() => {          // ngừng nhận connection mới, đợi request đang xử lý xong
    db.disconnect();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 9000);  // safety timeout trước khi Docker SIGKILL
});
```

**Ứng dụng thực tế trong rolling deploy (Kubernetes/Swarm):**
1. Orchestrator gửi tín hiệu "sắp bị terminate" (K8s: đưa Pod vào trạng thái `Terminating`, xóa khỏi Service endpoint **trước** khi gửi SIGTERM).
2. Container nhận SIGTERM, cần: ngừng nhận request mới, **hoàn tất request đang xử lý dở**, đóng kết nối DB/queue một cách sạch sẽ.
3. Nếu app không handle SIGTERM đúng, connection đang xử lý bị cắt ngang giữa chừng khi SIGKILL tới → user nhận lỗi 502/504, hoặc transaction DB bị rollback giữa chừng gây data inconsistency.

**Edge case cần biết khi phỏng vấn senior:**
- `preStop` hook trong K8s thường cần thêm `sleep 5-15s` **trước khi** gửi SIGTERM, vì việc xóa Pod khỏi Service endpoint (iptables/IPVS update) có độ trễ lan truyền — nếu SIGTERM tới ngay lập tức, vẫn có request mới bị route tới Pod đang tắt trong khoảng thời gian propagation đó.
- `STOPSIGNAL` trong Dockerfile có thể đổi tín hiệu Docker gửi thay vì SIGTERM mặc định (một số app dùng SIGQUIT hoặc SIGINT để trigger graceful shutdown khác):
```dockerfile
STOPSIGNAL SIGQUIT
```
- Nếu dùng process manager như PM2, Supervisor bên trong container, cần đảm bảo chúng **forward signal xuống đúng child process** — nhiều process manager mặc định không forward SIGTERM đúng cách, gây ra cùng vấn đề như PID 1 problem.

## Detailed Answer (EN)
**How `docker stop` works:**
1. Docker sends **SIGTERM** to the container's PID 1.
2. Waits a **grace period** (default 10 seconds, adjustable via `docker stop -t <seconds>` or `stop_grace_period` in Compose).
3. If PID 1 hasn't exited after the grace period, Docker sends **SIGKILL** (uncatchable/unblockable, forces immediate termination with no chance to clean up).

`docker kill` skips all of this, sending SIGKILL (or a signal specified via `--signal`) immediately.

**The "PID 1 problem" directly impacts graceful shutdown:**
The Linux kernel has special rules for PID 1: signals like SIGTERM **don't get an automatic default handler** the way they do for ordinary processes — if the app (or a shell wrapper) doesn't **explicitly register a SIGTERM handler**, the container won't respond to SIGTERM at all, and Docker must wait out the full grace period before SIGKILL — meaning **every stop/restart/rolling deploy costs exactly 10 seconds with zero opportunity for cleanup**.

Example shell form that causes this:
```dockerfile
CMD node server.js
```
This runs through `/bin/sh -c "node server.js"` → `/bin/sh` becomes PID 1, `node` is a child process. SIGTERM sent to PID 1 (`sh`) is **not automatically forwarded** down to `node` — Node.js never receives the signal to shut down gracefully.

**Fix — use exec form or an init system:**
```dockerfile
# Option 1: exec form — the app is directly PID 1, receives signals directly
CMD ["node", "server.js"]
```
```dockerfile
# Option 2: use tini as the init process — handles signal forwarding + reaps zombie processes
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
```
```bash
docker run --init myapp    # Docker automatically inserts tini as PID 1 without editing the Dockerfile
```

**The application itself must handle SIGTERM for real graceful shutdown:**
```javascript
// Node.js example
const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, draining connections...');
  server.close(() => {          // stop accepting new connections, wait for in-flight requests
    db.disconnect();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 9000);  // safety timeout before Docker's SIGKILL
});
```

**Real-world impact in rolling deploys (Kubernetes/Swarm):**
1. The orchestrator signals "about to terminate" (in K8s: the Pod enters `Terminating` and is removed from the Service's endpoints **before** SIGTERM is sent).
2. Upon SIGTERM, the container needs to: stop accepting new requests, **finish in-flight requests**, and cleanly close DB/queue connections.
3. If the app doesn't handle SIGTERM correctly, an in-flight connection gets cut off mid-request when SIGKILL arrives → the user sees a 502/504, or a DB transaction rolls back mid-way, causing data inconsistency.

**Edge cases worth knowing at senior level:**
- A K8s `preStop` hook often needs to `sleep 5-15s` **before** SIGTERM is sent, because removing a Pod from Service endpoints (iptables/IPVS update) propagates with delay — if SIGTERM arrives immediately, new requests can still be routed to the shutting-down Pod during that propagation window.
- `STOPSIGNAL` in the Dockerfile can change which signal Docker sends instead of the default SIGTERM (some apps use SIGQUIT or SIGINT to trigger a different graceful-shutdown path):
```dockerfile
STOPSIGNAL SIGQUIT
```
- If a process manager like PM2 or Supervisor runs inside the container, make sure it **forwards signals down to the correct child process** — many process managers don't forward SIGTERM correctly by default, causing the same issue as the PID 1 problem.
