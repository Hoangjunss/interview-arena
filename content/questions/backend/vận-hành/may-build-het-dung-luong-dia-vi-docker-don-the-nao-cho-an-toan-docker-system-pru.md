---
id: may-build-het-dung-luong-dia-vi-docker-don-the-nao-cho-an-toan-docker-system-pru
position: backend
technology: vận-hành
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Máy build hết dung lượng đĩa vì Docker. Dọn thế nào cho an toàn? `docker system prune` xoá những gì?

## Question (EN)
The build machine ran out of disk because of Docker. How do you clean up safely, and what does `docker system prune` actually remove?

## Đáp án chi tiết (VI)
Đĩa thường bị chiếm bởi 4 nhóm: **image không dùng**, **container đã dừng**, **volume mồ côi**, và **build cache**. Kiểm tra trước khi xoá:\
\
```bash\
docker system df           # breakdown by images / containers / volumes / build cache\
docker system df -v        # per-item detail\
```\
\
`docker system prune` mặc định xoá: container đã dừng, network không container nào dùng, **dangling image** (image `\u003cnone\u003e` bị tag mới thay thế), và build cache treo. **Không** xoá volume trừ khi thêm `--volumes`.\
\
```bash\
docker system prune                       # safe default\
docker system prune -a                    # also removes ALL images no container uses\
docker builder prune --filter until=168h  # only build cache older than 7 days\
```\
\
Lưu ý khi chạy trên máy CI/staging dùng chung: `-a` xoá cả image đang được pull sẵn cho job khác → lần build sau phải kéo lại. `--volumes` có thể xoá dữ liệu database local. Trên server nên đặt lịch `docker builder prune --filter until=...` thay vì `prune -a --volumes` thủ công.

## Detailed Answer (EN)
$85
