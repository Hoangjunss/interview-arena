---
id: quiz-kubernetes-sua-gia-tri-trong-configmap-dang-duoc-pod-dung-lam-bien-moi-truong-pod-co-nhan-g
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sửa giá trị trong ConfigMap đang được Pod dùng làm biến môi trường. Pod có nhận giá trị mới không?

## Đáp án trắc nghiệm
- [x] Không — biến môi trường chỉ đọc một lần lúc khởi động
- [ ] Có, nhưng chỉ sau khi chạy kubectl apply lại cho Deployment
- [ ] Có, biến môi trường được đồng bộ liên tục với ConfigMap
- [ ] Không, và mount thành file cũng không cập nhật được

## Giải thích (VI)
Không. Biến môi trường cố định tại thời điểm container khởi động. Muốn áp dụng phải tạo lại Pod: kubectl rollout restart deployment/<tên>. Nếu mount ConfigMap thành file thì nội dung file tự cập nhật (trễ khoảng một phút), nhưng ứng dụng phải tự đọc lại file.

### Giải thích các phương án:
- **Không — biến môi trường chỉ đọc một lần lúc khởi động** (Đúng): Muốn áp dụng phải tạo lại Pod. Ngược lại, ConfigMap mount thành FILE thì nội dung file được cập nhật tự động sau một khoảng. Đây là khác biệt cốt lõi giữa hai cách gắn ConfigMap vào Pod. Muốn Pod nhận giá trị mới thì phải tạo lại Pod, thường bằng cách gắn hash cấu hình vào annotation.
- **Có, nhưng chỉ sau khi chạy kubectl apply lại cho Deployment** (Sai): Apply lại Deployment không đổi gì nếu Pod template không thay đổi — Pod không được tạo lại.
- **Có, biến môi trường được đồng bộ liên tục với ConfigMap** (Sai): Không có cơ chế cập nhật biến môi trường của tiến trình đang chạy.
- **Không, và mount thành file cũng không cập nhật được** (Sai): File mount CÓ được cập nhật tự động, đó là khác biệt quan trọng.
