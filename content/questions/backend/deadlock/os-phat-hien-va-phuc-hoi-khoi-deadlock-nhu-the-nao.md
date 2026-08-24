---
id: os-phat-hien-va-phuc-hoi-khoi-deadlock-nhu-the-nao
position: backend
technology: deadlock
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OS phát hiện và phục hồi khỏi deadlock như thế nào?

## Question (EN)
How does an OS detect and recover from deadlock?

## Đáp án chi tiết (VI)
Khác với avoidance, chiến lược detect-and-recover cho phép deadlock xảy ra rồi mới xử lý.\
\
**Phát hiện**:\
- Nếu mỗi loại tài nguyên chỉ có 1 thực thể: xây `wait-for graph` (tiến trình → tiến trình); có chu trình = deadlock.\
- Nếu nhiều thực thể mỗi loại: dùng thuật toán giống safety của Banker để kiểm tra có chuỗi hoàn tất được không.\
- Chạy định kỳ hoặc khi CPU utilization tụt bất thường (đánh đổi giữa chi phí quét và độ trễ phát hiện).\
\
**Phục hồi**:\
- **Kết thúc tiến trình**: giết toàn bộ tiến trình trong deadlock, hoặc giết lần lượt từng cái tới khi hết chu trình (chọn nạn nhân theo chi phí thấp nhất).\
- **Preempt tài nguyên**: cướp tài nguyên từ một tiến trình trả cho tiến trình khác, thường kèm rollback tiến trình bị cướp về checkpoint. Rủi ro starvation nếu luôn chọn cùng một nạn nhân → cần đưa số lần rollback vào tiêu chí chọn.

## Detailed Answer (EN)
Unlike avoidance, the detect-and-recover strategy lets deadlock happen and then deals with it.\
\
**Detection**:\
- If each resource type has a single instance: build a `wait-for graph` (process → process); a cycle means deadlock.\
- If multiple instances per type: use an algorithm like the Banker’s safety check to see whether a completing sequence exists.\
- Run periodically or when CPU utilization drops unexpectedly (a trade-off between scan cost and detection latency).\
\
**Recovery**:\
- **Terminate processes**: kill all deadlocked processes, or kill them one by one until the cycle breaks (choose victims by lowest cost).\
- **Preempt resources**: take a resource from one process and give it to another, usually rolling the victim back to a checkpoint. Risk of starvation if the same victim is always chosen → factor the number of rollbacks into victim selection.
