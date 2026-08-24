---
id: starvation-trong-lap-lich-cpu-la-gi-aging-giai-quyet-ra-sao
position: backend
technology: lập-lịch
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Starvation trong lập lịch CPU là gì? Aging giải quyết ra sao?

## Question (EN)
What is starvation in CPU scheduling? How does aging solve it?

## Đáp án chi tiết (VI)
**Starvation** (đói tài nguyên / indefinite blocking): một tiến trình bị trì hoãn vô hạn, không bao giờ được cấp CPU. Thường gặp ở lập lịch theo độ ưu tiên (priority scheduling): nếu luôn có tiến trình ưu tiên cao hơn tới, tiến trình ưu tiên thấp có thể chờ mãi.\
\
**Aging**: kỹ thuật tăng dần độ ưu tiên của tiến trình theo thời gian chờ. Ví dụ cứ mỗi khoảng thời gian chờ trong ready queue thì cộng thêm priority. Nhờ đó một tiến trình ưu tiên thấp, chờ đủ lâu, cuối cùng sẽ leo lên đủ cao để được chạy → bảo đảm ai cũng có lượt (no indefinite postponement).\
\
Hình dung: xếp hàng có ưu tiên, nhưng ai đứng càng lâu càng được cộng điểm ưu tiên, nên không bị chen mãi.\
\
**Phân biệt với deadlock**: starvation là tiến trình vẫn có thể chạy nếu được cấp, chỉ là không tới lượt; deadlock là các tiến trình chờ lẫn nhau và không cái nào tiến được.

## Detailed Answer (EN)
**Starvation** (indefinite blocking): a process is delayed indefinitely and never gets the CPU. Common under priority scheduling: if higher-priority processes keep arriving, a low-priority one may wait forever.\
\
**Aging**: a technique that gradually raises a process’s priority based on how long it has waited. For example, add priority for each time interval spent in the ready queue. Thus a low-priority process, after waiting long enough, eventually rises high enough to run → guaranteeing everyone gets a turn (no indefinite postponement).\
\
Analogy: a priority queue where the longer you stand in line, the more priority points you accrue, so you are never cut in front of forever.\
\
**Vs deadlock**: in starvation the process could run if granted the CPU — it just never gets its turn; in deadlock, processes wait on each other and none can make progress.
