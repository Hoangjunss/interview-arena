---
id: docker-stop-treo-dung-10-giay-roi-container-moi-tat-va-request-dang-chay-bi-cat
position: backend
technology: signals-\u0026-pid-1
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`docker stop` treo đúng 10 giây rồi container mới tắt, và request đang chạy bị cắt giữa chừng. Nguyên nhân và cách sửa?

## Question (EN)
`docker stop` hangs for exactly 10 seconds before the container dies, and in-flight requests are cut off. Why, and how do you fix it?

## Đáp án chi tiết (VI)
`docker stop` gửi **`SIGTERM`**, chờ **10 giây** (mặc định) rồi gửi **`SIGKILL`**. Treo đủ 10 giây nghĩa là **không ai xử lý `SIGTERM`**. Ba nguyên nhân thường gặp:\
\
1. **PID 1 là shell** — dùng shell form hoặc script `start.sh` không `exec`, nên `sh` giữ PID 1 và không forward tín hiệu.\
2. **PID 1 là npm / yarn / gunicorn wrapper** — process cha nhận tín hiệu nhưng không truyền cho con đúng cách.\
3. **App không đăng ký handler** — không có graceful shutdown, cứ chạy tới khi bị kill.\
\
Cách sửa:\
\
```dockerfile\
CMD [\\"node\\

## Detailed Answer (EN)
`docker stop` sends **`SIGTERM`**, waits **10 seconds** (default), then sends **`SIGKILL`**. Hanging for the full 10 seconds means **nothing handled `SIGTERM`**. Three common causes:\
\
1. **PID 1 is a shell** — shell form, or a `start.sh` without `exec`, so `sh` holds PID 1 and never forwards the signal.\
2. **PID 1 is an npm / yarn / gunicorn wrapper** — the parent gets the signal but does not propagate it properly.\
3. **The app registers no handler** — no graceful shutdown, so it runs until killed.\
\
The fix:\
\
```dockerfile\
CMD [\\"node\\
