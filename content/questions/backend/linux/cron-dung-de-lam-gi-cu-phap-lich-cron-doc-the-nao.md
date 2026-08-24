---
id: cron-dung-de-lam-gi-cu-phap-lich-cron-doc-the-nao
position: backend
technology: linux
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cron dùng để làm gì? Cú pháp lịch cron đọc thế nào?

## Question (EN)
What is cron used for and how do you read a cron schedule?

## Đáp án chi tiết (VI)
Cron là **trình lập lịch chạy tác vụ định kỳ** trong Unix/Linux (dọn log, backup, gửi báo cáo, gọi script theo giờ). Daemon `crond` đọc bảng lịch **crontab** và chạy lệnh đúng thời điểm.\
\
Cú pháp 5 trường + lệnh:\
```\
┌ phút (0-59)\
│ ┌ giờ (0-23)\
│ │ ┌ ngày trong tháng (1-31)\
│ │ │ ┌ tháng (1-12)\
│ │ │ │ ┌ thứ trong tuần (0-6, 0=CN)\
* * * * *  \u003clệnh\u003e\
```\
\
Ví dụ:\
- `0 2 * * *` → 2h sáng mỗi ngày.\
- `*/15 * * * *` → mỗi 15 phút.\
- `0 0 * * 0` → 0h Chủ nhật hằng tuần.\
\
Quản lý bằng `crontab -e` (sửa), `crontab -l` (liệt kê). Lưu ý cron chạy với môi trường tối giản — nên dùng đường dẫn tuyệt đối và ghi log output.

## Detailed Answer (EN)
Cron is the **scheduler for periodic tasks** on Unix/Linux (log rotation, backups, reports, timed scripts). The `crond` daemon reads the **crontab** schedule table and runs commands at the right time.\
\
Syntax is 5 fields + a command:\
```\
┌ minute (0-59)\
│ ┌ hour (0-23)\
│ │ ┌ day of month (1-31)\
│ │ │ ┌ month (1-12)\
│ │ │ │ ┌ day of week (0-6, 0=Sun)\
* * * * *  \u003ccommand\u003e\
```\
\
Examples:\
- `0 2 * * *` → 2 AM every day.\
- `*/15 * * * *` → every 15 minutes.\
- `0 0 * * 0` → midnight every Sunday.\
\
Manage with `crontab -e` (edit), `crontab -l` (list). Note cron runs with a minimal environment — use absolute paths and log output.
