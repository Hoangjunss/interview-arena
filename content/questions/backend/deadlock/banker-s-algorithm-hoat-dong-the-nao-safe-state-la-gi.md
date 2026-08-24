---
id: banker-s-algorithm-hoat-dong-the-nao-safe-state-la-gi
position: backend
technology: deadlock
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Banker’s algorithm hoạt động thế nào? Safe state là gì?

## Question (EN)
How does the Banker’s algorithm work? What is a safe state?

## Đáp án chi tiết (VI)
Banker’s algorithm là kỹ thuật TRÁNH deadlock (deadlock avoidance): trước khi cấp tài nguyên, hệ thống kiểm tra việc cấp có giữ được trạng thái an toàn không.\
\
Mỗi tiến trình khai báo trước nhu cầu tối đa (**Max**) cho từng loại tài nguyên. Hệ thống theo dõi: **Allocation** (đang giữ), **Need** = Max − Allocation, và **Available** (còn trống).\
\
**Safe state**: tồn tại một thứ tự thực thi (`safe sequence`) sao cho mỗi tiến trình lần lượt được cấp đủ Need từ Available (cộng phần tài nguyên các tiến trình trước đó trả lại), chạy xong rồi giải phóng. Nếu tồn tại chuỗi như vậy → an toàn, bảo đảm không deadlock. Unsafe state không chắc chắn deadlock, nhưng có nguy cơ.\
\
Khi có request: giả định cấp thử → chạy safety algorithm; nếu vẫn safe thì cấp thật, nếu không thì bắt tiến trình chờ.\
\
**Hạn chế thực tế**: cần biết trước Max, giả định số tiến trình/tài nguyên cố định → hiếm dùng trong OS thật, chủ yếu mang giá trị lý thuyết.

## Detailed Answer (EN)
The Banker’s algorithm is a deadlock-avoidance technique: before granting a resource, the system checks whether doing so keeps it in a safe state.\
\
Each process declares its maximum demand (**Max**) for each resource type in advance. The system tracks: **Allocation** (currently held), **Need** = Max − Allocation, and **Available** (free).\
\
**Safe state**: there exists an execution order (`safe sequence`) such that each process can, in turn, be granted enough of its Need from Available (plus resources released by earlier processes), finish, and release. If such a sequence exists → safe, no deadlock is guaranteed. An unsafe state is not certain to deadlock but risks it.\
\
On a request: tentatively grant it → run the safety algorithm; if still safe, grant for real, otherwise make the process wait.\
\
**Practical limits**: it requires knowing Max in advance and assumes a fixed number of processes/resources → rarely used in real OSes, mostly of theoretical value.
