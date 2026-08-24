---
id: quiz-kubernetes-kubectl-apply-khac-kubectl-create-o-diem-nao
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
kubectl apply khác kubectl create ở điểm nào?

## Đáp án trắc nghiệm
- [ ] create dùng cho file YAML, apply dùng cho tham số dòng lệnh
- [ ] Hai lệnh giống nhau, apply chỉ là tên mới của create
- [ ] apply chỉ cập nhật được Deployment, các loại tài nguyên khác phải dùng create
- [x] create tạo mới và lỗi nếu đã tồn tại; apply tạo hoặc cập nhật

## Giải thích (VI)
create báo lỗi nếu tài nguyên đã tồn tại. apply tạo mới hoặc cập nhật tùy tình trạng, và chạy lại bao nhiêu lần cũng cho cùng kết quả. Vì vậy apply là lựa chọn cho CI/CD và GitOps — file YAML trong Git là nguồn sự thật.

### Giải thích các phương án:
- **create dùng cho file YAML, apply dùng cho tham số dòng lệnh** (Sai): Cả hai đều nhận file YAML qua -f.
- **Hai lệnh giống nhau, apply chỉ là tên mới của create** (Sai): Hành vi khi tài nguyên đã tồn tại khác hẳn nhau.
- **apply chỉ cập nhật được Deployment, các loại tài nguyên khác phải dùng create** (Sai): apply làm việc với mọi loại tài nguyên.
- **create tạo mới và lỗi nếu đã tồn tại; apply tạo hoặc cập nhật** (Đúng): Nên chạy lại nhiều lần vẫn an toàn. Tính chất khai báo và chạy lại được là lý do apply phù hợp cho tự động hóa. apply so với cấu hình đã lưu để tính phần cần đổi nên chạy lại nhiều lần vẫn an toàn.
