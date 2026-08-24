---
id: kube-scheduler-quyet-dinh-dat-mot-pod-len-node-nao-bang-cach-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
kube-scheduler quyết định đặt một Pod lên node nào bằng cách nào?

## Question (EN)
How does the kube-scheduler decide which node to place a Pod on?

## Đáp án chi tiết (VI)
Scheduler theo dõi các Pod chưa có node (`nodeName` rỗng) và với mỗi Pod chạy hai giai đoạn:\
\
1. **Filtering (Predicates)** — loại bỏ node không thể chạy Pod. Kiểm tra: node có đủ CPU/memory theo `requests` không, có thỏa nodeSelector/node affinity không, taint có bị tolerate không, port yêu cầu còn trống không, volume có gắn được không. Kết quả là danh sách *node khả thi*.\
2. **Scoring (Priorities)** — chấm điểm từng node khả thi rồi chọn điểm cao nhất. Các yếu tố: mức cân bằng tài nguyên sau khi đặt, mức độ trải Pod (spread), độ ưu tiên affinity mềm, image đã có sẵn trên node...\
\
Sau khi chọn được node, scheduler thực hiện **binding**: ghi `nodeName` vào Pod qua API server; kubelet trên node đó mới thực sự tạo container.\
\
Điểm cần nhớ:\
- Nếu không node nào qua được filtering, Pod ở trạng thái **Pending**.\
- Scheduler chỉ *chọn chỗ*, không tự chạy container — việc chạy là của kubelet.\
- `requests` (không phải `limits`) là con số scheduler dùng để tính chỗ trống, nên đặt requests hợp lý rất quan trọng.

## Detailed Answer (EN)
$89
