---
id: docker-exec-vs-attach
position: devops
technology: docker
level: junior
tags: [docker, debugging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`docker exec` và `docker attach` khác nhau như thế nào? Khi debug một container đang chạy thì nên dùng cái nào?

## Question (EN)
What's the difference between `docker exec` and `docker attach`? Which should you use when debugging a running container?

## Đáp án chi tiết (VI)
- **`docker attach`**: kết nối trực tiếp vào **stdin/stdout/stderr của process PID 1** đang chạy trong container — giống như "gắn màn hình" vào chính tiến trình chính. Không tạo process mới.
- **`docker exec`**: tạo một **process mới, độc lập** bên trong namespace của container đang chạy (thường dùng để mở shell debug: `docker exec -it <container> sh`).

Sự khác biệt quan trọng nhất trong thực tế:

| | `docker attach` | `docker exec` |
|---|---|---|
| Process | Gắn vào PID 1 hiện có | Tạo process mới (PID khác) |
| Rủi ro | Gõ `Ctrl+C` có thể **gửi SIGINT tới chính app**, làm crash/thoát container ngoài ý muốn | An toàn — thoát shell debug (`exit`) không ảnh hưởng app chính |
| Use case | Xem output realtime của app foreground, tương tác trực tiếp với process chính (hiếm dùng) | Debug: mở shell, check file, chạy lệnh chẩn đoán, không đụng tới process chính |
| Yêu cầu | Container phải đang chạy tương tác được (stdin mở) | Container chỉ cần đang **Running** |

**Trong thực tế phỏng vấn/production, hầu như luôn dùng `docker exec`** để debug vì an toàn hơn:
```bash
docker exec -it my-app sh              # mở shell trong container đang chạy
docker exec my-app cat /etc/hosts      # chạy 1 lệnh rồi thoát, không cần -it
docker exec -it my-app curl localhost:8080/health   # test nội bộ app từ trong container
```

**Edge case:**
- Nếu image không có shell nào (ví dụ base image `scratch` hoặc `distroless`), `docker exec ... sh` sẽ báo lỗi `OCI runtime exec failed: exec: "sh": executable file not found in $PATH` — đây là đánh đổi phổ biến khi dùng distroless để giảm attack surface: debug khó hơn, phải dùng `docker cp` để lấy file ra ngoài kiểm tra, hoặc dùng ephemeral debug container (`docker debug` của Docker Desktop, hay `kubectl debug` bên K8s) để "mượn" namespace của container đích mà không cần shell có sẵn trong image.
- `docker attach` vào một container mà app không đọc stdin sẽ chỉ thấy log stream ra (giống `docker logs -f`), nhưng nhấn `Ctrl+C` vẫn có thể vô tình dừng cả container tùy detach key config — nên nếu chỉ muốn xem log, `docker logs -f` an toàn hơn `docker attach`.

## Detailed Answer (EN)
- **`docker attach`**: connects directly to the **stdin/stdout/stderr of the running PID 1 process** in the container — like plugging a monitor into the main process itself. No new process is created.
- **`docker exec`**: creates a **new, independent process** inside the running container's namespaces (commonly used to open a debug shell: `docker exec -it <container> sh`).

The most important practical difference:

| | `docker attach` | `docker exec` |
|---|---|---|
| Process | Attaches to the existing PID 1 | Creates a new process (different PID) |
| Risk | Pressing `Ctrl+C` can **send SIGINT to the app itself**, unintentionally crashing/exiting the container | Safe — exiting the debug shell (`exit`) doesn't touch the main process |
| Use case | Watching realtime output of a foreground app, interacting directly with the main process (rarely used) | Debugging: open a shell, inspect files, run diagnostic commands without touching the main process |
| Requirement | Container must be interactively attachable (stdin open) | Container just needs to be **Running** |

**In real-world work/interviews, `docker exec` is almost always the answer** for debugging, since it's safer:
```bash
docker exec -it my-app sh              # open a shell in the running container
docker exec my-app cat /etc/hosts      # run one command and exit, no -it needed
docker exec -it my-app curl localhost:8080/health   # test the app internally from inside
```

**Edge case:**
- If the image has no shell at all (e.g., a `scratch` or `distroless` base image), `docker exec ... sh` fails with `OCI runtime exec failed: exec: "sh": executable file not found in $PATH` — a common trade-off with distroless images for a smaller attack surface: debugging gets harder, so you either use `docker cp` to pull files out for inspection, or use an ephemeral debug container (Docker Desktop's `docker debug`, or `kubectl debug` in K8s) to "borrow" the target container's namespaces without needing a shell baked into the image.
- `docker attach`ing to a container whose app doesn't read stdin just streams logs (similar to `docker logs -f`), but pressing `Ctrl+C` can accidentally stop the whole container depending on the detach-key configuration — if you only want to watch logs, `docker logs -f` is safer than `docker attach`.
