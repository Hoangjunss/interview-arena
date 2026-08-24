---
id: vao-mot-du-an-lon-da-chay-nhieu-nam-ban-bat-dau-doc-code-tu-dau
position: backend
technology: onboarding
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vào một dự án lớn đã chạy nhiều năm, bạn bắt đầu đọc code từ đâu?

## Question (EN)
You join a large project that has been running for years. Where do you start reading the code?

## Đáp án chi tiết (VI)
Không đọc từ trên xuống dưới theo thư mục — sẽ chìm trong chi tiết. Đi theo **luồng chạy thật**.\
\
Thứ tự thường hiệu quả:\
\
1. **Chạy được dự án trên máy trước.** Không dựng được môi trường thì mọi việc đọc đều là suy đoán. Ghi lại các bước dựng vì README thường đã lỗi thời.\
2. **Tìm điểm vào (entry point)**: route/controller, consumer message queue, cron job. Từ đó lần một request tiêu biểu đi qua các lớp cho đến database.\
3. **Đọc schema database** và các model chính. Cấu trúc dữ liệu tiết lộ mô hình nghiệp vụ nhanh hơn đọc hàm.\
4. **Đọc test** của module quan trọng — test là đặc tả còn sống và nêu rõ các trường hợp biên hệ thống quan tâm.\
5. **Đọc lịch sử Git** ở file bạn phải sửa: `git log -p \u003cfile\u003e`, `git blame` để biết vì sao đoạn khó hiểu tồn tại. Nếu dự án có thư mục `doc/adr`, đọc các bản ghi quyết định kiến trúc trước tiên.\
\
Cách chốt hiểu biết: nhận một **bug nhỏ** hoặc một thay đổi nhỏ có thật rồi làm cho xong. Sửa một chỗ thật cho ta hiểu hệ thống nhiều hơn đọc lướt cả tuần.

## Detailed Answer (EN)
Do not read folder by folder top to bottom — you will drown in detail. Follow a **real execution path**.\
\
An order that usually works:\
\
1. **Get it running locally first.** Without a working environment, all reading is guesswork. Write down the setup steps, since the README is usually stale.\
2. **Find the entry points**: routes/controllers, queue consumers, cron jobs. Then trace one representative request through the layers down to the database.\
3. **Read the database schema** and the core models. Data structures reveal the business model faster than functions do.\
4. **Read the tests** of the important modules — tests are living specs and spell out the edge cases the system cares about.\
5. **Read Git history** for the file you must change: `git log -p \u003cfile\u003e` and `git blame` explain why the odd code exists. If the repo has `doc/adr`, read the architecture decision records first.\
\
To lock the knowledge in, take a **small real bug** or change and finish it. One real fix teaches more than a week of skimming.
