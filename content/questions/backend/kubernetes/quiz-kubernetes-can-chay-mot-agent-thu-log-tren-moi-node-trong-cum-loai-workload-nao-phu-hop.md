---
id: quiz-kubernetes-can-chay-mot-agent-thu-log-tren-moi-node-trong-cum-loai-workload-nao-phu-hop
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần chạy một agent thu log trên MỌI Node trong cụm. Loại workload nào phù hợp?

## Đáp án trắc nghiệm
- [ ] Deployment với replicas bằng số Node hiện tại
- [ ] StatefulSet, vì agent cần danh tính ổn định
- [x] DaemonSet — mỗi Node đúng một bản sao, Node mới cũng có
- [ ] CronJob chạy mỗi phút để đảm bảo agent còn sống

## Giải thích (VI)
DaemonSet. Nó đặt đúng một Pod trên mỗi Node phù hợp, tự thêm khi có Node mới và tự dọn khi Node rời cụm. Dùng cho agent thu log, giám sát, network plugin — những thứ phải hiện diện ở mọi máy.

### Giải thích các phương án:
- **Deployment với replicas bằng số Node hiện tại** (Sai): Không đảm bảo mỗi Node một Pod, và thêm Node thì phải tự chỉnh lại số lượng.
- **StatefulSet, vì agent cần danh tính ổn định** (Sai): StatefulSet dành cho ứng dụng có trạng thái, không rải theo Node.
- **DaemonSet — mỗi Node đúng một bản sao, Node mới cũng có** (Đúng): Đây chính là mục đích tồn tại của DaemonSet. Không phải tự đếm số Node như khi dùng Deployment.
- **CronJob chạy mỗi phút để đảm bảo agent còn sống** (Sai): CronJob dành cho tác vụ theo lịch, không phải tiến trình chạy liên tục.
