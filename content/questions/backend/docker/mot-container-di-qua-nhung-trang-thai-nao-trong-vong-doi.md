---
id: mot-container-di-qua-nhung-trang-thai-nao-trong-vong-doi
position: backend
technology: docker
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một container đi qua những trạng thái nào trong vòng đời?

## Question (EN)
What states does a container move through in its lifecycle?

## Đáp án chi tiết (VI)
Các trạng thái chính (`docker ps -a` hiển thị ở cột STATUS):\
\
- **created** — container đã được tạo từ image nhưng chưa start, chưa có process chạy.\
- **running** — process chính (PID 1) đang chạy sau `docker start`/`docker run`.\
- **paused** — toàn bộ process bị đóng băng bằng cgroup freezer; vẫn giữ nguyên trong bộ nhớ, không tiêu CPU.\
- **exited** (stopped) — process chính đã kết thúc; container còn tồn tại cùng filesystem, có thể `docker start` lại.\
- **dead** — trạng thái lỗi khi không dọn dẹp được, hiếm gặp.\
\
Luồng thường gặp:\
```bash\
docker run ...   # created -\u003e running\
docker pause     # running -\u003e paused\
docker unpause   # paused  -\u003e running\
docker stop      # running -\u003e exited\
docker rm        # xóa hẳn container\
```\
Điểm cần nhớ: container **exited** vẫn chiếm chỗ tới khi `docker rm`; dữ liệu ghi trong writable layer sẽ mất khi xóa nếu không dùng volume.

## Detailed Answer (EN)
The main states (`docker ps -a` shows them in the STATUS column):\
\
- **created** — the container was created from an image but not started; no process is running.\
- **running** — the main process (PID 1) is running after `docker start`/`docker run`.\
- **paused** — all processes are frozen via the cgroup freezer; still resident in memory, using no CPU.\
- **exited** (stopped) — the main process has ended; the container still exists with its filesystem and can be `docker start`ed again.\
- **dead** — an error state where cleanup failed; rare.\
\
A typical flow:\
```bash\
docker run ...   # created -\u003e running\
docker pause     # running -\u003e paused\
docker unpause   # paused  -\u003e running\
docker stop      # running -\u003e exited\
docker rm        # remove the container for good\
```\
Key point: an **exited** container still occupies space until `docker rm`; data written to the writable layer is lost on removal unless a volume is used.
