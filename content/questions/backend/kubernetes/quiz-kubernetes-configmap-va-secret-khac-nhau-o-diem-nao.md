---
id: quiz-kubernetes-configmap-va-secret-khac-nhau-o-diem-nao
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ConfigMap và Secret khác nhau ở điểm nào?

## Đáp án trắc nghiệm
- [ ] ConfigMap chỉ dùng được cho một namespace, Secret dùng chung toàn cụm
- [ ] ConfigMap gắn được vào Pod dưới dạng biến môi trường, Secret thì chỉ mount được thành file
- [x] Secret dành cho dữ liệu nhạy cảm: lưu base64, mã hoá được trong etcd, siết RBAC
- [ ] Secret được mã hóa đầu cuối nên kể cả người có quyền admin cụm cũng không đọc được

## Giải thích (VI)
Cả hai đưa cấu hình vào Pod mà không phải build lại image. ConfigMap cho dữ liệu thường, Secret cho dữ liệu nhạy cảm — Secret lưu base64, hỗ trợ mã hóa khi lưu và nên siết bằng RBAC. Lưu ý: base64 KHÔNG phải mã hóa.

### Giải thích các phương án:
- **ConfigMap chỉ dùng được cho một namespace, Secret dùng chung toàn cụm** (Sai): Cả hai đều là tài nguyên theo namespace.
- **ConfigMap gắn được vào Pod dưới dạng biến môi trường, Secret thì chỉ mount được thành file** (Sai): Cả hai đều gắn được theo cả hai cách.
- **Secret dành cho dữ liệu nhạy cảm: lưu base64, mã hoá được trong etcd, siết RBAC** (Đúng): Khác biệt nằm ở mục đích và cách bảo vệ, không ở cách gắn vào Pod. Cả hai đều tách cấu hình khỏi image; khác biệt nằm ở mục đích và mức bảo vệ.
- **Secret được mã hóa đầu cuối nên kể cả người có quyền admin cụm cũng không đọc được** (Sai): base64 chỉ là mã hóa hình thức; ai đọc được Secret qua API vẫn giải ra dễ dàng.
