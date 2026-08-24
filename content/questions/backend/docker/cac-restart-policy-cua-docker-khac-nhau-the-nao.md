---
id: cac-restart-policy-cua-docker-khac-nhau-the-nao
position: backend
technology: docker
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các restart policy của Docker khác nhau thế nào?

## Question (EN)
How do Docker restart policies differ?

## Đáp án chi tiết (VI)
Restart policy quyết định Docker có tự khởi động lại container khi nó thoát hay khi daemon khởi động lại. Đặt bằng `--restart`:\
\
- **no** (mặc định) — không bao giờ tự restart.\
- **on-failure[:N]** — chỉ restart khi container thoát với exit code khác 0 (lỗi); có thể giới hạn số lần thử `:N`.\
- **always** — luôn restart khi thoát; và tự start lại khi Docker daemon khởi động lại. Nếu bị `docker stop` thủ công thì đứng yên, nhưng daemon restart sẽ start lại.\
- **unless-stopped** — giống `always` nhưng nếu bạn chủ động stop container thì nó **không** tự start lại sau khi daemon khởi động lại.\
\
```bash\
docker run --restart on-failure:3 myapp\
docker run --restart unless-stopped myapp\
```\
Chọn: `on-failure` cho job/worker cần thử lại khi lỗi; `unless-stopped` cho service nền dài hạn nhưng vẫn tôn trọng ý muốn tắt thủ công của bạn. Lưu ý restart policy không áp dụng cho container chạy bằng `docker run --rm`.

## Detailed Answer (EN)
A restart policy decides whether Docker restarts a container when it exits or when the daemon restarts. Set it with `--restart`:\
\
- **no** (default) — never restart automatically.\
- **on-failure[:N]** — restart only when the container exits with a non-zero code (an error); you can cap attempts with `:N`.\
- **always** — always restart on exit, and start again when the Docker daemon restarts. A manual `docker stop` keeps it stopped, but a daemon restart will start it again.\
- **unless-stopped** — like `always`, except if you deliberately stop the container it will **not** be started again after a daemon restart.\
\
```bash\
docker run --restart on-failure:3 myapp\
docker run --restart unless-stopped myapp\
```\
Choose: `on-failure` for jobs/workers that should retry on error; `unless-stopped` for long-lived background services that should still respect your manual stop. Note that restart policies do not apply to containers run with `docker run --rm`.
