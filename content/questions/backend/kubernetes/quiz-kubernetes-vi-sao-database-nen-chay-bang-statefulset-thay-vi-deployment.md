---
id: quiz-kubernetes-vi-sao-database-nen-chay-bang-statefulset-thay-vi-deployment
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao database nên chạy bằng StatefulSet thay vì Deployment?

## Đáp án trắc nghiệm
- [ ] StatefulSet chạy nhanh hơn vì bỏ qua lớp ReplicaSet
- [x] Mỗi Pod có danh tính ổn định và ổ đĩa riêng
- [ ] StatefulSet tự động sao lưu dữ liệu định kỳ
- [ ] Deployment không gắn được volume vào Pod

## Giải thích (VI)
StatefulSet cho Pod tên cố định và có thứ tự (db-0, db-1), mỗi Pod một PersistentVolumeClaim riêng bám theo nó. Pod chết và tạo lại vẫn là db-0 và vẫn gắn đúng ổ đĩa cũ. Deployment thì Pod tên ngẫu nhiên và không có ràng buộc đó.

### Giải thích các phương án:
- **StatefulSet chạy nhanh hơn vì bỏ qua lớp ReplicaSet** (Sai): Hiệu năng không phải điểm khác biệt.
- **Mỗi Pod có danh tính ổn định và ổ đĩa riêng** (Đúng): Danh tính ổn định cộng ổ đĩa riêng theo từng Pod là lý do StatefulSet tồn tại. Danh tính kiểu db-0, db-1 đi theo Pod suốt vòng đời.
- **StatefulSet tự động sao lưu dữ liệu định kỳ** (Sai): Không có cơ chế sao lưu nào tích hợp sẵn.
- **Deployment không gắn được volume vào Pod** (Sai): Deployment gắn volume được — nhưng mọi bản sao dùng chung một khai báo.
