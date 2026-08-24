---
id: chon-so-thread-cho-thread-pool-the-nao-task-cpu-bound-va-io-bound-khac-nhau-ra-s
position: backend
technology: thread-pool
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chọn số thread cho thread pool thế nào? Task CPU-bound và IO-bound khác nhau ra sao?

## Question (EN)
How do you size a thread pool? How do CPU-bound and IO-bound tasks differ?

## Đáp án chi tiết (VI)
Xuất phát từ **tỉ lệ thời gian chờ trên thời gian tính toán** của task, công thức tham chiếu của Brian Goetz:\
\
```\
size = Ncpu * Ucpu * (1 + W/C)\
```\
\
- `Ncpu` = `Runtime.getRuntime().availableProcessors()`\
- `Ucpu` = mức sử dụng CPU mục tiêu (0..1)\
- `W/C` = thời gian chờ / thời gian tính\
\
**Task CPU-bound** (mã hoá, tính toán, parse): `W/C` gần 0 → `size ≈ Ncpu` (hoặc `Ncpu + 1`). Thêm thread chỉ tăng context switch chứ không tăng thông lượng.\
\
**Task IO-bound** (gọi HTTP, truy vấn DB): thread nằm chờ phần lớn thời gian. Nếu chờ 90ms, tính 10ms thì `W/C = 9` → khoảng `10 * Ncpu`.\
\
Ba lưu ý thực chiến:\
- **Tách pool theo loại task.** Trộn task IO chậm với task CPU nhanh trong một pool khiến task nhanh bị xếp hàng sau task chậm.\
- Công thức chỉ là **điểm khởi đầu**; chốt số bằng đo thông lượng và p99 latency dưới tải thật.\
- Trần thật thường **không nằm ở thread**: connection pool DB 20 kết nối thì pool 200 thread chỉ dồn chờ ở chỗ khác. Cân số thread khớp với tài nguyên hạ nguồn.

## Detailed Answer (EN)
Start from the task's **wait-to-compute ratio**; Brian Goetz's reference formula is:\
\
```\
size = Ncpu * Ucpu * (1 + W/C)\
```\
\
- `Ncpu` = `Runtime.getRuntime().availableProcessors()`\
- `Ucpu` = target CPU utilisation (0..1)\
- `W/C` = wait time / compute time\
\
**CPU-bound tasks** (encryption, computation, parsing): `W/C` is near 0 → `size ≈ Ncpu` (or `Ncpu + 1`). More threads only add context switching, not throughput.\
\
**IO-bound tasks** (HTTP calls, DB queries): threads spend most of their life waiting. With 90ms waiting and 10ms computing, `W/C = 9` → roughly `10 * Ncpu`.\
\
Three practical notes:\
- **Separate pools per task type.** Mixing slow IO tasks with fast CPU tasks in one pool queues the fast ones behind the slow ones.\
- The formula is a **starting point**; settle the number by measuring throughput and p99 latency under real load.\
- The real ceiling is often **not threads**: with a 20-connection DB pool, a 200-thread pool just moves the queueing elsewhere. Size threads to match downstream resources.
