---
id: dockerfile-cmd-vs-entrypoint
position: devops
technology: docker
level: junior
tags: [docker, dockerfile]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa `CMD` và `ENTRYPOINT` trong Dockerfile là gì? Khi nào nên dùng kết hợp cả hai?

## Question (EN)
What is the difference between `CMD` and `ENTRYPOINT` in a Dockerfile? When should you combine both?

## Đáp án chi tiết (VI)
Cả hai đều định nghĩa **process sẽ chạy khi container khởi động (PID 1)**, nhưng khác nhau về mục đích và cách bị override:

- **`CMD`**: cung cấp **giá trị mặc định** cho lệnh chạy hoặc cho tham số. Dễ dàng bị **ghi đè hoàn toàn** bằng cách truyền argument sau `docker run <image> <args>`.
- **`ENTRYPOINT`**: định nghĩa **chương trình cố định** sẽ chạy. Argument truyền vào `docker run <image> <args>` sẽ được **nối thêm** vào sau ENTRYPOINT (không thay thế), trừ khi dùng `--entrypoint` để ghi đè hẳn.

Cả hai đều có 2 dạng cú pháp:
- **Shell form**: `CMD echo hello` → chạy qua `/bin/sh -c`, nhận biến môi trường, nhưng process chính sẽ là `/bin/sh` (PID 1), khiến signal như SIGTERM không được forward đúng tới app.
- **Exec form**: `CMD ["echo", "hello"]` → chạy trực tiếp, không qua shell, app nhận trực tiếp SIGTERM/SIGINT — **nên dùng exec form trong production**.

**Pattern phổ biến nhất**: kết hợp ENTRYPOINT (cố định binary) + CMD (default argument), giúp image vừa dễ dùng vừa linh hoạt:

```dockerfile
ENTRYPOINT ["python", "app.py"]
CMD ["--port", "8080"]
```

```bash
docker run myapp                  # chạy: python app.py --port 8080
docker run myapp --port 9090      # chạy: python app.py --port 9090 (CMD bị override)
```

**Edge case thường gặp:**
- Nếu ENTRYPOINT dùng shell form (`ENTRYPOINT command`), thì CMD sẽ **bị bỏ qua hoàn toàn** vì cú pháp shell không hỗ trợ append argument.
- Dùng ENTRYPOINT làm "wrapper script" (ví dụ chạy migration DB rồi mới exec app) là pattern rất phổ biến:
```dockerfile
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "server.js"]
```
```bash
#!/bin/sh
# entrypoint.sh
set -e
./wait-for-db.sh
exec "$@"   # quan trọng: exec để "$@" (CMD) thay thế shell làm PID 1, nhận đúng signal
```
Nếu quên `exec` mà chỉ gọi `"$@"`, shell script vẫn là PID 1 → SIGTERM gửi tới container sẽ không đến được app, dẫn tới container bị treo khi `docker stop` cho tới khi hết timeout 10s rồi bị SIGKILL cưỡng bức.

## Detailed Answer (EN)
Both define **the process that runs when the container starts (PID 1)**, but they differ in intent and override behavior:

- **`CMD`**: provides a **default command or default arguments**. It is fully **overridden** by anything passed after `docker run <image> <args>`.
- **`ENTRYPOINT`**: defines the **fixed program** to run. Arguments passed to `docker run <image> <args>` are **appended** after the entrypoint (not replacing it), unless you override it entirely with `--entrypoint`.

Both support two syntax forms:
- **Shell form**: `CMD echo hello` → runs through `/bin/sh -c`, gets shell env expansion, but the actual PID 1 becomes `/bin/sh`, so signals like SIGTERM don't get forwarded correctly to your app.
- **Exec form**: `CMD ["echo", "hello"]` → runs directly, no shell, your app receives SIGTERM/SIGINT directly — **prefer exec form in production**.

**Most common pattern**: combine ENTRYPOINT (fixed binary) with CMD (default args) to make an image both fixed and flexible:

```dockerfile
ENTRYPOINT ["python", "app.py"]
CMD ["--port", "8080"]
```

```bash
docker run myapp                  # runs: python app.py --port 8080
docker run myapp --port 9090      # runs: python app.py --port 9090 (CMD overridden)
```

**Common gotcha:**
- If ENTRYPOINT uses shell form (`ENTRYPOINT command`), CMD is **entirely ignored**, since shell syntax doesn't support appending arguments.
- Using ENTRYPOINT as a "wrapper script" (e.g. run a DB migration then exec the app) is a very common pattern:
```dockerfile
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "server.js"]
```
```bash
#!/bin/sh
# entrypoint.sh
set -e
./wait-for-db.sh
exec "$@"   # important: exec replaces the shell with "$@" (CMD) as PID 1, so it gets real signals
```
If you forget `exec` and just call `"$@"`, the shell script remains PID 1 — SIGTERM sent to the container never reaches your app, so the container hangs on `docker stop` until the 10s timeout expires and Docker forcibly sends SIGKILL.
