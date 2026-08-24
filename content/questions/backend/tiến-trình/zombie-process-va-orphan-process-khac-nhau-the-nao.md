---
id: zombie-process-va-orphan-process-khac-nhau-the-nao
position: backend
technology: tiến-trình
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Zombie process và orphan process khác nhau thế nào?

## Question (EN)
How do zombie and orphan processes differ?

## Đáp án chi tiết (VI)
Cả hai liên quan tới cách Unix quản lý quan hệ cha–con.\
\
**Zombie** (defunct): tiến trình con đã kết thúc (`exit`) nhưng cha CHƯA gọi `wait()`/`waitpid()` để đọc exit status. Con đã giải phóng hầu hết tài nguyên nhưng entry trong process table vẫn còn để giữ exit code → hiển thị trạng thái Z. Zombie không dùng CPU/RAM đáng kể, nhưng nếu tích nhiều sẽ cạn PID. Khắc phục: cha phải `wait()` (thường trong handler của SIGCHLD).\
\
**Orphan**: tiến trình con vẫn đang chạy nhưng cha đã chết trước. Con được `init`/`systemd` (PID 1) nhận làm cha nuôi (re-parent); PID 1 sẽ tự `wait()` khi con kết thúc nên orphan không đọng lại thành zombie.\
\
Hình dung: zombie = đã chết mà chưa ai ký giấy khai tử; orphan = còn sống nhưng mất cha, được nhà nước nhận nuôi.

## Detailed Answer (EN)
Both concern how Unix manages the parent–child relationship.\
\
**Zombie** (defunct): a child has terminated (`exit`) but the parent has NOT yet called `wait()`/`waitpid()` to read its exit status. The child released most resources, but its process-table entry remains to hold the exit code → shown in state Z. A zombie uses negligible CPU/RAM, but accumulating many can exhaust PIDs. Fix: the parent must `wait()` (often in a SIGCHLD handler).\
\
**Orphan**: a child still running whose parent died first. It is re-parented to `init`/`systemd` (PID 1), which reaps it via `wait()` when it exits, so orphans do not linger as zombies.\
\
Analogy: a zombie has died but no one signed the death certificate; an orphan is still alive but lost its parent and was adopted by the state.
